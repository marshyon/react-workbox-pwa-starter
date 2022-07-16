import { useEffect } from "react";
import { db } from '../firebase/db'
import { collection, getDocs } from 'firebase/firestore/lite'



export default function Recipes() {


    useEffect(() => {
        // collection reference
        const dishesCol = collection(db, 'dishes');
        // get collection data
        getDocs(dishesCol)
            .then((snapshot) => {
                let recipes = []
                snapshot.docs.forEach((doc) => {
                    recipes.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                console.log(recipes)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <></>
    )
}
