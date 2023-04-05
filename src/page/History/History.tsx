import React from "react";
import style from "../Home/Home.module.css";

import FilmItem from "../../components/FilmItem/FilmItem";

import {filmInt} from "../../redux/reducer/film";




function History({historyFilms,myList,setHidden}:any) {


    return <div className={style.category__home}>
        <h1>History</h1>
        <div className={style.home__container}>
            <div className={style.items}>
                {
                    historyFilms.map((el:filmInt,i:number)=> <FilmItem key={el.id} large_cover_image={el.large_cover_image} setHidden={()=>setHidden(true)} id={el.id} runtime={el.runtime}  cast={el.cast} genres={el.genres}   description_full={el.description_full} title={el.title}  year={el.year} medium_cover_image={el.medium_cover_image} rating={el.rating} />)
                }

            </div>
        </div>

    </div>
}

export default History;