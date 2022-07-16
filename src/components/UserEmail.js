// import { useEffect } from "react";
// import { db } from './firebase/db'
// import { collection, getDocs } from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'



export default function Recipes() {

    const userState = useSelector((state) => state.userstate.results);

    if (false) {
        return (
            <>
                <h1>bolloks</h1>
            </>
        )
    }
    return (
        <></>
    )
}
