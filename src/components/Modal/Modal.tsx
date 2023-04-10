import style from "./Modal.module.css";
import React from "react";
import close from "../../img/close.svg"
import {add_film_to_list, add_list, change_nowList, listInt} from "../../redux/reducer/list";
import {useAppDispatch} from "../../redux/hook";
import {Link} from "react-router-dom";
import {filmInt} from "../../redux/reducer/film";

interface propsModal{
    setHidden(target:boolean):void,
    myList:Array<listInt>,
    nowFilm:filmInt
}

const Modal=({setHidden,myList,nowFilm}:propsModal)=>{
    const [newWatch,setNewWatch]=React.useState(false)

    const falseHidden=(ev:any)=>{
        console.log(ev.target.className)
        if (ev.target.className.indexOf('modal__close')>0||ev.target.className.indexOf('add_film')>0){
            setHidden(false)
        }
    }

    const [name,setName]=React.useState("")
    const [description,setDescript]=React.useState("")

    const dispatch=useAppDispatch()

    const addFilm=(list:listInt)=>{

        dispatch(add_film_to_list({
                ...list,
                all_score:Number(nowFilm.rating.toFixed(2)),
                films:[nowFilm]
            }
        ))
        setHidden(false)
    }

    const addList=()=>{
        dispatch(add_list({
                id:3,
                name,
                description,
                films:[],
                runtime:0,
                all_score:0,
                count:0
            }
        ))

        dispatch(change_nowList({
                id:3,
                name,
                description,
                films:[],
                runtime:0,
                all_score:0,
                count:0
            }
        ))

        setName("")
        setDescript("")
        setHidden(false)
    }


    return(
        <section onClick={(e)=>falseHidden(e)} className={style.add_film}>
            <div className={style.modal}>
                <img  className={style.modal__close} src={close} alt=""/>
                {
                    newWatch?<>
                        <div className={style.modal__title__create}>Create new watchlist</div>
                        <div className={style.modal__foot}>
                            <div className={style.modail__title}>
                                <div className={style.modal_name}>Name</div>
                                <div className={style.modal_description}>Description</div>
                            </div>
                            <div className={style.modal__input}>
                                <input value={name} onChange={event => setName(event.target.value)} className={style.name_input}/>
                                <textarea value={description} onChange={event => setDescript(event.target.value)} className={style.descript_input}></textarea>

                            </div>
                            <div className={style.modal__btn}>
                                <div onClick={()=>setNewWatch(false)} className={style.modal__cancel}>Cancel</div>
                                <Link to={`/list/${name}`} onClick={addList} className={style.modal__save}>Save</Link>

                            </div>
                        </div>
                    </>:<> <div className={style.modal__title}>Add movie: <span>Top Gun: Maverick (2022)</span></div>
                        <div className={style.modal_watchlist}>To watchlist:</div>
                        <div className={style.modal_watchlist__items}>
                            {
                                myList.map((el:listInt,i:number)=><div key={el.id}>
                                    <div onClick={()=>addFilm(el)} className={style.modal_watchlist__item}>
                                        <div className={style.item__icon}><span>{String(el.name)[0]}</span></div>
                                        <div className={style.item__title}>{el.name}</div>
                                    </div>
                                </div>)
                            }


                        </div>
                        <div onClick={()=>setNewWatch(true)}  className={style.modal__add__watchlist}>
                            <div className={style.add__icon}><span>+</span></div>
                            <div  className={style.add__title}>New watchlist</div>
                        </div></>
                }

            </div>
        </section>


    )
}

export default Modal

