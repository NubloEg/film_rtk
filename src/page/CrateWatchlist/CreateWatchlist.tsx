import React from "react";
import style from "./CrateWatchlist.module.css"
import {useAppDispatch} from "../../redux/hook";
import {add_list, change_nowList} from "../../redux/reducer/list";
import {Link} from "react-router-dom";



function CreateWatchlist() {

    const [name,setName]=React.useState("")
    const [description,setDescript]=React.useState("")
    const dispatch=useAppDispatch()

    const addList=()=>{
        dispatch(add_list({
            id:3,
            name,
            description,
            films:[],
            runtime:0,
            mid_score:0,
            count:0
            }
        ))
        dispatch(change_nowList({
                id:3,
                name,
                description,
                films:[],
                runtime:0,
                mid_score:0,
                count:0
            }
        ))
        setName("")
        setDescript("")
    }

    return <div className={style.create_watchlist__container}>
        Create a new Watchlist
        <form className={style.create_watchlist__form}>
            <div className={style.name}>Name</div>
            <input value={name} onChange={event => setName(event.target.value)} className={style.form__input_name} type="text"/>
            <div className={style.description}>Description</div>
            <textarea value={description} onChange={event => setDescript(event.target.value)} className={style.form__textarea_description}></textarea>

            <Link to={`/list/${name}`} onClick={addList} className={style.form__btn} > Create  watchlist</Link>
        </form>
    </div>
}

export default CreateWatchlist;