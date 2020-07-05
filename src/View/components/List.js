import React from 'react';
import ReactDOM from 'react-dom'
import Card from './Card';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const List = (props) => {

    const listsOfCards = props.listsOfCards;
    const setListsOfCards = props.setListsOfCards;
    const listIndex = props.listIndex;
    const setListAddMenuOpen = props.setListAddMenuOpen;
    const listAddMenuOpen = props.listAddMenuOpen;


    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card-id');

        const card = document.getElementById(card_id);
        card.style.display= 'block';

        

        
            
        if(e.target.className=="card-content"){
            //e.target.parentElement.parentElement.appendChild(card);
            let cards = e.target.parentElement.parentElement;
            let position = e.target.offsetTop;
            //console.log(e.target);

            //Check if card was dragged above or below
            let heightStart = e.target.offsetTop-8;
            let heightEnd = e.target.offsetTop+e.target.offsetHeight+8;
            let newCardPlacement = (heightEnd+heightStart)/2 > e.clientY? "top":"bottom";     

            let board = document.querySelector('.board-container');                
            //Beggining Index
            let firstCardIndex = Array.prototype.indexOf.call(card.parentElement.children,card);
            //Beggining List
            let firstListIndex = Array.prototype.indexOf.call(board.children,card.parentElement.parentElement);
            
            let secondCard = e.target.parentElement;
            //Finish index
            let secondCardIndex = Array.prototype.indexOf.call(secondCard.parentElement.children,secondCard);
            //Finish list index
            let secondListIndex = Array.prototype.indexOf.call(board.children,secondCard.parentElement.parentElement);

            //Insert before or after depending on drag position
            if(newCardPlacement =="top")
                ListsCardInsert(setListsOfCards, listsOfCards, firstListIndex, firstCardIndex, secondListIndex, secondCardIndex);
            else
                ListsCardInsert(setListsOfCards, listsOfCards, firstListIndex, firstCardIndex, secondListIndex, secondCardIndex, false);
        
            props.setSocketHit(props.socketHit+1);    
        }
        else if(e.target.className=="card"){
            console.log(e.target)
            //e.target.parentElement.appendChild(card);
            
        }else if(e.target.className=="board-list-card-conatiner")
            console.log();
            
            //e.target.appendChild(card);
    }

    const dragOver = (e) => {
        e.preventDefault();
        //console.log(e)

    }



    return (
        <div className="board-list">
            <header className="board-list-header">{props.listName}</header>
            <div className="board-list-card-conatiner" 
            id={`list-${props.listId}`}
            onDrop={drop}
            onDragOver={dragOver}
            >
            {props.children}
            </div>
            <div className="board-list-bottom">
                <span className="board-list-bottom-add" onClick={()=>{setListAddMenuOpen(listIndex)}}>+ Add card</span>
                <div className={listAddMenuOpen==listIndex?"board-list-bottom-form":"board-list-bottom-form-hidden"}>
                    <Formik
                        initialValues={{ cardName:'' }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            props.addCardToList(setListsOfCards,listsOfCards,listIndex,values.cardName)
                            props.setSocketHit(props.socketHit+1);    
                            setSubmitting(false);
                            }, 50);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field type="text" name="cardName"/>
                                <ErrorMessage name="cardName" component="div" />
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>                    
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            
        </div>
    );
}

const ListsCardInsert= (setListsOfCards, listsOfCards, firstListIndex, firstCardIndex, secondListIndex, secondCardIndex, before=true ) =>{
    const first = listsOfCards[firstListIndex][firstCardIndex];
    const second = listsOfCards[secondListIndex][secondCardIndex];
    setListsOfCards(listsOfCards.map(
      (list,index) => {
        if(index==firstListIndex) list = list.filter(card => card != first);
        if(index==secondListIndex) {
            //list.slice(secondCardIndex, 0, "second")
            //list.push(second);
            if(before)
                list = insertBefore(secondCardIndex,list,first);
            else
                list = insertAfter(secondCardIndex,list,first);
        };
        return list;
      } 
    ));
  }

let insertBefore = ( index, array, item  ) => {
    array.splice( index, 0, item );
    return array;
};

let insertAfter = ( index, array, item  ) => {
    array.splice( index+1, 0, item );
    return array;
};



export default List;
