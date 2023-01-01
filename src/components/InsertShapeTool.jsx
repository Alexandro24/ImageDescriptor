import React from "react";

export function InsertShapeTool({ item, handleSelectShape }) {

    const { imageSRC, widthX, heightY, id, selected, rotate } = item;

    var selec;

    if(selected === true){
        //selec = "2px solid #009619";
        selec = "";
    }else{
        selec = "";
    }


    const handleClick = () => {
        handleSelectShape(id);
    }


    return (
        <div className="iconShapeTool" style={{ border: selec }}>
            <img src={imageSRC} alt="flecha"  onClick={handleClick} style={{width:widthX, height:heightY, rotate:0}}/>
        </div>
    );
}