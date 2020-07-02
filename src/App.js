import React from 'react';
import './style/index.css';
import List from './components/List';
import Card from './components/Card';

function App() {
  const [title, setTitle] = React.useState("defaultTitle");
  const changeTitle = (title) => setTitle(title)
  const [cards, setCards] = React.useState([]);
  const [listsOfCards, setListsOfCards] = React.useState([[1,2,3,4],[1,2]]);


  return (
    <div>
      <header className="page-header">MellowBoard</header>
      <div className="board-container">
        {getListsOfCards(setListsOfCards, listsOfCards, addCardToList)}
        {/* <List listName="list-1" listId="list-1" cards={cards} setCards={setCards} addCard={addCard}> 
            <Card id="1" cardTitle="card1"/>
            <Card id="2" cardTitle="card2"/>
            <Card id="3" cardTitle="card3"/>
            {getCards(cards)}
            {getListCards(listsOfCards,0)}
        </List>
        <List listName="list-2" listId="list-2" cards={cards} setCards={setCards} addCard={addCard}>
            <Card id="4" cardTitle="card1"/>
            <Card id="5" cardTitle="card3"/>
            {getListCards(listsOfCards,1)}
        </List> */}
        {/* <button onClick={()=>{addCardToList(setListsOfCards, listsOfCards, 1)}}>{title}</button> */}
      </div>
    </div>
  );
}

const getCards = (cardArray) => {
  let cards = [];
  for(let card in cardArray){
    cards.push(
      <Card id={card} cardTitle={`card-${card}`}/>
    )
  }
  return cards;
} 

const addCard = (setCards, cards) => {
  setCards([...cards, 1])
}

const getListsOfCards = (setListsOfCards, listsOfCards, addCardToList) => {
  let lists = [];
  for(let list in listsOfCards)
    lists.push(
      <List listName={`list-${list}`} listId={`list-${list}`} setListsOfCards={setListsOfCards} listsOfCards={listsOfCards} listIndex={list} addCardToList={addCardToList}> 
        {getListCards(listsOfCards, list)}
      </List>
      )
  
  return lists;
} 

const getListCards = (listsOfCards, listIndex) => {
  let cards = [];
  for(let card in listsOfCards[listIndex]){
    cards.push(
      <Card id={`list-${listIndex}-card-${card}`} cardTitle={`card-${card}`}/>
    )
  }
  return cards;
} 

const addCardToList = (setListsOfCards, listsOfCards, listIndex) => {
  setListsOfCards(listsOfCards.map(
    list => {
      if(list == listsOfCards[listIndex])
        return [...list, 1]
      else
        return list;
    }
  ));
  console.log(listsOfCards);
}





export default App;
