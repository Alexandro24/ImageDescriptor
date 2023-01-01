import React from 'react';
import { InsertImageBox } from './InsertImageBox';
import { InsertTextBox } from './InsertTextBox';
import { InsertShapeBox } from './InsertShapeBox';


export function DivImageBox({ items, HandleSelect, textItems, selectedText, shapeItems, selectedShapeBox }) {

    return (

        <div className='DivImageBox'>
            
            {items.map((item) => (
                <InsertImageBox item={item} key={item.id} HandleSelect={HandleSelect} />
            ))}

            {textItems.map((item) => (
                <InsertTextBox item={item} key={item.id} selectedText={selectedText} />

            ))}

            {shapeItems.map((item) => (
                <InsertShapeBox item={item} key={item.id} selectedShapeBox={selectedShapeBox} />
            ))}
        </div>


    )
}