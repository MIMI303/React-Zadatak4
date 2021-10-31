import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import './App.css';
import BookDetails from './BookDetails';
import AllBooksPage from './AllBooksPage';
import { BrowserRouter as Router, Link as RouterLink, 
  Switch, Route, useHistory, Redirect, useLocation} from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
  

import { Button, Link, TextField } from '@mui/material';

import { addBook } from './AccessHooks';
import BookDetailsPage from './BookDetailsPage';
import BookSearchPage from './BookSearchPage';

import { useAuth, ProvideAuth} from './useAuth';
import { Formik } from 'formik';
import React, { useState } from 'react';
import PasswordStrenght from './utils/PasswordStrenght';




const AuthButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if(login){
      return <Button variant="contained"  onClick={() => {
          signout( () => history.push("/"));            
      }}>Sign out</Button>
  }else{
      return <span>
        <Button variant="contained"
                component={RouterLink} to="/register" 
                sx={{marginRight: "10px"}}>Register</Button>
        <Button variant="contained" 
                component={RouterLink} to="/login" 
                sx={{marginRight: "10px"}}>Log in</Button>
                </span>
  }
}

const PrivateRoute = ({children, ...rest}) => {
  const [login, error, signin, signout] = useAuth();
  return (
      <Route
          {...rest}
          render={({location}) => {
              if(login){
                  return children;
              }else{
                  return <Redirect
                      to={{pathname: "/login", state: {from: location}}}
                  />
              }
          }}
          />
  ); 
}

const LoginBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();
  
  let {from} = location.state || { from : { pathname: "/"}};
  return <div className="loginBox">
      <h3>Login Forma</h3>
      <Formik
          initialValues={{username: "", password: ""}}
          onSubmit={(values, { setSubmitting }) => {
              signin(values.username, values.password, () => {
                  setSubmitting(false);
              }, () => {
                  history.replace(from);
              });
          }}
      >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            validateField,
            isSubmitting
          }) => (
              <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth 
                    variant="outlined" 
                    name="username" 
                    value={values.username} 
                    label="Korisničko ime" 
                    onChange={handleChange}
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="password" 
                    value={values.password} 
                    label="Lozinka" 
                    onChange={handleChange}
                    type="password"                    
                  /><br/>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>
                  <Link to="/register">Register?</Link>
                  <div>{(error) ? error : ""}</div>
              </form>
          )}
      </Formik>
  </div>
}

const AddBookPage = () => {
  const [login] = useAuth();
  return <BookDetails startingMode="create" action={(book) => addBook(book, login)}/>
}

const RegisterBox = () => {
  const [registration, setRegistration] = useState({
    username: "",
    password: ""
  });

  const [validation, setValidation] = React.useState({
    userExists: true,
    uppercases: false,
    lowercases: false,
    digit: false,
    punct: false,
    length: false,
  })
  const [records, setRecords] = useState([]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegistration({... registration, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {... registration, id:new Date().getTime().toString()}
    setRecords([...records, newRecord]);
    setRegistration({username:"", password:""});
  }

  const passwordScore = () => {
    const count = Object.keys(validation).length - 1
    let passed = 0
    for (let key in validation) {
      if (key === 'userExists') continue
      if (validation[key]) passed++
    }

    if (passed === 0) return 0
    return (passed / count) * 100
  }

  const checkPassword = e => {
    const { value } = e.target
    setValidation(prev => ({
      ...prev,
      uppercases: /^(.*?[A-Z]){2,}/.test(value),
      lowercases: /^(.*?[a-z]){2,}/.test(value),
      digit: /^(?=.*\d)/.test(value),
      punct: /^(?=.*?[#?!@$%^&*-])/.test(value),
      length: value.length > 11,
    }))
  }

  let {from} =  { from : { pathname: "/"}};
  return <div className="registerBox">
      <h3>Register Form</h3>
    <>
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label = "Korisnicko ime"
        variant = "outlined"
        autoComplete = "off"
        value={registration.username}
        onChange={handleInput}
        name="username" 
        id="username"
        />
      <br/>

      <TextField
        fullWidth
        label ="Lozinka"
        variant = "outlined"
        autoComplete = "off"
        value={registration.password}
        onChange={handleInput}
        name="password" 
        id="password"
        onKeyUp={checkPassword}
      />
      <PasswordStrenght score={passwordScore()}/>
      <TextField
        fullWidth
        label ="Potvrdi lozinku"
        variant = "outlined"
        autoComplete = "off"
        value={registration.password}
        onChange={handleInput}
        name="password" 
        id="password"
      />
    <Button 
      fullWidth 
      variant="contained" 
      type="submit" 
      >
      Register
      </Button>
      </form>
      <div>
        {
          records.map((curElem) => {
            const {id, username, password} = curElem;
            <div className = "showDataStyle" key={curElem.id}> 
              <p>{curElem.username}</p>
              <p>{curElem.password}</p>
            </div>


          })
        }
      </div>
    </>
  </div>
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ProvideAuth>
        <Router>
          <div className="main">
          <div className = "title"sx={{marginRight: "10px"}}>Booksore</div>
              <div className = "sidebar">
              <h3> Genres </h3>
              <a href = "g1"><p> All Books </p></a>
              <a href = "g2"><p> Science Fiction</p></a>
              <a href = "g3"><p> Fantasy</p></a>
              <a href = "g4"><p> Computing</p></a>
              <a href = "g5"><p> Mystery</p></a>
              <a href = "g6"><p> Horror</p></a>
              </div>
            <nav className="mainNav">
              <Button component={RouterLink} to="/allBooks" variant="contained" sx={{marginRight: "10px"}}>
                  Sve knjige
              </Button>
              <Button component={RouterLink} to="/searchBooks" variant="contained" sx={{marginRight: "10px"}}>
                  Pretraga
              </Button> 
              
              
                <span style={{flexGrow: 1}}/>
              
              <AuthButton></AuthButton>
            </nav>
            <div className="mainContent">
              <Switch>
                <Route path="/login">
                  <LoginBox/>
                </Route>
                <Route path="/register">
                  <RegisterBox/>
                </Route>
                <PrivateRoute path="/allBooks">
                  <AllBooksPage/>
                </PrivateRoute>
                <PrivateRoute path="/searchBooks">
                  <BookSearchPage/>
                </PrivateRoute>
                <PrivateRoute path="/app/books/new">
                  <AddBookPage/>
                </PrivateRoute>
                <PrivateRoute path="/book/:cid/:operation">
                  <BookDetailsPage/>
                </PrivateRoute>
              </Switch>
            </div>
          </div>
        </Router>
      </ProvideAuth>
    </LocalizationProvider>
  );
}

export default App;
