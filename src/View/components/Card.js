import React from 'react';

const Card = (props) => {

  const setModalIsOpen = props.setModalIsOpen;

  const dragStart = (e) => {
    const target = e.target;

    e.dataTransfer.setData('card-id', target.id);
    //console.log(target)
    setTimeout(()=>{
      // target.style.classList.push ="shadow-card";
      target.classList.add('shadow-card');
      
    }, 0);
  }

  const dragOver = (e) => {
    //e.stopPropagation();
    e.preventDefault();
  }

  const dragEnd = (e) => {
        e.target.style.display= 'block';
        e.target.classList.remove('shadow-card');
  }


  return (
    <div 
    id={`card-${props.id}`}
    number={props.id}
    className="card"
    draggable="true"
    onDragEnd={dragEnd}
    onDragStart={dragStart}
    onDragOver={dragOver} 
    >
      <div className="card-content"
        onClick={(e) => setModalIsOpen(getModalCard(e))}
        >
        {props.card.name}
      </div>
    </div>
  );
}

const getModalCard = (e) =>{
  const cardIndex = Array.prototype.indexOf.call(e.target.parentElement.parentElement.children,e.target.parentElement)
  let list = e.target.parentElement.parentElement.parentElement;
  let board = document.querySelector('.board-container'); 
  const listIndex = Array.prototype.indexOf.call(board.children,list);
  return {modalListIndex:listIndex, modalCardIndex:cardIndex}
}

export default Card;
