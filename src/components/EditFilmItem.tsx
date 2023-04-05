import React from 'react';
import style from '../page/ListEdit/ListEdit.module.css'
import {filmInt} from "../redux/reducer/film";

interface propsEditFilmItem extends filmInt{
    removeItem(target:any):any
}




const EditFilmItem=({id,removeItem,runtime,year,rating,title,medium_cover_image}:propsEditFilmItem)=>{




    return( <div className={style.list__edit__movie}>
        <div className={style.edit__movie__info}>
            <img className={style.edit__image} src={medium_cover_image} alt=""/>
            <div className={style.edit__title}>{`${title} (${year})`}</div>
        </div>
        <div onClick={()=>removeItem(id)} className={style.edit__remove}>Remove</div>
    </div> )
}

export default EditFilmItem