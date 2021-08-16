import "./Navbar.css";
import Search from "./search/Search.js";
import React, { useState } from "react";
import { update } from "../../service/users";
import logo from "../../assets/img/logo f.gif";
import {useHistory} from  "react-router-dom"

export default function Navbar(props) {
  const [temp, setTemp] = useState((localStorage.user == "" || localStorage.user == null) ? null : JSON.parse(localStorage.user));
  const [inA, setInA] = useState(
    localStorage.in === undefined ? null : localStorage.in
  );
  let userClass = props.userClassName;
  localStorage.setItem("userClassName", userClass);
  const history = useHistory()
  async function logout() {
    let temp = (localStorage.user == "" || localStorage.user == null) ? null : JSON.parse(localStorage.user);
    if (temp != null) {
      temp.status = false;
      localStorage.setItem("user", "");
      localStorage.setItem("userClassName", "true");
      props.onChange(true);
      history.push("/login");
      let a;
      do {
        a = await update("users/" + temp.id, temp);
      } while (a != "=))"); 
    }
  }

  function chengChoose(e) {
    localStorage.setItem("in", e.currentTarget.text);
    setInA(e.currentTarget.text);
  }
  return (
    <div id="continer">
      <span id="logo">
        <img
          src={logo}
          style={{
            marginRight: "20px",
            marginTop: "3px",
            height: "55px",
            width: "55px",
          }}
        />{" "}
      </span>
      <ul id="nav">
        <li>
          <div className="homeList">
            <a
              id="home"
              className={inA === "בית" ? "active" : ""}
              onClick={chengChoose}
              style={{ color: "#f5f56e" }}
              href="/"
            >
              בית
            </a>
            <div className="homeList-content ">
              <a href="buy" onClick={chengChoose}>
                קניה
              </a>
              <a href="sell" onClick={chengChoose}>
                מכירה
              </a>
              <a href="products" onClick={chengChoose}>
                פריטים לקניה
              </a>
            </div>
          </div>
        </li> 
        <li>
          <a
            href="private-area"
            className={inA === "אזור אישי" ? "active" : ""}
            onClick={chengChoose}
          >
            אזור אישי
          </a>
        </li>
        <li>
          <a
            href="about"
            className={inA === "אודות" ? "active" : ""}
            onClick={chengChoose}
          >
            אודות
          </a>
        </li>
        <li>
          <a
            href="faq"
            className={inA === "שאלות נפוצות" ? "active" : ""}
            onClick={chengChoose}
          >
            שאלות נפוצות
          </a>
        </li>
        <li>
          <a
            href="login"
            className={inA === "כניסה" ? "active" : ""}
            onClick={chengChoose}
          >
            כניסה
          </a>
        </li>
        <li>
          <a
            href="register"
            className={inA === "הרשמה" ? "active" : ""}
            onClick={chengChoose}
          >
            הרשמה
          </a>
        </li>
      </ul>
      <div id="float" className="homeList">
        <div id="marginTop">
          <i
            id="user"
            className={userClass ? "fas fa-user-alt-slash" : "fas fa-user-alt"}
          />
          <div className="list">
            {userClass && (
              <a className="listStyle" href="login">
                כניסה
              </a>
            )}
            {!userClass && (
              <div className="listStyle">
                {(temp != null) ? temp.name : ""}
                <div onClick={logout}>
                  יציאה
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Search massege="search" />
    </div>
  );
}
