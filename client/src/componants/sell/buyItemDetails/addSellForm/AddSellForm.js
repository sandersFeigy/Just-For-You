import "./AddSellForm.css";
import InputComp from "../../../inputComp/InputComp";
import React, { useState, useEffect } from "react";
import Upload from "./upload/Upload";
import { update, getAll, add, get } from "../../../../service/users";
import { valuesErrors } from "../../../../validation/sellItemValidation";
import Checkbox from "../../../checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import ErrorsAlert from "../../../errorsAlert/ErrorsAlert";
import { BlockLoading } from 'react-loadingg';


let colorChoose = [];
let newArr = [];

export default function PurchaseRequestForm(props) {
  let history = useHistory();
  let buyItem = JSON.parse(localStorage.buyItem);
  let seller = (localStorage.user === undefined || localStorage.user === "") ? { id: null } : JSON.parse(localStorage.user);
  const [errorMessage, updateErrorMessage] = useState(null);
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
  const [done, setDone] = useState(true);
  const [trueArray, setTrueArray] = useState(TrueArray);
  const [falseArray, setFalseArray] = useState(FalseArray);
  const [checkbox, setCheckbox] = useState(FalseArray);
  useEffect(() => {
    onloud(categories);
  }, []);

  const onloud = async (a) => {
    let Categories = await getAll("Categories");
    let colors = await getAll("colors");
    setCategories(Categories);
    setColors(colors);
  };
  const [state, setState] = useState({
    model: "",
    category: "שונות",
    madeDate: "",
    companyName: "",
    price: "₪0",
    color: [],
    otherThings: "",
    imgSrc: "",
    errors: {},
  });

  function imgState(src) {
    setState({
      ...state,
      imgSrc: src,
    });
    let temp = state;
    temp.imgSrc = src;
    let newErrors = valuesErrors(temp, buyItem);
    setState((stateValues) => ({
      ...stateValues,
      errors: newErrors,
    }));
  }

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
    let newErrors = valuesErrors(temp, buyItem);
    setState((stateValues) => ({
      ...stateValues,
      errors: newErrors,
    }));
  }

  function showError(massege) {
    updateErrorMessage(massege);
  }

  function formatCurrency(input) {
    let Input = String(input).slice(0, 1) == "₪" ? input : "₪" + input;
    return Input;
  }
  function handleChange(e) {
    if (e.target.name === "price") {
      let p = formatCurrency(e.target.value);
      setState({
        ...state,
        [e.target.name]: p,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
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
      case "requastDate":
        temp.requastDate = e.target.value;
        break;
      case "madeDate":
        temp.madeDate = e.target.value;
        break;
      case "price":
        let p = formatCurrency(e.target.value);
        temp.price = p;
        break;
      case "companyName":
        temp.companyName = e.target.value;
        break;
      case "otherThings":
        temp.otherThings = e.target.value;
        break;
      case "imgSrc":
        temp.imgSrc = e.target.value;
        break;
    }
    let newErrors = valuesErrors(temp, buyItem);
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
    let newErrors = valuesErrors(state, buyItem);
    setState((stateValues) => ({
      ...stateValues,
      errors: newErrors,
    }));
    const valid = Object.keys(newErrors).length === 0;
    if (!valid) {
      return
    }
    window.scrollTo(0, 0);
    setDone(false)
    if (valid && localStorage.user === undefined && localStorage.user === "") { 
      showError("! רק משתמשים מחוברים יכולים להציע פריטים למכירה באתר");
      setDone(true)
    } else if (buyItem.userId === seller.id) { 
      showError("! מבקש הפריט אינו יכול להציע הצעת מכירה עבורה");
      setDone(true)
    } else if (
      valid &&
      localStorage.user !== undefined &&
      localStorage.user !== ""
    ) {
      let id = seller.sellItems.length === 0 ? 1 : Number(seller.sellItems[seller.sellItems.length - 1].id) + 1;
      let Id = buyItem.offers.length === 0 ? 1 : Number(buyItem.offers[buyItem.offers.length - 1].id) + 1;
      const sellOffer = {
        id: Id,
        sellerId: seller.id,
        sellerItemId: id,
        model: state.model,
        category: state.category,
        madeDate: state.madeDate,
        companyName: state.companyName,
        price: state.price,
        color: colorChoose,
        otherThings: state.otherThings,
        src: state.imgSrc,
      };
      const sellOfferForSeller = {
        id: id,
        name: buyItem.name,
        buyerId: buyItem.userId,
        buyerItemId: Id,
        requestId: buyItem.id,
        model: state.model,
        category: state.category,
        madeDate: state.madeDate,
        companyName: state.companyName,
        price: state.price,
        color: colorChoose,
        otherThings: state.otherThings,
        src: state.imgSrc,
      };
      let user = await get("users/" + buyItem.userId);
      buyItem.sellOffers += 1;
      let index;
      for (var i = 0; i < user.buyItems.length; i++) {
        if (user.buyItems[i].id === buyItem.userItemsId) {
          index = i;
          break;
        }
      }
      buyItem.offers[buyItem.offers.length] = sellOffer;
      user.buyItems[index].offers = buyItem.offers;
      seller.sellItems[seller.sellItems.length] = sellOfferForSeller; 
      let a;
      do {
        a = await update("users/" + user.id, user);
      } while (a != "=))");
      a = "";
      do {
        a = await update("users/" + seller.id, seller);
      } while (a != "=))");
      a = "";
      do {
        a = await update("request/" + buyItem.id, buyItem);
      } while (a != "=))");
      localStorage.setItem("buyItem", JSON.stringify(buyItem));
      localStorage.setItem("user", JSON.stringify(seller));
      setState({
        name: "",
        model: "",
        category: "",
        requastDate: "",
        madeDate: "",
        companyName: "",
        color: [],
        otherThings: "",
        price: "₪0",
        imgSrc: "",
        errors: {},
      });
      window.scrollTo(0, 0);
      setDone(true)
      setCheckbox(falseArray); 
      history.push("/item");
    }
  }
  return (
    <>
      {!done ? (< div className="laod">
        <BlockLoading color={"#ff50a7"} speed={"3"} />
      </div>
      ) : <div className="continer">
        <h2 style={{ color: "#f5f56e", fontSize: "5vh" }}>טופס למכירת מוצר</h2>
        <hr className="hrS" />
        <br />
        <div className="formStyle">
          <form>
            <ErrorsAlert
              errorMessage={errorMessage}
              hideError={updateErrorMessage}
            />
            <div className="inRow">
              <InputComp
                data={{
                  id: "model",
                  label: ":דגם",
                  type: "text",
                  placeholder: "",
                  className: "",
                  value: state.model,
                  onChange: handleChange,
                  error: state.errors.model,
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
                  value={state.category}
                  dir="rtl"
                >
                  {categories.map((item, i) => {
                    return (
                      <option key={i} value={item[1]}>
                        {item[1]}
                      </option>
                    );
                  })}
                </select>
                <div id="error">{state.errors.category}</div>
                <br />
              </div>
            </div>
            <div className="inRow">
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
            </div>
            <InputComp
              data={{
                id: "price",
                label: ":מחיר הפריט",
                type: "text",
                placeholder: " ",
                className: "bigInputhalf",
                value: state.price,
                onChange: handleChange,
                error: state.errors.price,
              }}
            />
            <br />
            <InputComp
              data={{
                id: "otherThings",
                label: ":פרטים נוספים",
                type: "text",
                placeholder: "משומש ,לנשים",
                className: "bigInput",
                value: state.otherThings,
                onChange: handleChange,
                error: state.errors.otherThings,
              }}
            />
            <div className="inColumn">
              <label style={{ marginTop: "15px" }}>:צבע</label>
              <Checkbox
                colors={colors}
                checkbox={checkbox}
                setCheckb={setCheckb}
              />
              <div id="error">{state.errors.color}</div>
            </div>
            <div className="inColumn">
              <label htmlFor="img">:תמונה של הפריט</label>
              <br />
              <Upload src={state.imgSrc} setSrc={imgState} />
              <div id="error">{state.errors.src}</div>
            </div>
            <input
              className="submitButten"
              type="submit"
              onClick={handleSubmitClick}
              value="הצעת הפריט למכירה"
            />
          </form>
        </div>
      </div>
      }
    </>);
}
