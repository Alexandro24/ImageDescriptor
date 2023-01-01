import React from "react";
import { InsertTextTool } from "./InsertTextTool";

export function DivInsertTextTool({items,HandleTextSelected}){
    return(
        <div className='queueTextTool'>

            {items.map((item) => (
                <InsertTextTool item={item} HandleTextSelected={HandleTextSelected} key={item.id} />
            ))}

        </div>
    );
}