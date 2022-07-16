import React, { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/db'
import AuthLogout from './AuthLogout';
import { storeUserState } from '../redux-toolkit/userStateSlice'
import { useDispatch } from 'react-redux'

export default function AuthChanged() {
  const [loginState, setLoginState] = useState(false);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {

    if(user) {
      setLoginState(user)
      const userState = {
        "name": user.displayName,
        "email": user.email,
        "verified": user.emailVerified,
        "token": user.accessToken
      }
      dispatch(storeUserState(userState))
    }
  })
  return (

    <div>
      {loginState &&
        <><p>you are logged in</p><AuthLogout /></>
      }
      {!loginState &&
        <><p>please login</p></>
      }
    </div>
  )
}
