import React from 'react';
import Draggable from "react-draggable";

export function InsertImageBox({ item, HandleSelect }) {

    const { imageSRC, selected, widthX, heightY, id } = item;

    var status = "unselected";

    if (selected === true) {
        status = "selected";
    } else {
        status = "unselected";
    }

    const handleClickImg = () => {

        HandleSelect(id);

    }

    return (
        <Draggable>

            <div className={status} style={{ height: heightY, width: widthX,
             backgroundImage: `url(${imageSRC})`, backgroundPosition:"center top", backgroundSize:"cover"}} onClick={handleClickImg}>
            </div>

        </Draggable>
    )
}