import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const CardModal = (props) => {

    const {modalIsOpen, setModalIsOpen, cardData, setListsOfCards, listsOfCards,setSocketHit,socketHit} = props;
    const [cardDescription, setCardDescription] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardNameInput, setCardNameInput] = useState("");
    
    useEffect(()=>{
        setCardDescription(cardData.description);    
        setCardNameInput(cardData.name);    
    },[cardData.name, cardData.description]);

    const deleteCard = () =>{
        setListsOfCards(listsOfCards.map((list,listsIndex) =>{
            if(listsIndex == modalIsOpen.modalListIndex)
                return list.filter((card,cardIndex)=>cardIndex != modalIsOpen.modalCardIndex)
            return list
        }));
        setModalIsOpen(false);
        setSocketHit(socketHit+1)
    }

    const setCardNameOnBlur = () => {
        if(cardNameInput != ""){
            setListsOfCards(listsOfCards.map((list,index) =>
            {
                if(index == modalIsOpen.modalListIndex)
                    return list.map((card,index)=>{
                        if(index == modalIsOpen.modalCardIndex)
                            return {...cardData, name: cardNameInput};
                        else 
                            return card;
                    })
                return list
            }
            ));
            setSocketHit(socketHit+1);
        }
    }

    const saveCardDescription = (e) =>{
        if(e.keyCode==13){
            setListsOfCards(listsOfCards.map((list,listsIndex) =>{
                if(listsIndex == modalIsOpen.modalListIndex)
                    return list.map((card,cardIndex)=>{
                        if(cardIndex == modalIsOpen.modalCardIndex)
                            return {...cardData, description:cardDescription};
                        return card;
                    })
                return list
            }));
            setSocketHit(socketHit+1);
        }
    }


    return (
        <div className="modal-conatiner">
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={()=>setModalIsOpen(false)}
            contentLabel="Example Modal"
            className="card-modal"
            overlayClassName="modal-overlay"
            >
            
            <input type="text" className="modal-header-input"
                value={cardNameInput} 
                 onChange={(e) => setCardNameInput(e.target.value)} 
                 onBlur={()=>setCardNameOnBlur()}
                // onKeyDown={(e)=>{setListNameOnEnter(e)}}
                >
            </input>
            <textarea
            value={cardDescription} 
            onChange={(e) => setCardDescription(e.target.value)}
            //onBlur={saveCardDescription}
            onKeyDown={(e) => saveCardDescription(e)}>
            </textarea>
            <button onClick={()=>saveCardDescription()}>Save</button>
            <button onClick={()=>deleteCard()}>DELETE</button>
            </Modal>
        </div>
    );
}

export default CardModal;
