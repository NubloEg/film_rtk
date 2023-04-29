import React from 'react';
import style from './FilmItem.module.css'
import {Link} from "react-router-dom";
import add from "../../img/listdef.svg";
import great from "../../img/great .svg";
import normal from "../../img/normal.svg";
import bad from "../../img/awful.svg";
import poster from "../../img/poster_main.jpg"
import {useAppDispatch} from "../../redux/hook";
import {add_history, change_nowFilm, filmInt} from '../../redux/reducer/film';


interface itemFilmProps extends filmInt{
    setHidden:any,
    isList?:boolean

}



const FilmItem=({id,setHidden,cast,rating,genres,year,title,description_full,medium_cover_image,large_cover_image,runtime,language,isList}:itemFilmProps)=>{

    const emotion=()=>{
        if (rating!==undefined){
            if (rating>=7.5){
                return great
            }else if(rating>=5 && rating<7.5){
                return normal
            }else{
                return bad
            }
        }
    }
    const dispatch=useAppDispatch()
    const addFilm=(event:any)=>{

        setHidden(true)
        dispatch(change_nowFilm({
            id,
            medium_cover_image,
            title,
            description_full,
            large_cover_image,
            year,
            rating,
            cast,
            runtime,
            genres,
            language

        }))

    }

    const selectFilm=()=>{
        dispatch(change_nowFilm({
            id,
            medium_cover_image,
            large_cover_image,
            title,
            description_full,
            year,
            rating,
            cast,
            runtime,
            genres,
            language
        }))

        dispatch(add_history({
            id,
            medium_cover_image,
            large_cover_image,
            title,
            description_full,
            year,
            rating,
            cast,
            runtime,
            genres,
            language
        }))
    }


    return( <div  className={style.item}>
            <Link onClick={selectFilm} to={`/film/${id}`} >  <img className={style.item_image}   src={medium_cover_image===undefined? poster:medium_cover_image} alt={"poster"}/></Link>

            {
                !isList?<img onClick={(event)=>addFilm(event)} className={style.item__add} src={add} alt=""/>:<></>
            }
            <div className={style.info}>
                <div className={style.info__score} ><img className={style.score__image} src={emotion()} alt=""/>
                    <span>{rating}</span>/10</div>
                <div className={style.info__title}>{title}
                </div>
                <div className={style.info__data}>{`(${year})`}</div>
            </div>
        </div>

    )
}

export default FilmItem