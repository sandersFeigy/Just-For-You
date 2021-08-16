import "./BuyItem.css";
import React, { useState, useEffect } from "react";
import { update, deleteItem, getAll, add } from "../../../service/users";
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function BuyItem(props) {
  let buyItemDetaels = props.buyItemDetaels;
  let theClass = props.data;
  let buyer = props.buyer;
  let setbuyItem = props.setbuyItem;
  let colorString = '';
  let rangeString = "";
  const setDone = props.updateDone;
  let color = String(theClass).slice(-1) == "k" ? "#ff50a7" : "#3f4446";
  if (buyItemDetaels.range !== "אין הגבלה") {
    rangeString = buyItemDetaels.range[0] + " - " + buyItemDetaels.range[1];
  } else {
    rangeString = buyItemDetaels.range;
  }
  if (buyItemDetaels.color !== "אין הגבלה" && buyItemDetaels.color.length !== 1) {
    for (let i = 0; i < (buyItemDetaels.color.length - 1); i++) {
      colorString = colorString + buyItemDetaels.color[i] + " , "
    }
    colorString = colorString + buyItemDetaels.color[buyItemDetaels.color.length - 1];
  }
  else {
    colorString = buyItemDetaels.color;
  }
  const [forSell, setForSell] = useState([]);

  useEffect(() => {
    onloud(forSell);
  }, []);

  const onloud = async (a) => {
    let forselll = await getAll("forsell");
    setForSell(forselll);
  }


  const history = useHistory();


  async function itemChange(e) {
    localStorage.setItem('buyItem', JSON.stringify(buyItemDetaels));
    setbuyItem(buyItemDetaels);
  }

  const submit = async (e) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1 style={{ color: "#f5f56e" }}>?האם אתה בטוח</h1>
            <p style={{ color: "#ff50a7" }}>?אתה רוצה למחוק את הבקשה</p>
            <div className='buttons'>
              <button
                style={{ backgroundColor: "#27eb68" }}
                className='model-button'
                onClick={() => {
                  deleteRequest(e)
                  onClose();
                }}
              >
                !כן,תמחק את זה
              </button>
              <button className='model-button' style={{ backgroundColor: "#f34e4e" }} onClick={onClose}>לא</button>
            </div>
          </div>
        );
      }
    });
  }
  async function deleteRequest(e) {
    setDone(false)
    let a;
    let user = JSON.parse(localStorage.user);
    if (props.user !== true) {
      for (var i = 0; i < user.buyItems.length; i++) {
        if (user.buyItems[i].id === buyItemDetaels.userItemsId) {
          user.buyItems.splice(i, 1);
        }
      }
    } else {
      for (var i = 0; i < user.buyItems.length; i++) {
        if (user.buyItems[i].id === buyItemDetaels.id) {
          user.buyItems.splice(i, 1);
        }
      }
    }
    a = ""
    let id = forSell.length === 0 ? 1 : (Number(forSell[forSell.length - 1].id) + 1);

    for (let i = 0; i < buyItemDetaels.offers.length; i++) {
      let element = buyItemDetaels.offers[i];
      let sellItem = {
        id: id,
        name: buyItemDetaels.name,
        sellerId: element.sellerId,
        category: element.category,
        color: element.color,
        sellerItemId: element.sellerItemId,
        companyName: element.companyName,
        madeDate: element.madeDate,
        model: element.model,
        otherThings: element.otherThings,
        price: element.price,
        src: element.src,
        buy: false
      };
      id = id + 1
      do {
        a = await add("forSell", sellItem);
      } while (a != "=))");
    }
    localStorage.setItem("user", JSON.stringify(user));
    a = ""; 
    if (props.user !== true) {
      do {
        a = await deleteItem("request/" + buyItemDetaels.id);
      } while (a != "=))");
    } else {
      do {
        a = await deleteItem("request/" + buyItemDetaels.requestId);
      } while (a != "=))");
    }
    a = "";
    do {
      a = await update("users/" + user.id, user);
    } while (a != "=))");
    setDone(true);
    history.push('/');
  }
  return (
    <div className={theClass}>{buyer && <div className='remove-button' onClick={submit}> לחץ לביטול בקשת המוצר</div>}
      <a href="/item" id="aStyle" onClick={itemChange}>
        <div id="all" className={theClass + "diff"}>
          <div className="colmun">
            <u style={{ color: " #d9f3ff" }}>
              <h2 style={{ color: color }} id="label">
                {buyItemDetaels.name}
              </h2>
            </u>
            <span >
              <span className="titels">: קטגוריה</span>
              {buyItemDetaels.category}
            </span>
            <span >
              <span className="titels">: דגם</span>
              {buyItemDetaels.model}
            </span>
            <span >
              <span className="titels">: תאריך הפרסום</span>
              {buyItemDetaels.requastDate}
            </span>
          </div>
          <div id="marginTop" className="colmun">
            <span  >
              <span className="titels">: תאריך יצור</span>
              {buyItemDetaels.madeDate}
            </span>
            <span  >
              <span className="titels">: שם החברה של המוצר</span>
              {buyItemDetaels.companyName}
            </span>
            <span  >
              <span className="titels">: טווח מחירים רצוי</span>
              {rangeString}
            </span>
          </div>
          <div id="marginTop" className="colmun">
            <span  >
              <span className="titels">: צבע הפריט</span>
              <span  >{colorString}</span>
            </span>
            <span>
              <span className="titels">: דברים נוספים</span> {buyItemDetaels.otherThings}
            </span>
            <span  >
              <span className="titels">: מספר הצעות מכירה למוצר</span>
              {buyItemDetaels.sellOffers}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}


