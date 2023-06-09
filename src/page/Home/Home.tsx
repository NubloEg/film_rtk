import React, { useState} from "react";
import style from "./Home.module.css"
import FilmItem from "../../components/FilmItem/FilmItem";

import {filmInt} from "../../redux/reducer/film";

import {useGetAllFilmsQuery} from "../../redux/filmsAPI/films.api";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import { change_page } from "../../redux/reducer/home";



interface propsHome{

    setHidden:any,

}



function Home({setHidden,}:propsHome) {

    const {page,rating,genre}=useAppSelector(state=>state.home)
    const {data,isLoading,isError}= useGetAllFilmsQuery({page,genre,rating})

    const [activeSelect,setActiveSelect]=useState(false)
    const categoryMovie=["All","Comedy","Horror","Action","Fantasy","Adventure","Drama","Animation"]
    const dispatch=useAppDispatch()
    const changePage=(bool:boolean)=>{
        let nowPage=Number(page);
        if (bool){
            nowPage+=1
        }else{
            if (nowPage===1){
                nowPage=1
            }else{
                nowPage-=1
            }
        }
        dispatch(change_page({
            page:String(nowPage),
            rating,
            genre
        }))
    }

    const toggleSelect=()=>{
        setActiveSelect(!activeSelect)
    }
    console.log(data?.movies)

    const selectCategory=(el:string)=>{

        setActiveSelect(!activeSelect)
        dispatch(change_page({
            page,
            rating,
            genre:el.toLowerCase(),
        }))
    }
      

        const loading=()=>{




            if(!isLoading && data && data.movies){


                return data.movies.map((el:filmInt,i:number)=>
                    <FilmItem  language={el.language}
                               key={el.id}
                               large_cover_image={el.large_cover_image}
                               setHidden={()=>setHidden(true)}
                               id={el.id} runtime={el.runtime}
                               cast={el.cast} genres={el.genres}
                               description_full={el.description_full}
                               title={el.title}  year={el.year}
                               medium_cover_image={el.medium_cover_image}
                               rating={el.rating} />)

            }

        }
        const [range,setRange]=useState(rating)

        const changeRating=(num:number)=>{
            setRange(num)
            
            dispatch(change_page({
                page,
                rating:range,
                genre,
            }))
        }

    return <div className={style.category__home}>
        <h1>Welcome to Watchlists</h1>

        <div className={style.home__container}>
            <div className={style.optional}>
                <div className={style.filters}>
                    <div className={style.filter__category}>
                        <div onClick={toggleSelect} className={style.main_category}>{genre.toUpperCase()}</div>
                        <div className={activeSelect?`${style.my_select_categorys } ${style.active}`:style.my_select_categorys}>
                            {categoryMovie.map((el,i)=><div key={i} onClick={()=>selectCategory(el)} className={ activeSelect?`${style.category } ${style.active}`:style.category}>{el}</div>)}
                        </div>
                    </div>
                    <div className={style.search_rating}>
                        
                        <div className={style.span_rating}>{`min: ${range.toFixed(1)}`}</div>
                        <input onChange={event=>changeRating(Number(event.target.value))} value={range} type="range" min={0} max={9} step={0.1} />
                    </div>
                </div>
                <div className={style.pagination}>
                    <button className={style.left} onClick={()=>changePage(false)}>left</button>
                    <div className={style.page}>{page}</div>
                    <button className={style.right}  onClick={()=>changePage(true)}>right</button>
                </div>
            </div>

            <div className={style.items}>


                { isLoading && <h1>Идет загрузка...</h1>}
                {isError &&  <h1>Что-то пошло не так</h1>}
                { loading()}



            </div>
        </div>

    </div>

}

export default Home;