import React from "react";
import style from "./Authorization.module.css"
import { useForm,SubmitHandler } from "react-hook-form";

import {Link} from "react-router-dom";
import {autoProfile, profileInt} from "../../redux/reducer/profile";
import {useAppDispatch} from "../../redux/hook";

type Inputs = {
    name: string,
    email: string,
    password: string,
    password_repeat: string,
    exampleRequired: string,
};

interface propsAuto{
    profile:profileInt
}

function Authorization({profile}:propsAuto) {

    const { register, handleSubmit, watch, formState: { errors },reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const dispatch=useAppDispatch()


    const [email,setEmail]=React.useState('')
    const [password,setPassword]=React.useState('')
    const [valid,setValid]=React.useState(false)

    const validAuto= ()=>{

        let user=profile.allUsers.find(user=>user.email===email)
        if (user!==undefined && user.password===password){

            dispatch(autoProfile({
                user:user,
                isAutorization:true,
                allUsers:profile.allUsers
            }))
        }else{
            console.log('hah')
        }


    }


    return (


        <div className={style.wrapper}>
            <div className={style.app}>

                        <form onSubmit={handleSubmit(onSubmit)} action="" className={style.form}>
                            <div className={style.form_email}>Email *</div>
                            <input value={email} type="text" {...register('name', )}
                                   className={`${style.input} ${style.name}`} onChange={e=>setEmail(e.target.value)}/>
                            <div className={style.form_password}>Password *</div>
                            <input value={password} type="password"  {...register('password')}  className={`${style.input} ${style.password}`} onChange={e=>setPassword(e.target.value)}/>

                            {errors.exampleRequired && <span>This field is required</span>}
                            <Link to={profile.isAutorization?'/profile':'#'}  className={style.btn} onClick={()=>validAuto()}>Log in </Link>
                            <div className={style.change}> or <Link className={style.change_div} to={'/register'}>create an account</Link></div>
                        </form>


            </div>
        </div>


    );
}

export default Authorization



