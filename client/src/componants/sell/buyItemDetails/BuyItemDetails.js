import "./BuyItemDetails.css";
import React, { useState, useEffect } from "react";
import { getAll } from "../../../service/users";
import Product from '../../products/product/Product'
import { useLocation } from "react-router";

export default function BuyItemDetails(props) {
   
  let buyItem;
  if (localStorage.buyItem != null) {
    buyItem = JSON.parse(localStorage.buyItem);
  }
  let user;
  if (localStorage.user != null && localStorage.user !== "") {
    user = JSON.parse(localStorage.user);
  }
  const [theUser, setTheUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    onloud(users);
  }, []);

  const onloud = async (a) => {
    let userss = await getAll("users");
    setUsers(userss);
    let index;
    for (let i = 0; i < userss.length; i++) {
      if (userss[i].id === buyItem.userId) {
        index = i;
        break;
      }
    }
    show(userss[index]);
  };
  function show(buyer) {
    let user = localStorage.user == undefined || localStorage.users === "" ? null : JSON.parse(localStorage.user);
    if (user !== null && buyer!=null) {
      if (buyer.id === user.id) {
        setTheUser(true);
      }
    }
  }

  console.log(buyItem);
  let colorString = "";
  let rangeString = "";
  if (buyItem.range !== "אין הגבלה") {
    rangeString = buyItem.range[0] + " - " + buyItem.range[1];
  } else {
    rangeString = buyItem.range;
  }
  if (buyItem.color !== "אין הגבלה" && buyItem.color.length !== 1) {
    for (let i = 0; i < buyItem.color.length - 1; i++) {
      colorString = colorString + buyItem.color[i] + " , ";
    }
    colorString = colorString + buyItem.color[buyItem.color.length - 1];
  } else {
    colorString = buyItem.color;
  }
  let color = "#ff50a7";

  return (
    <div className="continerFlex">
      <a href="/addSellItem" id="decoration">
        <div id="addSell">לחץ להוספת הצעת מכירה</div>
      </a>
      <div className="continerS ">
        <br />
        <u style={{ color: " #d9f3ff" }}>
          <h2 style={{ color: "#f5f56e" }}>{buyItem.name}</h2>
        </u>
        <div >
          <div id="divStyle" className="colmunDiff">
          <span className="margin">
            <span className="titelsDiff">: קטגוריה</span>
            <span id="style-pester">,</span>
            <span className="borderC"> {buyItem.category}</span> 
          </span>
          <span className="margin">
            <span className="titelsDiff">: דגם</span>
            <span id="style-pester">,</span>
            <span className="borderC"> {buyItem.model}</span> 
          </span>
          <span className="margin">
            <span className="titelsDiff">: תאריך הפרסום</span>
            <span id="style-pester">,</span>
            <span className="borderC"> {buyItem.requastDate}</span> 
          </span>
          <span className="margin">
            <span className="titelsDiff">: תאריך יצור</span>{" "}
            <span id="style-pester">,</span>
            <span className="borderC"> {buyItem.madeDate}</span> 
          </span>
          <span className="margin">
            <span className="titelsDiff">: שם החברה של המוצר</span>
            <span className="borderC"> {buyItem.companyName} </span>
            <span id="style-pester">,</span>
          </span> 
          <span className="margin">
            <span className="titelsDiff">: טווח מחירים רצוי</span>
            <span id="style-pester">,</span>
            <span className="borderC"> {rangeString}  </span> 
          </span>
          </div>
          <div id="divStyle" className="colmunDiff">
          <span className="margin">
            <span className="titelsDiff">: צבע הפריט</span>
            <span id="style-pester">,</span>
            <span className="borderC"> {colorString}</span>
          </span>
          <span className="margin">
            <span className="titelsDiff">: דברים נוספים</span>
            <span id="style-pester">,</span>
            <span className="borderC"> {buyItem.otherThings} </span> 
          </span> 
          <span className="margin">
            <span className="titelsDiff">: מספר הצעות מכירה למוצר</span> 
            <span className="borderC"> {buyItem.sellOffers} </span> 
          </span>
          </div>
        </div>
        <u style={{ color: " #d9f3ff" }}>
          <h2 style={{ color: "#f5f56e"}}> :הצעות מכירה</h2>
        </u>
        <br />
        <div className="rowSS">
          {buyItem.offers.map((element, i) => {
            return (
              <Product
                key={i}
                num={i + 1}
                item={element}
                theUser={theUser}
                forAll={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
