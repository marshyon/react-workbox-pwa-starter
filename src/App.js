import React, { useState } from 'react'

// import logo from './logo.svg';
import './App.css';
// import Todos from './Todos';
import Recipes from './components/Recipes';
import AuthChanged from './components/AuthChanged';
import AuthUser from './components/AuthUser';
// import { useSelector } from 'react-redux'

function App() {



  const [loginState] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <p>react-workbox-pwa</p>
        
        <Recipes />

        <AuthChanged />

        <AuthUser />
        {!loginState &&
          <>

          </>
        }
      </header>
    </div>
  );
}

export default App;
