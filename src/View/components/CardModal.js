import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Clear from '../../images/clear.svg';
import Trash from '../../images/delete.svg';

Modal.setAppElement('#root')



const CardModal = (props) => {

    const {modalIsOpen, setModalIsOpen, cardData, setListsOfCards, listsOfCards,setSocketHit,socketHit} = props;
    const [cardPriority, setCardPriority] = useState(-1);
    const [cardEstimate, setEstimate] = useState(-1);
    const [cardDescription, setCardDescription] = useState("");
    const [isTextareaOpen, setIsTextAreaOpen] = useState(false);
    const [cardNameInput, setCardNameInput] = useState("");
    const numVals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
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
        //if(e.keyCode==13){
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
        //}
    }

    const cancelCardDescription = () => {
        setCardDescription(listsOfCards[modalIsOpen.modalListIndex][modalIsOpen.modalCardIndex].description);
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
            <div className="modal-main-panel">
                <label //for="card-name-input"
                 className="modal-header-input-label">Card name:</label>            
                <input type="text" id="card-name-input" className="modal-header-input"
                    value={cardNameInput} 
                    onChange={(e) => setCardNameInput(e.target.value)} 
                    onBlur={()=>setCardNameOnBlur()}
                    // onKeyDown={(e)=>{setListNameOnEnter(e)}}
                    >
                </input>
                {/* <select>
                for(let val in numVals)
                    <option value={cardPriority} onChange={(e) => setCardPriority(e.target.value)}>1</option>
                </select> */}
                <label //for="card-description-input" 
                className="modal-description-label">Card description:</label>            
                <textarea
                id="card-description-input"
                className="modal-description-textarea"
                value={cardDescription} 
                onChange={(e) => setCardDescription(e.target.value)}
                //onBlur={cancelCardDescription}
                //onKeyDown={(e) => saveCardDescription(e)}
                >
                </textarea>
                <div className="modal-description-button-container">
                    <button onClick={()=>saveCardDescription()} className="modal-button modal-description-button">Save</button>
                    <button onClick={()=>cancelCardDescription()} className="modal-button modal-description-button">Cancel</button>
                </div>
            </div>
            <div className="modal-side-panel">
                <div className="modal-exit-container" onClick={()=>setModalIsOpen(false)}>
                    <img src={Clear} className="modal-exit"></img>    
                </div>
                <div onClick={()=>deleteCard()} className="modal-button modal-button-card-delete">
                    <p>Delete Card</p>
                    <hr/>
                <img src={Trash} ></img>    
                </div>
            </div>
            </Modal>
        </div>
    );
}

export default CardModal;
