import style from "../Navigation.module.css";
import React from "react";
import {Link} from "react-router-dom";
import {change_nowList, listInt} from "../../../redux/reducer/list";
import {useAppDispatch} from "../../../redux/hook";

interface propsListItem extends listInt{
    className:string,
    setListActive(target:number):void,
}



const ListItem=({id,name,runtime,description,count,mid_score,films,className,setListActive}:propsListItem)=>{
    const firstChar=String(name)[0]

    const dispatch=useAppDispatch()

    const selectList=()=>{
        dispatch(change_nowList({
            id,
            name,
            runtime,
            description,
            count,
            mid_score,
            films
        }))
        setListActive(id)
    }

    return(
        <Link onClick={selectList} to={`/list/${name}`} className={className}>
            <div className={style.item__icon}><span>{firstChar}</span></div>
            <div className={style.item__title}>{name}</div>
        </Link>


    )
}

export default ListItem

