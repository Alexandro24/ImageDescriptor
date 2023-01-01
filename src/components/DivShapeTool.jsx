import React from "react";
import { InsertShapeTool } from "./InsertShapeTool";

export function DivShapeTool({items,handleSelectShape}){

    return(
        <div className="divShapeTools">
			{items.map((item)=>(
				<InsertShapeTool item={item} key={item.id} handleSelectShape={handleSelectShape}  />
			))}
		</div>
    );
}//Si se cierra con corchetes no funca