import React from "react";
import style from "./Film.module.css"

import { filmInt} from "../../redux/reducer/film";
import {listInt} from "../../redux/reducer/list";
import {useGetFilmQuery, useGetSuggestionsQuery} from "../../redux/filmsAPI/films.api";
import FilmItem from "../../components/FilmItem/FilmItem";

interface propsFilm{
    nowFilm:filmInt,
    myList:Array<listInt>,
    setHidden:any
}



function Film({nowFilm,setHidden}:propsFilm) {


    const {data:suggest,isLoading:loadingsuggest,isError:errorsuggest}=useGetSuggestionsQuery(nowFilm.id)
    const {data:info,isLoading:loadingcasts,isError:errorcasts}=useGetFilmQuery(nowFilm.id)


    const castReturn=(cast:any)=>{
        if (cast!==undefined){
            return (cast.map((el:any,i:number):any=>{
                return(
                    <div  key={i}  className={style.cast__item}>
                        <img className={style.cast__item__image} src={el.url_small_image!==undefined?el.url_small_image:'https://cdn-icons-png.flaticon.com/512/149/149452.png'} alt={"actor"}/>
                        <div className={style.cast__info}>
                            <div className={style.cast__name}>{el.name}
                            </div>
                            <div className={style.cast__name_film}>{el.character_name}</div>
                        </div>
                    </div>
                )
            }))
        }else{
            return <h2 style={{color:"red"}}>Cast unknown</h2>
        }

    }



    return <div className={style.movie}>
        {info && <div className={style.movie__info}>
            <img className={style.movie__image} src={info.data.movie.large_cover_image} alt=""/>
            <div className={style.movie__text}>
                <div className={style.movie__title}>{`${info.data.movie.title} (${info.data.movie.year})`}</div>
                <div className={style.movie__category_and_hour}>
                    <div className={style.movie__category}>{info.data.movie.genres}</div>
                    {/*{info && info.data.movies.genres.map((el:string)=><div className={style.movie__category}>{el}</div>)}*/}
                    <div className={style.movie__hour}>{info.data.movie.language}</div>
                </div>
                <div className={style.movie__overview}>
                    Overview
                    <div className={style.overview__description}>
                        {info.data.movie.description_full}
                    </div>
                </div>
                <div className={style.movie__footer}>
                    <div className={style.movie__score}>Score <span>{info.data.movie.rating}</span></div>
                    <div onClick={()=>setHidden(true)}  className={style.move__add}>Add to Watchlist</div>
                </div>
            </div>
        </div>}

        <div className={style.movie__cast}>
            Cast
            <div className={style.cast__items}>
                {loadingcasts &&<div>Идет загрузка...</div>}
                {errorcasts &&<div>Что то пошлое не так...</div>}
                {info && castReturn(info.data.movie.cast)}
            </div>
        </div>

        <div className={style.movie__related}>
            Related
            <div className={style.related__item}>
                {loadingsuggest &&<div>Идет загрузка...</div>}
                {errorsuggest &&<div>Что то пошлое не так...</div>}
                {
                    suggest && suggest.data.movies.map((el:filmInt)=> <FilmItem large_cover_image={el.large_cover_image}  key={el.id} setHidden={()=>setHidden(true)} id={el.id} runtime={el.runtime}  cast={el.cast} genres={el.genres}   description_full={el.description_full} title={el.title}  year={el.year} medium_cover_image={el.medium_cover_image} rating={el.rating} />)
                }
            </div>

        </div>

    </div>
}

export default Film;