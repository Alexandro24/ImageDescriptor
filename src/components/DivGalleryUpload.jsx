import React from "react";

export function DivGalleryUpload({src,id,GivePhotoFiles}){

    const handleClick=()=>{
        GivePhotoFiles(src);
    }

    return(
        <img src={src} alt="Picture" key={id} onClick={handleClick} />
    );

}