import React from "react";
import style from "./Register.module.css"
import { useForm,SubmitHandler } from "react-hook-form";
import photo from '../../img/photo.svg'
import {createProfile, profileInt} from "../../redux/reducer/profile";
import {useAppDispatch} from "../../redux/hook";



type Inputs = {
    name: string,
    email: string,
    password: string,
    password_repeat: string,
    exampleRequired: string,
};

interface propsReg{
    profile:profileInt
}

function Register({profile}:propsReg) {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const [name,setName]=React.useState(profile.user.name)
    const [email,setEmail]=React.useState(profile.user.email)
    const [password,setPassword]=React.useState(profile.user.password)

    const dispatch=useAppDispatch()

   const registrarion=()=>{
       dispatch(createProfile({
           id:1,
           email,
           password,
           name,
           username:name
       }))
   }

    return (

                <div className={style.wrapper}>
                    <div className={style.app}>

                        <form onSubmit={handleSubmit(onSubmit)} action="" className={style.form}>
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
                                   className={`${style.input} ${style.name}`} onChange={e=>setName(e.target.value)}/>
                            <div className={style.form_email}>Email *</div>
                            <input  type="text" {...register('email', )}
                                    className={`${style.input} ${style.name}`} onChange={e=>setEmail(e.target.value)}/>
                            <div className={style.form_password}>Password *</div>
                            <input  type="password"  {...register('password')}  className={`${style.input} ${style.password}`} onChange={e=>setPassword(e.target.value)}/>

                            {errors.exampleRequired && <span>This field is required</span>}
                            <input  type="button" value="Create  Profile" onClick={registrarion} className={style.btn}/>

                        </form>


                    </div>
                </div>






    );
}

export default Register




