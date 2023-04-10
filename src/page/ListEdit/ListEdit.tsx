import React from "react";
import style from "./ListEdit.module.css"

import {Link} from "react-router-dom";
import {change_List, change_nowList, listInt, remove_List} from "../../redux/reducer/list";
import { filmInt} from "../../redux/reducer/film";
import {useAppDispatch} from "../../redux/hook";
import EditFilmItem from "../../components/EditFilmItem";

interface propsList{
    nowList:listInt
}

function ListEdit({nowList}:propsList) {

    const [name,setName]=React.useState(nowList.name)
    const [description,setDescript]=React.useState(nowList.description)
    const [films,setFilms]=React.useState(nowList.films)
    const [allScore,setAllScore]=React.useState(nowList.all_score)

    const dispatch=useAppDispatch()
    console.log(nowList)
    const removeList=()=>{
        dispatch(remove_List({
            id:nowList.id,
             name,
            description,
            all_score:nowList.all_score,
            runtime:nowList.runtime,
            count:nowList.count,
            films:nowList.films
        }))
    }
    const changeList=()=>{
        dispatch(change_List({
            ...nowList,
            all_score:allScore,
            name,
            description,
            films,
        }))

        dispatch(change_nowList({
            ...nowList,
            all_score:allScore,
            name,
            description,
            films,
        }))
    }

    const removeItem=(id_film:number)=>{
        let score=allScore-films.filter(el=>el.id===id_film)[0].rating
        score=Number(score.toFixed(2))
        setAllScore(score)
        let newFilms=films.filter(el=>el.id!==id_film)
        setFilms(newFilms)


    }




    return <div className={style.create_watchlist__container}>
        <div className={style.list__edit__title}>
            Edit your Watchlist
            <Link to="/" onClick={removeList} className={style.list__edit__delete}>Delete Watchlist</Link>
        </div>
        <form className={style.create_watchlist__form}>
            <div className={style.name}>Name</div>
            <input value={name} onChange={event => setName(event.target.value)} className={style.form__input_name} type="text"/>
            <div className={style.description}>Description</div>
            <textarea value={description} onChange={event => setDescript(event.target.value)} className={style.form__textarea_description}></textarea>
            <div className={style.list__edit__movies}>
                Movies

                {
                    films.map((el:filmInt,i:number)=><EditFilmItem runtime={el.runtime} removeItem={removeItem} key={el.id} id={el.id} medium_cover_image={el.medium_cover_image} title={el.title} year={el.year} rating={el.rating} /> )
                }



            </div>
            <Link  to={`/list/${name}`}>
                <input onClick={changeList} className={style.form__btn} type="button" value="Save"/>
            </Link>


        </form>
    </div>
}

export default ListEdit;