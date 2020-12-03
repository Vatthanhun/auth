import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import auth from './firebase';

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMassage: null
  });

  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setSession({
          isLoggedIn: true,
          currentUser: user,
          errorMassage: null
        })
      }
    });
    return () =>{
      handleAuth();
    }
  },[])

  const handleLogout = () => {
    auth.signOut().then(response => {
      setSession({
        isLoggedIn: false,
        currentUser: null
      });
    });
  };

  return (
    <div className="App">
      {
        session.isLoggedIn ? (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Hello World</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>Hello {session.currentUser && session.currentUser.email} </h1>

        <button type="button" onClick={handleLogout}>Logout</button>
      </header>
      ) : (<Login setSession={setSession} />)
      }
      
      
    </div>
  );
}

export default App;
