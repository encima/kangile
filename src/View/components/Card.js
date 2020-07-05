import React from 'react';

const Card = (props) => {

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
      <div className="card-content">
        {props.cardName}
      </div>
    </div>
  );
}

export default Card;
