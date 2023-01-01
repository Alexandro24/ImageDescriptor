
import React from 'react';
import Draggable from "react-draggable";

export function InsertShapeBox({ item, selectedShapeBox }){


    const{id, rotate, imageSRC, widthX, heightY, selected} = item;

    var current;
    var currentRotate = "rotate"+"("+rotate+"deg"+")";

    if(selected === true){
        current="2px solid #009619";
    }else{
        current="";
    }

    const HandleShape = () => {
        selectedShapeBox(id);
    }

    return(
        <Draggable>
            <div style={{width: widthX, height:heightY, position:"absolute", border:current}}>
                <img src={imageSRC} alt="Shapes" style={{transform:currentRotate}} onClick={HandleShape} />
            </div>            
        </Draggable>
    );
}