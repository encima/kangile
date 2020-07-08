import React, {useState, useEffect} from 'react';
import './style/index.css';
import List from './components/List';
import TempList from './components/TempList';
import Card from './components/Card';
import Modal from 'react-modal';
import socketIOClient from "socket.io-client";
import CardModal from './components/CardModal';
const ENDPOINT = "http://127.0.0.1:3030";

function App(props) {
  const [modalIsOpen,setModalIsOpen] = React.useState(false);  

  const [listsOfCards, setListsOfCards] = useState([
  ]);
  const [listsNames, setListsNames] = useState([
  ]);
  const [listAddMenuOpen, setListAddMenuOpen] = useState(-1);
  const [tempListAddMenuOpen, setTempListAddMenuOpen] = useState(false);
  const [socketHit, setSocketHit] = useState(0);
  const socket = props.socket;
  useEffect(() => {
     socket.on('changeBoard', (payload)=>{
       setListsOfCards(payload.listsOfCards);
       setListsNames(payload.listsNames);
     })
  }, []);
  useEffect(() =>{
    probeSocket(socket,listsOfCards,listsNames);
  }, [socketHit])


  return (
    <div>

      <header className="page-header">HelloBoard</header>
      <div className="board-container" onMouseDown={(e) => {
      if(e.target.classList.contains("board-container")){
        setListAddMenuOpen(-1);
        setTempListAddMenuOpen(false);
      }}}>

        {getListsOfCards(setListsOfCards, listsOfCards, addCardToList, 
          setListAddMenuOpen, listAddMenuOpen, setListsNames, listsNames, 
          setSocketHit, socketHit, setModalIsOpen)}

        <TempList setListsOfCards={setListsOfCards} listsOfCards={listsOfCards} 
        setListsNames={setListsNames} listsNames={listsNames}
        tempListAddMenuOpen={tempListAddMenuOpen} setTempListAddMenuOpen={setTempListAddMenuOpen}
        addList={addList}
        socketHit={socketHit} setSocketHit={setSocketHit}
        />
      </div>
        {getCardModal(setListsOfCards,listsOfCards,setModalIsOpen,modalIsOpen,setSocketHit, socketHit)}
    </div>
  );
}

const getListsOfCards = (setListsOfCards, listsOfCards, addCardToList, setListAddMenuOpen, listAddMenuOpen, setListsNames, listsNames, 
  setSocketHit, socketHit, setModalIsOpen) => {
  let lists = [];
  for(let list in listsOfCards)
    lists.push(
      <List key={list} listName={`${listsNames[list]}`} listId={`list-${list}`} 
      setListsOfCards={setListsOfCards} listsOfCards={listsOfCards} 
      listIndex={list} addCardToList={addCardToList}
      listAddMenuOpen={listAddMenuOpen} setListAddMenuOpen={setListAddMenuOpen}
      setListsNames={setListsNames} listsNames={listsNames}
      socketHit={socketHit} setSocketHit={setSocketHit}
      > 
        {getListCards(listsOfCards, list, setModalIsOpen)}
      </List>
      )
  
  return lists;
} 

const getListCards = (listsOfCards, listIndex, setModalIsOpen) => {
  let cards = [];
  for(let card in listsOfCards[listIndex]){
    cards.push(
      <Card key={card} id={`list-${listIndex}-card-${card}`} cardName={`${listsOfCards[listIndex][card].name}`}
      setModalIsOpen={setModalIsOpen}/>
    )
  }
  return cards;
} 

const addCardToList = (setListsOfCards, listsOfCards, listIndex, cardName) => {
  setListsOfCards(listsOfCards.map(
    list => {
      if(list == listsOfCards[listIndex])
        return [...list, {
          name: cardName
        }]
      else
        return list;
    }
  ));
  console.log(listsOfCards);
}

const addList = (setListsOfCards,listsOfCards, setListsNames, listsNames, newListName) =>{
  setListsOfCards([...listsOfCards, []]);
  setListsNames([...listsNames, newListName]);
}

const getCardModal = (setListsOfCards, listsOfCards,setModalIsOpen,modalIsOpen, setSocketHit, socketHit) =>{
  if(modalIsOpen.modalListIndex != undefined && modalIsOpen.modalCardIndex != undefined && listsOfCards[modalIsOpen.modalListIndex][modalIsOpen.modalCardIndex] != undefined)
    return <CardModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} 
    setListsOfCards={setListsOfCards} listsOfCards={listsOfCards}
    setSocketHit={setSocketHit} socketHit={socketHit}
    cardData={listsOfCards[modalIsOpen.modalListIndex][modalIsOpen.modalCardIndex]}/>
  else 
    return
}

const probeSocket = (socket, listsOfCards, listsNames) => {
  if(listsOfCards.length != 0){
    socket.emit('changeBoard', {listsOfCards, listsNames})
  }
}

export default App;
