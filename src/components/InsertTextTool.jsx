import React from 'react';

export function InsertTextTool({ item, HandleTextSelected }) {

    /* id:uuidv4(), content:"Inserta un texto" selected: false*/

    const { id, content, selected } = item;

    var boxStyle;

    if (selected === true) {
        boxStyle = 'selected';
    } else {
        boxStyle = "unselected";
    }

    const HandleSelectText = () => {

        HandleTextSelected(id);
    }

    return (

        <div className={"textToolBox" + " " + boxStyle} onClick={HandleSelectText}>
            <div className='textToolSpan'>{content}</div>    
        </div>
    )

}