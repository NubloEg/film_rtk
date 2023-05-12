import React from "react";
import style from "./Authorization.module.css"
import { useForm,SubmitHandler } from "react-hook-form";

import {Link} from "react-router-dom";
import {autoProfile, onChangeInfoProfile, onChangePage, profileInt} from "../../redux/reducer/profile";
import {useAppDispatch} from "../../redux/hook";
import photo from "../../img/photo.svg";

type Inputs = {
    name: string,
    email: string,
    password: string,
    password_repeat: string,
    exampleRequired: string,
};

interface propsAuto{
    profile:profileInt,
   
}

function Authorization({profile}:propsAuto) {

    const { register, handleSubmit, watch, formState: { errors },reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const dispatch=useAppDispatch()

    const [isRegister,setIsRegister]=React.useState(profile.isPage)
    const [email,setEmail]=React.useState('')
    const [password,setPassword]=React.useState('')
    const [valid,setValid]=React.useState(false)

    const validAuto= ()=>{

        let user=profile.allUsers.find(user=>user.email===email)
        if (user!==undefined && user.password===password){

            dispatch(autoProfile({
                user:user,
                isAutorization:true,
                allUsers:profile.allUsers,
                isPage:isRegister

            }))

        }else{
            console.log('hah')
        }


    }

    const changePage=(s:String)=>{
        setIsRegister(s)
        dispatch(onChangePage(s))
    }


    return (


        <div className={style.wrapper}>
            <div className={style.app}>
                {
                    profile.isAutorization? <form onSubmit={handleSubmit(onSubmit)} action="" className={style.form}>
                        <img className={style.auto_img} src={profile.user.img!==undefined? profile.user.img:require('../../img/def_avatar.png')} alt={"img"}/>
                        <div className={style.add_avatar}>
                            <img src={photo} className={style.add_avatar_icon} alt={'ava'}/>
                            <label className={style.custom_file}>
                                Add an avatar
                                <input type={'file'}   className={style.add_avatar_text}/>
                            </label>
                        </div>
                        <div className={style.form_email}>Name *</div>
                        <input   type="text" {...register('name', )}
                                className={`${style.input} ${style.name}`} /*onChange={e=>setName(e.target.value)}*//>
                        <div className={style.form_email}>Email *</div>
                        <input value={email} type="text" {...register('email', )}
                               className={`${style.input} ${style.name}`} onChange={e=>setEmail(e.target.value)}/>
                        <div className={style.form_password}>Password *</div>
                        <input value={password}  type="password"  {...register('password')}  className={`${style.input} ${style.password}`} onChange={e=>setPassword(e.target.value)}/>

                        {errors.exampleRequired && <span>This field is required</span>}
                        <input   type="button" value="Update  Profile" className={style.btn} />

                    </form>:isRegister!=='auto'?  <form onSubmit={handleSubmit(onSubmit)} action="" className={style.form}>
                        <img className={style.auto_img} src={require('../../img/def_avatar.png')} alt={"img"}/>
                        <div className={style.add_avatar}>
                            <img src={photo} className={style.add_avatar_icon} alt={'ava'}/>
                            <label className={style.custom_file}>
                                Add an avatar
                                <input type={'file'}   className={style.add_avatar_text}/>
                            </label>
                        </div>
                        <div className={style.form_email}>Name *</div>
                        <input type="text"  {...register('name', )}
                               className={`${style.input} ${style.name}`} />
                        <div className={style.form_email}>Email *</div>
                        <input  type="text" {...register('email', )}
                                className={`${style.input} ${style.name}`} onChange={e=>setEmail(e.target.value)}/>
                        <div className={style.form_password}>Password *</div>
                        <input  type="password"  {...register('password')}  className={`${style.input} ${style.password}`} onChange={e=>setPassword(e.target.value)}/>

                        {errors.exampleRequired && <span>This field is required</span>}
                        <input  type="button" value="Create  Profile"  className={style.btn}/>
                        

                    </form>:<form onSubmit={handleSubmit(onSubmit)} action="" className={style.form}>
                        <div className={style.form_email}>Email *</div>
                        <input value={email} type="text" {...register('name', )}
                               className={`${style.input} ${style.name}`} onChange={e=>setEmail(e.target.value)}/>
                        <div className={style.form_password}>Password *</div>
                        <input value={password} type="password"  {...register('password')}  className={`${style.input} ${style.password}`} onChange={e=>setPassword(e.target.value)}/>

                        {errors.exampleRequired && <span>This field is required</span>}
                        <Link to={profile.isAutorization?'/profile':'#'}  className={style.btn} onClick={()=>validAuto()}>Log in </Link>
                        <div className={style.change}> or <div onClick={e=>changePage('reg')} className={style.change_div} >create an account</div></div>
                    </form>
                }





            </div>
        </div>


    );
}

export default Authorization



