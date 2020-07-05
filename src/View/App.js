import React, {useState, useEffect} from 'react';
import './style/index.css';
import List from './components/List';
import TempList from './components/TempList';
import Card from './components/Card';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3030";

function App(props) {
  const [cards, setCards] = useState([]);
  const [listsOfCards, setListsOfCards] = useState([
    //[{name:"karta nr1"},{name:"karta nr2"},{name:"karta nr3"},{name:"karta nr4"}]
    //,[{name:"karta nr11"},{name:"karta nr12"}]
  ]);
  const [listsNames, setListsNames] = useState([
    //"lista pierwsza", "lista druga"
  ]);
  const [listAddMenuOpen, setListAddMenuOpen] = useState(-1);
  const [tempListAddMenuOpen, setTempListAddMenuOpen] = useState(false);
  const [socketHit, setSocketHit] = useState(0);
  // let socket = socketIOClient(ENDPOINT);;
  const socket = props.socket;
  useEffect(() => {
     //setSocket(socketIOClient(ENDPOINT));
     socket.on('chat message', (msg)=>{
       console.log(msg)
     })
     socket.on('changeBoard', (payload)=>{
      //  console.log(payload.listsOfCards);
      //  console.log(payload.listsNames);

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
      <div className="board-container" onClick={(e) => {
      if(e.target.classList.contains("board-container")){
        setListAddMenuOpen(-1);
        setTempListAddMenuOpen(false);
      }}}>

        {getListsOfCards(setListsOfCards, listsOfCards, addCardToList, 
          setListAddMenuOpen, listAddMenuOpen, listsNames, setSocketHit, socketHit)}

        <TempList setListsOfCards={setListsOfCards} listsOfCards={listsOfCards} 
        setListsNames={setListsNames} listsNames={listsNames}
        tempListAddMenuOpen={tempListAddMenuOpen} setTempListAddMenuOpen={setTempListAddMenuOpen}
        addList={addList}
        socketHit={socketHit} setSocketHit={setSocketHit}
        />
      </div>
      {/* <button onClick={() => {arrayStateSwap(setListsOfCards, listsOfCards,0,0,1,1)}}>+++</button> */}
    </div>
  );
}

const getCards = (cardArray) => {
  let cards = [];
  for(let card in cardArray){
    cards.push(
      <Card id={card} cardName={`card-${card}`}/>
    )
  }
  return cards;
} 

const addCard = (setCards, cards) => {
  setCards([...cards, 1])
}

const getListsOfCards = (setListsOfCards, listsOfCards, addCardToList, setListAddMenuOpen, listAddMenuOpen, listsNames, setSocketHit, socketHit) => {
  let lists = [];
  for(let list in listsOfCards)
    lists.push(
      <List listName={`${listsNames[list]}`} listId={`list-${list}`} 
      setListsOfCards={setListsOfCards} listsOfCards={listsOfCards} 
      listIndex={list} addCardToList={addCardToList}
      listAddMenuOpen={listAddMenuOpen} setListAddMenuOpen={setListAddMenuOpen}
      socketHit={socketHit} setSocketHit={setSocketHit}
      > 
        {getListCards(listsOfCards, list)}
      </List>
      )
  
  return lists;
} 

const getListCards = (listsOfCards, listIndex) => {
  let cards = [];
  for(let card in listsOfCards[listIndex]){
    cards.push(
      <Card id={`list-${listIndex}-card-${card}`} cardName={`${listsOfCards[listIndex][card].name}`}/>
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

const probeSocket = (socket, listsOfCards, listsNames) => {
  if(listsOfCards.length != 0){
    socket.emit('chat message', "awesome from other app")
    socket.emit('changeBoard', {listsOfCards, listsNames})
    console.log(listsOfCards)
  }
}






export default App;
