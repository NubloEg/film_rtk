import React from "react";
import style from "./Home.module.css"
import FilmItem from "../../components/FilmItem/FilmItem";

import {filmInt} from "../../redux/reducer/film";
import {listInt} from "../../redux/reducer/list";
import {useGetAllFilmsQuery} from "../../redux/filmsAPI/films.api";
import {useAppDispatch} from "../../redux/hook";


interface propsHome{
    allFilms:Array<filmInt>,
    myList:Array<listInt>,
    setHidden:any
}



function Home({allFilms,myList,setHidden}:propsHome) {

    const {data,isLoading,isError}=useGetAllFilmsQuery("")




    return <div className={style.category__home}>
        <h1>Welcome to Watchlists</h1>

        <div className={style.home__container}>
            <div className={style.optional}>
                <div className={style.filters}></div>
                <div className={style.pagination}></div>
            </div>
            {isLoading&&<h1>Идет загрузка...</h1>}
            {isError&&<h1>Что-то пошло не так...</h1>}
            <div className={style.items}>

                {
                  data &&  data.data.movies.map((el:filmInt,i:number)=> <FilmItem language={el.language} key={el.id} large_cover_image={el.large_cover_image} setHidden={()=>setHidden(true)} id={el.id} runtime={el.runtime}  cast={el.cast} genres={el.genres}   description_full={el.description_full} title={el.title}  year={el.year} medium_cover_image={el.medium_cover_image} rating={el.rating} />)
                }


            </div>
        </div>

    </div>

}

export default Home;