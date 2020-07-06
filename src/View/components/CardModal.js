import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const CardModal = (props) => {

    const {modalIsOpen, setModalIsOpen, cardData} = props;

    return (
        <div className="modal-conatiner">
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={()=>setModalIsOpen(false)}
            contentLabel="Example Modal"
            className="card-modal"
            overlayClassName="modal-overlay"
            >
            
            <h2>{cardData.name}</h2>
            <button onClick={()=>console.log(cardData)}>close</button>
            <div>I am a modal</div>
            </Modal>
        </div>
    );
}

export default CardModal;
