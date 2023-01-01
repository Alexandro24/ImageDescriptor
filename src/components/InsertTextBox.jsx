import React from 'react';
import Draggable from "react-draggable";

export function InsertTextBox({ item, selectedText }) {

    /**id:uuidv4(), content:"Inserta un texto", widthX: 300, heightY: 300 */

    const { id, content, selected } = item;

    var selec;

    const selectedTextFrame = ()=>{
        selectedText(id);
    }

    if(selected === true){
        selec = "selected";
    }else{
        selec = " ";
    }

    return (

        <Draggable>
            <h1 key={id} className={"textToolCanvas"+" "+ selec} onClick={selectedTextFrame} >{content}</h1>
        </Draggable>


    )
}