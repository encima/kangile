import React, {useState, useEffect} from 'react';
import Clear from '../../images/clear.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const List = (props) => {

    const [listNameInput,setListNameInput] = useState("");

    // function handleListNameInput(e){
    //     setListNameInput(e.target.value);
    // }

    useEffect(()=>{
        setListNameInput(props.listName);    
    },[props.listName]);

    const setListNameOnEnter = (e) =>{
        if(e.keyCode===13 && listNameInput !== ""){
            //setListName(listNameInput);
            props.lists[props.listIndex].name = listNameInput
            e.target.blur()
            setSocketHit(socketHit+1);
        }
    }

    const setListNameOnBlur = () =>{
        if(listNameInput !== ""){
            props.lists[props.listIndex].name = listNameInput
            setSocketHit(socketHit+1);
        }
    }

    const deleteList = () =>{
        props.lists.forEach((list, index) => {
            if(list['name'] === props.listName)
                props.lists.splice(index, 1);
        });
        props.setSocketHit(props.socketHit+1);
    }

    const {listIndex, 
        setListAddMenuOpen, listAddMenuOpen, 
        setSocketHit, socketHit,
        } = props;

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card-id');

        const card = document.getElementById(card_id);
        card.style.display= 'block';
         
        if(card === e.target.parentElement) return;
        else if(e.target.className==="card-content"){

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
            if(newCardPlacement ==="top")
              ListsCardInsert(props.lists, firstListIndex, firstCardIndex, secondListIndex, secondCardIndex);
            else
               ListsCardInsert(props.lists, firstListIndex, firstCardIndex, secondListIndex, secondCardIndex);
        }
        else if(e.target.className==="card"){

            //Check if card was dragged above or below
            let heightStart = e.target.offsetTop-8;
            let heightEnd = e.target.offsetTop+e.target.offsetHeight+8;
            let newCardPlacement = (heightEnd+heightStart)/2 > e.clientY? "top":"bottom";     
            console.log(newCardPlacement);
            
            let board = document.querySelector('.board-container');                
            //Beggining Index
            let firstCardIndex = Array.prototype.indexOf.call(card.parentElement.children,card);
            //Beggining List
            let firstListIndex = Array.prototype.indexOf.call(board.children,card.parentElement.parentElement);
            console.log(`${firstCardIndex} : ${firstListIndex}`);

            let secondCard = e.target;

            let secondCardIndex = Array.prototype.indexOf.call(secondCard.parentElement.children,secondCard);
            //Finish list index
            let secondListIndex = Array.prototype.indexOf.call(board.children,secondCard.parentElement.parentElement);
            
            console.log(`${secondCardIndex} : ${secondListIndex}`);
            if(newCardPlacement ==="top")
                ListsCardInsert(props.lists, firstListIndex, firstCardIndex, secondListIndex, secondCardIndex);
            else
                ListsCardInsert(props.lists, firstListIndex, firstCardIndex, secondListIndex, secondCardIndex);
        }else if(e.target.className==="board-list-card-conatiner"){
            console.log("board is empty");
            
            let board = document.querySelector('.board-container');                
            //Beggining Index
            let firstCardIndex = Array.prototype.indexOf.call(card.parentElement.children,card);
            //Beggining List
            let firstListIndex = Array.prototype.indexOf.call(board.children,card.parentElement.parentElement);
            console.log(`${firstCardIndex} : ${firstListIndex}`);

            //Finish list index
            let secondListIndex = Array.prototype.indexOf.call(board.children,e.target.parentElement);
            console.log(`${firstCardIndex} : ${firstListIndex}`);
            console.log(secondListIndex);
            ListsCardInsert(props.lists, firstListIndex, firstCardIndex, secondListIndex, 0);
        }
        props.setSocketHit(props.socketHit+1);    

    }

    const dragOver = (e) => {
        e.preventDefault();
    }



    return (
        <div className="board-list">
            {/* <header className="board-list-header">{listName}</header> */}
            <div className="board-list-header">
                <textarea type="text" className="board-list-header-input"
                value={listNameInput} 
                onChange={(e) => setListNameInput(e.target.value)} 
                onBlur={()=>setListNameOnBlur()}
                onKeyDown={(e)=>{setListNameOnEnter(e)}}>
                </textarea>
                {/* <div className="board-list-header-delete" onClick={()=>deleteList()}>X</div> */}
                <div className="list-delete-container" onClick={()=>deleteList()}>
                    <img alt="delete" src={Clear} className="list-delete"></img>    
                </div>  
            </div>
            <div className="board-list-card-conatiner" 
            id={`list-${props.listId}`}
            onDrop={drop}
            onDragOver={dragOver}
            >
            {props.children}
            </div>
            <div className="board-list-bottom">
                <div className={listAddMenuOpen!==listIndex?"board-list-bottom-add":"board-list-bottom-form-hidden"} onClick={()=>{setListAddMenuOpen(listIndex)}}>+ Add card</div>
                <div className={listAddMenuOpen===listIndex?"board-list-bottom-form":"board-list-bottom-form-hidden"}>
                    <Formik
                        initialValues={{ cardName:'' }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            props.addCardToList(props.lists,props.listIndex,values.cardName)
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
                                    Add card
                                </button>                    
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            
        </div>
    );
}

const ListsCardInsert= (lists, srcListIndex, srcCardIndex, targetListIndex, targetCardIndex, before=true ) =>{
    lists[targetListIndex].cards.push(lists[srcListIndex].cards[srcCardIndex])
    lists[srcListIndex].cards.splice(srcCardIndex,1)
   
  }




export default List;
