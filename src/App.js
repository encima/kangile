import React from 'react';
import './style/index.css';
import List from './components/List';
import TempList from './components/TempList';
import Card from './components/Card';

function App() {
  const [cards, setCards] = React.useState([]);
  const [listsOfCards, setListsOfCards] = React.useState([
    //[{name:"karta nr1"},{name:"karta nr2"},{name:"karta nr3"},{name:"karta nr4"}]
    //,[{name:"karta nr11"},{name:"karta nr12"}]
  ]);
  const [listsNames, setListsNames] = React.useState([
    //"lista pierwsza", "lista druga"
  ]);
  const [listAddMenuOpen, setListAddMenuOpen] = React.useState(-1);



  return (
    <div>

      <header className="page-header">HelloBoard</header>
      <div className="board-container" onClick={(e) => {
      if(e.target.classList.contains("board-container")){
        setListAddMenuOpen(-1)
      }}}>

        {getListsOfCards(setListsOfCards, listsOfCards, addCardToList, 
          setListAddMenuOpen, listAddMenuOpen, listsNames)}
        <TempList setListsOfCards={setListsOfCards} listsOfCards={listsOfCards} 
        setListsNames={setListsNames} listsNames={listsNames}
        addList={addList}/>
      </div>
      <button onClick={() => {addList(listsOfCards,setListsOfCards)}}>+++</button>
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

const getListsOfCards = (setListsOfCards, listsOfCards, addCardToList, setListAddMenuOpen, listAddMenuOpen, listsNames) => {
  let lists = [];
  for(let list in listsOfCards)
    lists.push(
      <List listName={`${listsNames[list]}`} listId={`list-${list}`} 
      setListsOfCards={setListsOfCards} listsOfCards={listsOfCards} 
      listIndex={list} addCardToList={addCardToList}
      listAddMenuOpen={listAddMenuOpen} setListAddMenuOpen={setListAddMenuOpen}> 
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




export default App;
