import React, { useState, useEffect } from 'react';

export default function Todos() {

    const [apiResponse, setApiResponse] = useState("*** now loading ***");

    useEffect(() => {
        console.log('useEffect ran ...');
        const url = 'https://jsonplaceholder.typicode.com/todos';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setApiResponse(JSON.stringify(data));
            });
    }, []);

    return (
        <div>
            <h1>todos</h1>
            <p> {apiResponse} </p>
        </div>
    )
}
