import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Clear from '../../images/clear.svg';
import Trash from '../../images/delete.svg';

Modal.setAppElement('#root')



const CardModal = (props) => {

    const {modalIsOpen, setModalIsOpen, cardData, setListsOfCards, listsOfCards,setSocketHit,socketHit} = props;
    const [cardPriority, setCardPriority] = useState(-1);
    const [cardEstimate, setCardEstimate] = useState(-1);
    const [cardDescription, setCardDescription] = useState("");
    const [cardNameInput, setCardNameInput] = useState("");
    
    useEffect(()=>{
        setCardNameInput(props.card.name);    
        setCardDescription(props.card.description); 
        setCardEstimate(props.card.estimate); 
        setCardPriority(props.card.priority)      
    },[props.card.name, props.card.description, props.card.estimate, props.card.priority]);

    const deleteCard = () =>{
        props.cards.splice(props.cardIndex, 1);
        setModalIsOpen(false);
        setSocketHit(socketHit+1)
    }

    const saveCard = () => {
        console.log(Object.assign(props.card, {priority: cardPriority, description: cardDescription, estimate: cardEstimate}))
        setModalIsOpen(false);
        setSocketHit(socketHit+1);
    }

    const setCardNameOnBlur = () => {
        if(cardNameInput !== ""){
            setListsOfCards(listsOfCards.map((list,index) =>
            {
                if(index === modalIsOpen.modalListIndex)
                    return list.map((card,index)=>{
                        if(index === modalIsOpen.modalCardIndex)
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

    const cancelCardDescription = () => {
        // setCardDescription(listsOfCards[modalIsOpen.modalListIndex][modalIsOpen.modalCardIndex].description);
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
                    value={props.card.name} 
                    onChange={(e) => setCardNameInput(e.target.value)} 
                    onBlur={()=>setCardNameOnBlur()}
                    // onKeyDown={(e)=>{setListNameOnEnter(e)}}
                    >
                </input>
                <label>Priority</label>
                <select value={cardPriority} onChange={(e) => setCardPriority(e.target.value) }>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select> 
                <label>Estimate</label>
                <select value={cardEstimate} onChange={(e) => setCardEstimate(e.target.value)} >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>  
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
                    <button onClick={()=>saveCard()} className="modal-button modal-description-button">Save</button>
                    <button onClick={()=>cancelCardDescription()} className="modal-button modal-description-button">Cancel</button>
                </div>
            </div>
            <div className="modal-side-panel">
                <div className="modal-exit-container" onClick={()=>setModalIsOpen(false)}>
                    <img src={Clear} alt="clear" className="modal-exit"></img>    
                </div>
                <div onClick={()=>deleteCard()} className="modal-button modal-button-card-delete">
                    <p>Delete Card</p>
                    <hr/>
                <img src={Trash} alt="delete"></img>    
                </div>
            </div>
            </Modal>
        </div>
    );
}

export default CardModal;
