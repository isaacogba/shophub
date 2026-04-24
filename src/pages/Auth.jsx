import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
const [mode, setMode] = useState("signup") 
const [error ,setError ] =  useState(null)
const { signUp ,login, logout} = useAuth()
const navigate = useNavigate()



const {register, handleSubmit , formState: { errors } } = useForm()

function onSubmit(data){
  let result;
  if(mode === "signup"){
 result = signUp(data.email,data.password)
  }else{
   result = login(data.email,data.password)
  }
  console.log(result)

  if(result.success){
    navigate("/")
}else{
  setError(result.error)
}
  
}


  return (
    <div className='page'>
      <div className='container'>
        <div className='auth-container'>
           <h1 className='page-title'>
          {mode === "signup" ? 'sign-up' : 'login'}
         </h1>

         <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
          { error && <div className='error-message'> {error} </div> }
          <div className='form-group' >
            <label className='form-label' htmlFor="email">email</label>
            <input className='form-input' 
            type="email"
             placeholder='email'
              id='email' 
              {...register("email",{
              required:"email is required"
            })}/>

            {errors.email && <p className='form-error'> {errors.email.message} </p> }
          </div>
          <div className='from-group'>
            <label className='form-label' htmlFor="password">password</label>
            <input  className='form-input'
             type="password"
              placeholder='password'
               id='password'
                {...register("password",{
              required:"password is require",
              minLength: {
                value:6,
                message:"password must be atleast 6 character"
              },
              maxLength :{
                value:12,
                message:"password must be at most 12"
              }
            })} /> 

            {errors.password && <p className='form-error'> {errors.password.message} </p> }                 
          </div>
          <button  className='btn btn-primary btn-large'   type='submit'> {mode === "signup" ? 'sign-up' : 'login'} </button>
         </form>

          <div className='auth-switch'>
             {mode === "signup" ?
           ( <p>Already have an account? <span className='auth-link' onClick={() =>{setMode("login")}}>login</span> </p>):
           ( <p>Don't have an account? <span className='auth-link'  onClick={() =>{setMode("signup")}}>sign-up</span> </p>)
             }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth