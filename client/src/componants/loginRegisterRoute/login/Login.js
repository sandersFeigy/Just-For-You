import React, { useState } from 'react';
import InputCompDetailed from '../inputCompDetailed/InputCompDetailed';
import { update, getAll } from "../../../service/users"
import { valuesErrors } from "../../../validation/loginValidation";
import { withRouter } from "react-router-dom";
import InputIcon from '../inputIcon/InputIcon';
import { useHistory } from 'react-router-dom';
import { BlockLoading } from 'react-loadingg';
import LoginSuccess from './loginSuccess/LoginSuccess';

function Login(props) {
  const history = useHistory();
  const [done, setDone] = useState(true);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {}
  })

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    let temp = state;
    switch (e.target.name) {
      case ("email"):
        temp.email = e.target.value;
        break;
      case ("password"):
        temp.password = e.target.value;
        break;
    }
    let newErrors = valuesErrors(temp);
    setState(stateValues => ({
      ...stateValues,
      errors: newErrors
    }))
  }

  async function handleSubmitClick(e) {
    setDone(false)
    e.preventDefault();
    let users = await getAll("users");
    let newErrors = valuesErrors(state);
    setState(stateValues => ({
      ...stateValues,
      errors: newErrors
    }))
    const valid = Object.keys(newErrors).length === 0;
    if (!valid) {
      return;
    }
    let isValid = true;
    let userIdx = null;
    if (valid) {
      if (users.length != 0) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == state.email && users[i].password == state.password) {
            userIdx = i;
            break;
          }
          else if (users[i].email == state.email && users[i].password != state.password) {
            newErrors.password = 'סיסמה שגויה, נסה/י שנית'
            setState(stateValues => ({
              ...stateValues,
              errors: newErrors
            }))
            isValid = false;
            break;
          }
        }
      }
      if (isValid && userIdx != null) {
        let user = users[userIdx];
        help();
        localStorage.setItem('userClassName', "false");
        setState({
          email: "",
          password: "",
          errors: {}
        });
        setDone(true);
        user.status = true;
        if (localStorage.user != "" && localStorage.user != undefined) {
          let temp = JSON.parse(localStorage.user);
          temp.status = false;
          let a;
          do {
            a = await update('users/' + temp.id, temp);
          } while (a != "=))");
          localStorage.setItem('user', "");
        }
        localStorage.setItem('user', JSON.stringify(user));
        setSuccess(true)
      }
      else if (isValid && userIdx == null) {
        newErrors.email = 'דואר אלקטרוני לא שמור במערכת ,נסה/י כתובת אחרת'
        setState(stateValues => ({
          ...stateValues,
          errors: newErrors
        }))
        setDone(true)
      }
    }
    setDone(true)
  }

  function help() {
    props.onChange(false);
  }

  function redirectToRegister() {
    props.history.push('/register');
  }

  let fileds = {
    filed1: { id: "email", htmlFor: "exampleInputEmail1", label: ':אימייל', type: "email", placeholder: "  ", className: "bigInputRL", value: state.email, onChange: handleChange, ariaDescribedby: "emailHelp", error: state.errors.email },
    filed2: { id: "password", htmlFor: "exampleInputPassword1", label: ':סיסמה', type: "password", placeholder: " ", className: "bigInputRL", value: state.password, onChange: handleChange, ariaDescribedby: "", error: state.errors.password }
  }
  return (
    <>
      {!done ? (< div className="laod">
        <BlockLoading color={"#ff50a7"} speed={"3"} />
      </div>
      )
        : <div style={{width:"100%"}}>{!success && <div className="continer ">
          <h2 style={{ color: "#f5f56e", fontSize: "2.7vh" }}>כניסה</h2><hr id='hrS' /><br />
          <form className='formS'>
            <InputCompDetailed data={fileds.filed1} />
            <InputIcon data={fileds.filed2} />
            <div className="padding"></div>
            <input
              type="submit"
              className="submit"
              onClick={handleSubmitClick}
              value="לכניסה"
              id='space'
            />
          </form>
          <div className="registerMessage">
            <span>אין לך חשבון ?</span>
            <span className="colorText" onClick={() => redirectToRegister()}> הירשם</span>
          </div>
        </div>}
          {success && <LoginSuccess />}
        </div>
      }
    </>
  )
}
export default withRouter(Login);