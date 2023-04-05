import React from "react";
import style from "./Film.module.css"

import {filmInt} from "../../redux/reducer/film";
import {listInt} from "../../redux/reducer/list";
import {useGetCastQuery, useGetSuggestionsQuery} from "../../redux/filmsAPI/films.api";
import FilmItem from "../../components/FilmItem/FilmItem";

interface propsFilm{
    nowFilm:filmInt,
    myList:Array<listInt>,
    setHidden:any
}



function Film({nowFilm,myList,setHidden}:propsFilm) {

    const {data:suggest,isLoading:loadingsuggest,isError:errorsuggest}=useGetSuggestionsQuery(nowFilm.id)
    const {data:casts,isLoading:loadingcasts,isError:errorcasts}=useGetCastQuery(nowFilm.id)

console.log(casts.data.movie.cast)
    return <div className={style.movie}>
        {nowFilm && <div className={style.movie__info}>
            <img className={style.movie__image} src={nowFilm.large_cover_image} alt=""/>
            <div className={style.movie__text}>
                <div className={style.movie__title}>{`${nowFilm.title} (${nowFilm.year})`}</div>
                <div className={style.movie__category_and_hour}>
                    <div className={style.movie__category}>{nowFilm.genres}</div>
                    <div className={style.movie__hour}>{nowFilm.language}</div>
                </div>
                <div className={style.movie__overview}>
                    Overview
                    <div className={style.overview__description}>
                        {nowFilm.description_full}
                    </div>
                </div>
                <div className={style.movie__footer}>
                    <div className={style.movie__score}>Score <span>{nowFilm.rating}</span></div>
                    <div onClick={()=>setHidden(true)}  className={style.move__add}>Add to Watchlist</div>
                </div>
            </div>
        </div>}

        <div className={style.movie__related}>
            Related
            <div className={style.related__item}>
                {loadingsuggest &&<div>Идет загрузка...</div>}
                {errorsuggest &&<div>Идет загрузка...</div>}
                {
                    suggest && suggest.data.movies.map((el:filmInt)=> <FilmItem large_cover_image={el.large_cover_image}  key={el.id} setHidden={()=>setHidden(true)} id={el.id} runtime={el.runtime}  cast={el.cast} genres={el.genres}   description_full={el.description_full} title={el.title}  year={el.year} medium_cover_image={el.medium_cover_image} rating={el.rating} />)
                }
            </div>

        </div>

        <div className={style.movie__cast}>
            Cast
            <div className={style.cast__items}>
                {casts.data.movie.cast.map((el:any,i:number):any=>{
                    return(<div key={i}>
                        <div  className={style.cast__item}>
                            <img className={style.cast__item__image} src={el.url_small_image} alt={"actor"}/>
                            <div className={style.cast__info}>
                                <div className={style.cast__name}>{el.name}
                                </div>
                                <div className={style.cast__name_film}>{el.character_name}</div>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>

    </div>
}

export default Film;