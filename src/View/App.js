import React, {useState, useEffect} from 'react';
import './style/index.css';
import {uid} from 'uid';
import List from './components/List';
import TempList from './components/TempList';
import Card from './components/Card';
import Modal from 'react-modal';
import socketIOClient from "socket.io-client";
import CardModal from './components/CardModal';
const ENDPOINT = "http://127.0.0.1:3030";

function App(props) {
  const [modalIsOpen,setModalIsOpen] = React.useState(false);  

  const [lists, setLists] = useState(() =>[ 'Backlog',
     'Next In',
     'In Progress',
     'Blocked',
     'To Review',
     'Done' ]);
  const [listAddMenuOpen, setListAddMenuOpen] = useState(-1);
  const [tempListAddMenuOpen, setTempListAddMenuOpen] = useState(false);
  const [socketHit, setSocketHit] = useState(0);
  const socket = props.socket;
  useEffect(() => {
     socket.on('changeBoard', (payload)=>{
       setLists(payload.lists);
       console.log(payload)
     })
  }, []);
  useEffect(() =>{
    probeSocket(socket,lists, socketHit);
  }, [socketHit])


  return (
    <div>

      <header className="page-header">Agile Adventures!</header>
      <div className="board-container" onMouseDown={(e) => {
      if(e.target.classList.contains("board-container")){
        setListAddMenuOpen(-1);
        setTempListAddMenuOpen(false);
      }}}>

        {getListsOfCards(addCardToList, setListAddMenuOpen, listAddMenuOpen, setLists, lists, 
          setSocketHit, socketHit, setModalIsOpen, probeSocket, socket)}

        <TempList 
        setLists={setLists} lists={lists}
        tempListAddMenuOpen={tempListAddMenuOpen} setTempListAddMenuOpen={setTempListAddMenuOpen}
        addList={addList}
        socketHit={socketHit} setSocketHit={setSocketHit}
        />
      </div>
        {getCardModal(lists,setModalIsOpen,modalIsOpen,setSocketHit, socketHit)}
    </div>
  );
}

const getListsOfCards = (addCardToList, setListAddMenuOpen, listAddMenuOpen, setLists, lists, 
  setSocketHit, socketHit, setModalIsOpen, probeSocket, socket) => {
  let listElements = [];
  for(let listIdx in lists)
    listElements.push(
      <List key={lists[listIdx].id} listName={lists[listIdx].name} listId={`list-${lists[listIdx].id}`} 
      listIndex={listIdx} addCardToList={addCardToList}
      listAddMenuOpen={listAddMenuOpen} setListAddMenuOpen={setListAddMenuOpen}
      setLists={setLists} lists={lists}
      socketHit={socketHit} setSocketHit={setSocketHit}
      probeSocket={probeSocket} socket={socket}
      > 
        {getListCards(lists[listIdx], setModalIsOpen)}
      </List>
      )
  
  return listElements;
} 

const getListCards = (list, setModalIsOpen) => {
  let cards = [];
  for(let cardIdx in list.cards){
    cards.push(
      <Card key={list.cards[cardIdx].id} id={`list-${list.name}-card-${list.cards[cardIdx].id}`} cardName={`${list.cards[cardIdx].name}`}
      setModalIsOpen={setModalIsOpen}/>
    )
  }
  return cards;
} 

const addCardToList = (lists, idx, cardName) => {
  lists[idx]['cards'].push({id: uid(), name: cardName, priority: -1, effort: -1, description: ""});
}

const addList = (setLists, lists, newListName) =>{
  setLists([...lists, {id: uid(), name: newListName, cards:[]}]);
}

const getCardModal = (setModalIsOpen,modalIsOpen, setSocketHit, socketHit) =>{
  if(modalIsOpen.modalListIndex != undefined && modalIsOpen.modalCardIndex != undefined)
    // && listsOfCards[modalIsOpen.modalListIndex][modalIsOpen.modalCardIndex] != undefined)
    return <CardModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} 
    setSocketHit={setSocketHit} socketHit={socketHit}/>
    // cardData={listsOfCards[modalIsOpen.modalListIndex][modalIsOpen.modalCardIndex]}/>
  else 
    return
}

const probeSocket = (socket, lists, socketHit) => {
  if(socketHit != 0){
    socket.emit('changeBoard', {lists})
  }
}

export default App;
