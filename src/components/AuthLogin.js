import React, { useState, useReducer } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth'
import { auth } from '../firebase/db'

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      password: '',
      name: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}
export default function AuthLogin() {

  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const state = {
    button: 1
  };

  const handleSubmit = ev => {
    ev.preventDefault()

    setSubmitting(true);
    console.log(formData)
    console.log(formData.name)
    console.log(formData.password)

    if (state.button === 1) {
      // LOGIN
      signInWithEmailAndPassword(auth, formData.name, formData.password)
        .then((cred) => {
          console.log('user logged in : ', cred.user.email, 'verified : ', cred.user.emailVerified)
          setSubmitting(false);
          setLoginError("")
          setFormData({
            reset: true
          })
        })
        .catch((err) => {
          console.log(err.message)
          setLoginError(err.message)
          setSubmitting(false);
          setFormData({
            reset: true
          })
        })
    }
    if (state.button === 2) {
      // CREATE ACCOUNT
      createUserWithEmailAndPassword(auth, formData.name, formData.password)
        .then((cred) => {
          console.log('user created : ', cred.user)
          setSubmitting(false);
          setFormData({
            reset: true
          })
          console.log('attempting to set email confirmation message ...')


          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log('SENT EMAIL')
              // ...
            }).catch((err) => {
              console.log('ERROR sending email : ', err)
            });

        })
        .catch((err) => {
          console.log(err.code)
          setLoginError(err.code)
          setSubmitting(false);
          setFormData({
            reset: true
          })
        })
    }

    if (state.button === 3) {
      console.log(`email link reset for email ${formData.name}...`)
      setSubmitting(false);
              sendPasswordResetEmail(auth, formData.name)
            .then(() => {
                setLoginError(`password sent to ${formData.name} - check your email and be sure also to look at the spam folder just in case`)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("failure : ", errorCode, errorMessage)
                setLoginError(`failed to send password - ${errorCode}`)

            });
    }

  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <div className="wrapper">
      {loginError &&
        <div>{loginError}</div>
      }
      {submitting &&
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}><strong>{name}</strong>:{value.toString()}</li>
            ))}
          </ul>
        </div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>user</p>
            <input name="name" onChange={handleChange} value={formData.name || ''} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>password</p>
            <input type="password" name="password" onChange={handleChange} value={formData.password || ''} />
          </label>
        </fieldset>
        <button onClick={() => (state.button = 1)} type="submit">Login</button>
        <button onClick={() => (state.button = 2)} type="create">Create New Account</button>
        <button onClick={() => (state.button = 3)} type="create">Email Reset Link</button>
      </form>

    </div>
  )

}
