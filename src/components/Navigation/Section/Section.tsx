import React from 'react';
import {Link} from "react-router-dom";


    interface sectionProps{
    title:string|number,
    url:string,
    img?:string,
    onClick:any,
    className:string
}



const Section=({title,url,img,onClick,className}:sectionProps)=>{
    return(
            <Link onClick={()=>onClick()} to={url} className={className}>
                <img src={require(`../../../img/${img}`)} alt=""/>
                <span>{title}</span>
            </Link>


    )
}

export default Section