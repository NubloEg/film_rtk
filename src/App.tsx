import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Home from "./page/Home/Home";
import {Route, Routes} from "react-router-dom";
import History from "./page/History/History";
import CreateWatchlist from "./page/CrateWatchlist/CreateWatchlist";
import List from "./page/List/List";
import Film from "./page/Film/Film";
import ListEdit from "./page/ListEdit/ListEdit";
import { useAppSelector} from "./redux/hook";
import Modal from "./components/Modal/Modal";




function App() {
    const film=useAppSelector(state => state.film)
    const list=useAppSelector(state => state.list)
    const [hidden,setHidden]=React.useState(false)


  return (
    <div className="App">
        <Navigation myList={list.myList} nowList={list.nowList} />
        <main className={"main"}>
            <Routes>
                <Route path={'/'} element={<Home  setHidden={setHidden} />}/>
                <Route path={'/history'} element={<History setHidden={setHidden} myList={list.myList} historyFilms={film.historyFilms}/>}/>
                <Route path={'/createwatchlist'} element={<CreateWatchlist/>}/>
                <Route path={'/list/*'} element={<List setHidden={setHidden}  nowList={list.nowList}/>}/>
                <Route path={'/film/*'} element={<Film setHidden={setHidden} myList={list.myList} nowFilm={film.nowFilm}/>}/>
                <Route path={'/list_edit/*'} element={<ListEdit nowList={list.nowList}/>}/>
            </Routes>
        </main>
        {hidden?<Modal  nowFilm={film.nowFilm} myList={list.myList} setHidden={()=>setHidden(false)}/>:<></>}
    </div>
  );
}

export default App;
