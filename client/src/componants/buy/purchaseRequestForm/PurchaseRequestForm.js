import "./PurchaseRequestForm.css";
import InputComp from "../../inputComp/InputComp";
import React, { useState, useEffect } from "react";
import { valuesErrors } from "../../../validation/buyValidation";
import { update, getAll, add } from "../../../service/users";
import Slider from "@material-ui/core/Slider";
import Checkbox from "../../checkbox/Checkbox";
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { BlockLoading } from 'react-loadingg';

let colorChoose = [];
let newArr = [];

export default function PurchaseRequestForm(props) {
  let moment = require('moment');
  let setbuyItem = props.setbuyItem;
  let history = useHistory();
  const setDone = props.updateDone;
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  let TrueArray = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ]
  let FalseArray = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]
  const [trueArray, setTrueArray] = useState(TrueArray);
  const [falseArray, setFalseArray] = useState(FalseArray);
  const [checkbox, setCheckbox] = useState(FalseArray);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [state, setState] = useState({
    name: "",
    model: "",
    category: "שונות",
    requastDate: "",
    madeDate: "",
    companyName: "",
    color: [],
    otherThings: "",
    errors: {},
  });

  useEffect(() => {
    onloud(categories);
  }, []);

  const onloud = async (a) => {
    let Categories = await getAll("Categories");
    let colors = await getAll("colors");
    setCategories(Categories);
    setColors(colors);
    setDone(true)
  };

  function setCheckb(flag2, i, bool) {
    if (bool && flag2) {
      colorChoose = [];
      colors.map((element, idx) => {
        if (idx !== 0) colorChoose.push(element[0]);
      });
      newArr = trueArray;
      setCheckbox(newArr);
    } else if (bool && !flag2) {
      let flag = true;
      colorChoose.map((element) => {
        if (element === colors[i][0]) {
          flag = false;
        }
      });
      if (flag && !flag2) {
        colorChoose.push(colors[i][0]);
      }
    } else if (!bool && flag2) {
      colorChoose = [];
      newArr = falseArray;
      setCheckbox(newArr);
    } else if (!bool && !flag2) {
      let elem = null;
      colorChoose.map((element) => {
        if (element === colors[i][0]) {
          elem = element;
        }
      });
      if (elem != null) {
        colorChoose.pop(elem);
      }
    }
    setState({
      ...state,
      color: colorChoose,
    });
    let temp = state;
    temp.color = colorChoose;
    let newErrors = valuesErrors(temp);
    setState((stateValues) => ({
      ...stateValues,
      errors: newErrors,
    }));
  }

  const rangeSelector = (event, newValue) => {
    setPriceRange(newValue);
  };

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    let temp = state;
    switch (e.target.name) {
      case "name":
        temp.name = e.target.value;
        break;
      case "model":
        temp.model = e.target.value;
        break;
      case "category":
        temp.category = e.target.value;
        break;
      case "color":
        temp.color = e.target.value;
        break;
      case "requastDate":
        temp.requastDate = e.target.value;
        break;
      case "madeDate":
        temp.madeDate = e.target.value;
        break;
      case "companyName":
        temp.companyName = e.target.value;
        break;
      case "otherThings":
        temp.otherThings = e.target.value;
        break;
    }
    let newErrors = valuesErrors(temp, colorChoose);
    setState((stateValues) => ({
      ...stateValues,
      errors: newErrors,
    }));
  }

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  async function handleSubmitClick(e) {  
    e.preventDefault();
    let newErrors = valuesErrors(state, colorChoose);
    setState((stateValues) => ({
      ...stateValues,
      errors: newErrors,
    }));
    const valid = Object.keys(newErrors).length === 0; 
    if(!valid){
      window.scrollTo(350, 350);
      return;
    }
    window.scrollTo(0, 0);
    setDone(false)
    let request = await getAll("request");
    let requestId =
      request.length === 0 ? 1 : Number(request[request.length - 1].id) + 1; 
    if (valid && (localStorage.user === undefined || localStorage.user === "")) { 
      props.showError("! רק משתמשים מחוברים יכולים להציג בקשות לפריטים באתר");
      setDone(true)
    } else if (valid && localStorage.user != undefined && localStorage.user !== "") {
      let temp = JSON.parse(localStorage.user);
      let id = temp.buyItems.length === 0 ? 1 : Number(temp.buyItems[temp.buyItems.length - 1].id) + 1;
      let date = new Date();
      let end = moment(date).add(30, 'days');
      let close = moment(date).add(37, 'days');
      const buyItem = {
        id: id,
        userId: temp.id,
        requestId: requestId,
        name: state.name,
        model: state.model === "" ? "אין הגבלה" : state.model,
        category: state.category === "" ? "שונות" : state.category,
        requastDate: formatDate(date),
        madeDate: state.madeDate === "" ? "אין הגבלה" : state.madeDate,
        companyName: state.companyName === "" ? "אין הגבלה" : state.companyName,
        color: colorChoose.length === 15 ? "אין הגבלה" : colorChoose,
        range:
          priceRange[0] === 0 && priceRange[1] === 0
            ? "אין הגבלה"
            : priceRange,
        otherThings: state.otherThings === "" ? "אין הגבלה" : state.otherThings,
        sellOffers: 0,
        endDay: formatDate(end),
        finish: false,
        close: formatDate(close),
        offers: [],
      };
      const requestItem = {
        id: requestId,
        userId: temp.id,
        userItemsId: id,
        name: state.name,
        model: state.model === "" ? "אין הגבלה" : state.model,
        category: state.category === "" ? "שונות" : state.category,
        requastDate: formatDate(date),
        madeDate: state.madeDate === "" ? "אין הגבלה" : state.madeDate,
        companyName: state.companyName === "" ? "אין הגבלה" : state.companyName,
        color: colorChoose.length === 15 ? "אין הגבלה" : colorChoose,
        range:
          priceRange[0] === 0 && priceRange[1] === 0
            ? "אין הגבלה"
            : priceRange,
        otherThings: state.otherThings === "" ? "אין הגבלה" : state.otherThings,
        sellOffers: 0,
        endDay: formatDate(end),
        finish: false,
        close: formatDate(close),
        offers: [],
        emailType: "מקבל הזמנות"
      };
      temp.buyItems[temp.buyItems.length] = buyItem;
      let a;
      do {
        a = await add("request", requestItem);
      } while (a != "=))");
      a = "";
      do {
        a = await update("users/" + temp.id, temp);
      } while (a != "=))");
      setbuyItem(requestItem);
      localStorage.setItem("buyItem", JSON.stringify(requestItem));
      localStorage.setItem("user", JSON.stringify(temp));
      setDone(true)
      setState({
        name: "",
        model: "",
        category: "",
        requastDate: "",
        madeDate: "",
        companyName: "",
        color: [],
        otherThings: "",
        errors: {},
      }); 
      setPriceRange([0, 0]);
      setCheckbox(falseArray);
      window.scrollTo(0, 0);
      history.push("/item");
    }
  }
  const useStyles = makeStyles({
    root: {
      color: '#ff50a7'
    }
  });
  const classes = useStyles();

  return (
    <div className="formStyle"> <form>
        <div className="inRow">
          <InputComp
            data={{
              id: "name",
              label: ":שם הפריט",
              type: "text",
              placeholder: "משקפי שמש",
              className: "",
              value: state.name,
              onChange: handleChange,
              error: state.errors.name,
            }}
          />
          <br />
          <div className="inColumn">
            <label htmlFor="category">:קטגוריה</label>
            <br />
            <select
              onChange={handleChange}
              id="category"
              name="category"
              dir="rtl"
              value={state.category}
            >
              {categories.map((item, i) => {
                return (
                  <option key={i} value={item[1]}>
                    {item[1]}
                  </option>
                );
              })}
            </select>
            <br />
          </div>
        </div>
        <div className="inRow">
          <InputComp
            data={{
              id: "model",
              label: ":דגם",
              type: "text",
              placeholder: "  ",
              className: "",
              value: state.model,
              onChange: handleChange,
              error: state.errors.model,
            }}
          />
          <br />
          <InputComp
            data={{
              id: "companyName",
              label: ":שם חברת היצור",
              type: "text",
              placeholder: "Carolina Lemke",
              className: "",
              value: state.companyName,
              onChange: handleChange,
              error: state.errors.companyName,
            }}
          />
          <br />
        </div>
        <div className="inRow">
          <InputComp
            data={{
              id: "madeDate",
              label: ":שנת יצור",
              type: "date",
              placeholder: "",
              className: "",
              value: state.madeDate,
              onChange: handleChange,
              error: state.errors.madeDate,
            }}
          />
          <br />
          <div className="inColumn">
            <label htmlFor="rangeOfPrice">:[אופציונלי]טווח מחירים רצוי</label>
            <br />
            <div
              dir="ltr"
              style={{ margin: "auto", display: "block", width: "fit-content" }}
            >
              <div className="sliderStyle">
                <Slider
                  classes={{
                    root: classes.root
                  }}
                  value={priceRange}
                  onChange={rangeSelector}
                  valueLabelDisplay="auto"
                  max={1000}
                />
                טווח המחיר שנבחר : {priceRange[1]} - {priceRange[0]}
              </div>
              <div id="error" style={{ color: "#3f4446" }}>
                {state.errors.madeDate}
              </div>
            </div>
          </div>
        </div>
        <div className="inColumn">
          <label style={{ marginTop: "15px" }}>:צבע</label>
          <Checkbox colors={colors} checkbox={checkbox} setCheckb={setCheckb} />
          <div id="error">{state.errors.color}</div>
        </div>
        <br />
        <InputComp
          data={{
            id: "otherThings",
            label: ":פרטים נוספים",
            type: "text",
            placeholder: "יד ראשונה,לנשים",
            className: "bigInput",
            value: state.otherThings,
            onChange: handleChange,
            error: state.errors.otherThings,
          }}
        />
        <br />
        <br />
        <input
          className="submitButten"
          type="submit"
          value="לבקשת הפריט"
          onClick={handleSubmitClick}
        />
      </form> 
    </div> 
  );
}
