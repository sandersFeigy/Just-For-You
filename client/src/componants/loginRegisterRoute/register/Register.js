import React, { useState } from 'react';
import InputCompDetailed from '../inputCompDetailed/InputCompDetailed';
import InputIcon from '../inputIcon/InputIcon';
import './Register.css';
import { withRouter } from "react-router-dom";
import { update, add, getAll } from "../../../service/users"
import { valuesErrors } from "../../../validation/registerValidation";
import RegisterSuccess from "./registerSuccess/RegisterSuccess"
import { BlockLoading } from 'react-loadingg';

function Register(props) {
    let urls = ["users", "forSell", "request"];
    const [done, setDone] = useState(true);
    const [success, setSuccess] = useState(false);
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: {}
    })

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        let temp = state;
        switch (e.target.name) {
            case ("name"):
                temp.name = e.target.value;
                break;
            case ("email"):
                temp.email = e.target.value;
                break;
            case ("password"):
                temp.password = e.target.value;
                break;
            case ("confirmPassword"):
                temp.confirmPassword = e.target.value;
                break;
        }
        let newErrors = valuesErrors(temp);
        setState(stateValues => ({
            ...stateValues,
            errors: newErrors
        }))
    }

    function redirectToLogin() {
        props.history.push('/login');
    }

    async function handleSubmitClick(e) {
        e.preventDefault();
        let newErrors = valuesErrors(state);
        setState(stateValues => ({
            ...stateValues,
            errors: newErrors
        }))
        const valid = Object.keys(newErrors).length === 0;
        if(!valid) { 
            return
        }
        window.scrollTo(0, 0);
        setDone(false)
        let users = await getAll(urls[0]);  
        let id = users.length === 0 ? 1 : Number(users[users.length - 1].id) + 1;
        let isValid = true;
        if (valid) {
            if (users.length != 0) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == state.email) {
                        newErrors.email = 'מייל זה כבר נמצא במערכת, נסה להרשם באמצעות מייל אחר'
                        setState(stateValues => ({
                            ...stateValues,
                            errors: newErrors
                        }))
                        isValid = false;
                    }
                }
            }
            if (isValid) {
                let user = {
                    id: id,
                    name: state.name,
                    email: state.email,
                    password: state.password,
                    status: true,
                    buyItems: [],
                    sellItems: []
                }
                let a;
                do {
                    a = await add(urls[0], user);
                } while (a != "=))");
                setSuccess(true);
                window.scrollTo(0, 0);
                setDone(true);
                localStorage.setItem('userClassName', "false");
                if (localStorage.user != undefined && localStorage.user !== "") {
                    let temp = JSON.parse(localStorage.user);
                    let a;
                    do {
                        a = await update('users/' + temp.id, temp);
                    } while (a != "=))");
                    localStorage.setItem('user', "");
                }
                user.status = true;
                localStorage.setItem('user', JSON.stringify(user));
                props.onChange(false);
            } 
            setDone(true)
        }
    }

    let fileds = {
        filed1: { id: "name", htmlFor: "name", label: ':שם מלא', type: "text", placeholder: " ", className: "bigInputRL", value: state.name, onChange: handleChange, ariaDescribedby: "", error: state.errors.name },
        filed2: { id: "email", htmlFor: "exampleInputEmail1", label: ':דואר אלקטרוני', type: "email", placeholder: "  ", className: "bigInputRL", value: state.email, onChange: handleChange, ariaDescribedby: "emailHelp", error: state.errors.email },
        filed3: { id: "password", htmlFor: "exampleInputPassword1", label: ':סיסמה', type: "password", placeholder: " ", className: "bigInputRL", value: state.password, onChange: handleChange, ariaDescribedby: "", error: state.errors.password },
        filed4: { id: "confirmPassword", htmlFor: "exampleInputPassword1", label: ':אימות סיסמה', type: "password", placeholder: "", className: "bigInputRL", value: state.confirmPassword, onChange: handleChange, ariaDescribedby: "", error: state.errors.confirmPassword }

    }
    return (
        <>
      {!done ? (< div className="laod">
        <BlockLoading color={"#ff50a7"} speed={"3"} />
      </div>
      ) :
        <div className="continetRegister">
            {!success && <div className="continer ">
                    <h2 style={{ color: "#f5f56e", fontSize: "2.7vh" }}>הרשמה</h2><hr id='hrS' /><br />
                    <form className='formS'>
                        <InputCompDetailed data={fileds.filed1} />
                        <InputCompDetailed data={fileds.filed2}>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </InputCompDetailed>
                        <InputIcon data={fileds.filed3} />
                        <InputIcon data={fileds.filed4} />
                        <input
                            type="submit"
                            className="submit"
                            onClick={handleSubmitClick}
                            value="להרשמה"
                            id='space'
                        />
                    </form>
                    <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                        {state.successMessage}
                    </div>
                    <div className="mt-2">
                        <span>כבר יש לך חשבון ?  </span>
                        <span className="colorText" onClick={redirectToLogin}>היכנס כאן </span>
                    </div>
                </div>}
                </div>}
            {success && <RegisterSuccess />} 
        </>
    )
}

export default withRouter(Register);