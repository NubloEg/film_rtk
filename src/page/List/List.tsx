import React from "react";
import style from "./List.module.css"
import FilmItem from "../../components/FilmItem/FilmItem";
import edit from "../../img/edit.svg"
import {Link} from "react-router-dom";

import {listInt} from "../../redux/reducer/list";
import {filmInt} from "../../redux/reducer/film";

interface propsList{
    nowList:listInt,
    setHidden:any
}


function List({nowList,setHidden}:propsList) {



    return <div className={style.list__container}>
        <div className={style.list__title}>
            <div>{nowList.name}</div>
            <Link to={`/list_edit/${nowList.name}`}> <img className={style.list__edit} src={edit} alt="edit"/></Link>
        </div>
        <div className={style.list__about}>
            About this watchlist
            <div className={style.list__description}>{nowList.description}</div>
        </div>

        <div className={style.list__info}>
            <div className={style.list__info__item}>
                <div className={style.info__item__title}>ITEMS ON LIST</div>
                <div className={style.info__item__num}>{nowList.films.length}</div>
            </div>
            <div className={style.list__info__item}>
                <div className={style.info__item__title}>UNWATCHED RUNTIME</div>
                <div className={style.info__item__num}>{nowList.runtime}</div>
            </div>
            <div className={style.list__info__item}>
                <div className={style.info__item__title}>AVERAGE SCORE</div>
                <div className={style.info__item__num}>{nowList.all_score.toFixed(1)}</div>
            </div>
        </div>

        <div className={style.list__films}>
            {
                nowList.films.map((el:filmInt,i:number)=> <FilmItem large_cover_image={el.large_cover_image} isList={true} key={el.id} setHidden={()=>setHidden(true)} id={el.id} runtime={el.runtime}  cast={el.cast} genres={el.genres}   description_full={el.description_full} title={el.title}  year={el.year} medium_cover_image={el.medium_cover_image} rating={el.rating} />)
            }



        </div>

    </div>
}

export default List;