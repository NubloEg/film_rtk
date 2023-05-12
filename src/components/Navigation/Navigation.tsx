import React from 'react';
import style from './Navigation.module.css'
import Section from "./Section/Section";
import ListItem from "./ListItem/ListItem";

import user from "../../../src/img/user.svg"
import search from "../../../src/img/search.svg"
import {Link} from "react-router-dom";
import {listInt} from "../../redux/reducer/list";
import {onChangePage, profileInt} from "../../redux/reducer/profile";
import { useAppDispatch } from '../../redux/hook';

interface propsNav{
    myList:Array<listInt>,
    nowList:listInt,
    profile:profileInt
}


const Navigation=({myList,nowList,profile}:propsNav)=>{
    const [burgerActive,setBurgerActive]=React.useState(false)
    const dispatch=useAppDispatch()

    const section=["Home","History"]
    const [sectionActive,setSectionActive]=React.useState("Home")
    const [listActive,setListActive]=React.useState(nowList.id)

    const selectCrateWatchList=()=>{
        setSectionActive('')
        setListActive(-1)

    }

    const selectSection=(el:string)=>{
        setSectionActive(el)
        setListActive(-1)
    }
    const selectList=(id:number)=>{
        setSectionActive("")
        setListActive(id)
    }


    return(<>
        <div onClick={()=>setBurgerActive(!burgerActive)} className={burgerActive? `${style.burger} ${style.burger_active}`:style.burger}>

          <div className={style.burger_click}>
              <span className={style.burger_span}></span>
              <span className={style.burger_span}></span>
              <span className={style.burger_span}></span>
            </div>

            <div className={burgerActive? style.burger_nav:style.burger_nav_active}>
               <div className={style.center}>
                   {
                       section.map((el:string,i:number)=><Section key={i} img={`${el}.svg`} className={sectionActive===el?`${style.section} ${style.active}`:style.section} onClick={()=>selectSection(el)}  url={el==='Home'?`/`:`/${el.toLowerCase()}`} title={el}/>)
                   }
                   <Link to="/createwatchlist" onClick={selectCrateWatchList} className={style.create}>+ Create watchlist</Link>
                   <hr className={style.line}/>
                   <div className={style.watchlist}>
                       <div className={style.list}>My Lists
                           {
                               myList.map((el:listInt,i:number)=><ListItem setListActive={selectList} className={listActive!==el.id?style.my_list__item:`${style.my_list__item} ${style.my_list__item__active}`} id={el.id} films={el.films} count={el.count} all_score={el.all_score} runtime={el.runtime} description={el.description} key={el.id} name={el.name}/>)
                           }
                       </div>
                   </div>
                   <Link to={"/profile" }className={style.user}>
                       <img src={profile.isAutorization?profile.user.img!==undefined?profile.user.img:user:user} alt="" className={style.user__icon}/>
                       <div className={style.user__name}>{profile.isAutorization?profile.user.name:'GUEST'}</div>
                   </Link>
               </div>
            </div>
        </div>
            <nav className={style.navigation}>

                <Link to={"/"} onClick={()=> selectSection('Home')} className={style.logo}>Watchlists</Link>
                {/*   <div className={style.search}>
                <img className={style.search__logo} src={search} alt=""/>
                <input className={style.search__input} placeholder="Search"/>
            </div>*/}

                {
                    section.map((el:string,i:number)=><Section key={i} img={`${el}.svg`} className={sectionActive===el?`${style.section} ${style.active}`:style.section} onClick={()=>selectSection(el)}  url={el==='Home'?`/`:`/${el.toLowerCase()}`} title={el}/>)
                }


                <Link to="/createwatchlist" onClick={selectCrateWatchList} className={style.create}>+ Create watchlist</Link>
                <hr className={style.line}/>
                <div className={style.watchlist}>
                    <div className={style.list}>My Lists
                        {
                            myList.map((el:listInt,i:number)=><ListItem setListActive={selectList} className={listActive!==el.id?style.my_list__item:`${style.my_list__item} ${style.my_list__item__active}`} id={el.id} films={el.films} count={el.count} all_score={el.all_score} runtime={el.runtime} description={el.description} key={el.id} name={el.name}/>)
                        }


                    </div>
                </div>
                <Link to={"/profile" } onClick={e=>dispatch(onChangePage('auto'))} className={style.user}>
                    <img src={profile.isAutorization?profile.user.img!==undefined?profile.user.img:user:user} alt="" className={style.user__icon}/>
                    <div className={style.user__name}>{profile.isAutorization?profile.user.name:'GUEST'}</div>
                </Link>
            </nav>
        </>





    )
}

export default Navigation