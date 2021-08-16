import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { add, deleteItem, getAll, update, get,deleteItemData } from "../../../service/users";
import "./Product.css";
import { useHistory, useLocation } from 'react-router-dom';
import { BlockLoading } from 'react-loadingg';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function Product(props) {
  const location = useLocation();
  let history = useHistory();
  let forAll;
  let item;
  let theUser;
  let numOfferBuyer;
  if (location.state != undefined) {
    forAll = location.state.forAll;
    item = location.state.item;
    theUser = location.state.theUser;
    numOfferBuyer = location.state.num;
  } else {
    forAll = props.forAll;
    item = props.item;
    theUser = props.theUser;
    numOfferBuyer = props.num;
  }
  let buy = (localStorage.buyItem === undefined || localStorage.buyItem === "") ? { id: null } : JSON.parse(localStorage.buyItem);
  let user = (localStorage.user === undefined || localStorage.user === "") ? { id: null } : JSON.parse(localStorage.user);
  let color = (buy.color === "אין הגבלה" && item.color.length ==15) ? "אין הגבלה" : item.color.join(" ,");
  const [done, setDone] = useState(false);
  const [notForSale, setNotForSale] = useState(null);
  const [seller, setSeller] = useState(null);
  const [users, setUsers] = useState([]);
  const [sellerflag, setSellerflag] = useState(false);
  const [forSell, setForSell] = useState([]);
  const [request, setRequest] = useState([]);
  useEffect(() => {
    onloud(users);
  }, [ ]);


  const onloud = async (a) => {
    let userss = await getAll("users");
    let requestt = await getAll("request");
    let forselll = await getAll("forsell");
    setDone(true)
    let idSeller = item.sellerId;
    setSeller(userss[idSeller - 1]);
    setNotForSale(item.sellerId == user.id  ? true : false);  
    setRequest(requestt);
    setForSell(forselll);
    setUsers(userss);
    let sellerr;
    for (let i = 0; i < userss.length; i++) {
      if (userss[i].id === item.sellerId) {
        sellerr = userss[i];
        break;
      }
    }
    setSeller(sellerr);
    show(sellerr);
  };

  function show(seller) {
    if (seller != null && seller != undefined) {
      setSellerflag(true);
    } else {
      setSellerflag(false);
    }
  }

  async function closeForSale(e) {
    window.scrollTo(0, 0);
    setDone(false)
    localStorage.setItem('buyItem', "");
    for (var i = 0; i < seller.sellItems.length; i++) {
      if (seller.sellItems[i].id === item.sellerItemId) {
        seller.sellItems.splice(i, 1);
      }
    }
    let a;
    let elem = item 
    elem.buy = true;
    elem.buyerEmail = user.email
    elem.buyerName = user.name
    elem.sellerEmail= seller.email
    elem.sellerName= seller.name
    do {
      a = await deleteItemData("forSell/" + item.id,elem);
    } while (a != "=))");
    a = "";
    do {
      a = await update("users/" + seller.id, seller);
    } while (a != "=))");
    localStorage.setItem("user", JSON.stringify(seller));
    setDone(true)
    history.push('/');
  }

  async function notForSalee(e) {
    window.scrollTo(0, 0);
    setDone(false)
    if (forAll) {
      let a;
      do {
        a = await deleteItemData("forSell/" + item.id, item);
      } while (a != "=))");
    } else {
      let buyer;
      for (let i = 0; i < users.length; i++) {
        if (users[i].id == buy.userId) {
          buyer = users[i]
          break;
        }
      }
      buy.offers.splice(numOfferBuyer - 1, 1);
      let idx;
      for (let i = 0; i < buyer.buyItems.length; i++) {
        if (buyer.buyItems[i].id === buy.userItemsId) {
          idx = i;
          break;
        }
      }
      buy.sellOffers = buy.sellOffers - 1;
      buy.emailType = "זמני";
      let a;
      do {
        a = await update("request/" + buy.id, buy);
      } while (a != "=))");
      a = "";
      buyer.buyItems[idx].offers = buy.offers;
      buyer.buyItems[idx].sellOffers = buy.sellOffers;
      do {
        a = await update("users/" + buyer.id, buyer);
      } while (a != "=))");
    }
    for (var i = 0; i < user.sellItems.length; i++) {
      if (user.sellItems[i].id === item.sellerItemId) {
        user.sellItems.splice(i, 1);
      }
    }
    let a;
    do {
      a = await update("users/" + user.id, user);
    } while (a != "=))");
    setDone(true)
    localStorage.setItem("buyItem", JSON.stringify(buy));
    localStorage.setItem("user", JSON.stringify(user));
    history.push('/');
  }

  async function closeBuy(e) {
    window.scrollTo(0, 0);
    setDone(false)
    localStorage.setItem("buyItem", "");
    let seller = await get("users/" + item.sellerId);
    for (var i = 0; i < user.buyItems.length; i++) {
      if (user.buyItems[i].id === buy.userItemsId) {
        user.buyItems.splice(i, 1);
      }
    }
    for (var i = 0; i < seller.sellItems.length; i++) {
      if (seller.sellItems[i].id === item.sellerItemId) {
        seller.sellItems.splice(i, 1);
      }
    } 
    let a;
    do {
      a = await update("users/" + seller.id, seller);
    } while (a != "=))");
    a = "";
    do {
      a = await update("users/" + user.id, user);
    } while (a != "=))");
    a = "";
    let elem =  buy ; 
    elem.buyerEmail = user.email
    elem.buyerName = user.name
    elem.sellerEmail= seller.email
    elem.sellerName= seller.name
    do {
      a = await deleteItemData("request/" + buy.id,elem);
    } while (a != "=))");
    localStorage.setItem("user", JSON.stringify(user));
    for (var i = 0; i < buy.offers.length; i++) {
      if (buy.offers[i].id === item.id) {
        buy.offers.splice(i, 1);
      }
    }
    let element;
    let id = forSell.length === 0 ? 1 : (Number(forSell[forSell.length - 1].id) + 1)
    for (i = 0; i < buy.offers.length; i++) {
      element = buy.offers[i];
      let sellItem = {
        id: id,
        name: buy.name,
        sellerId: element.sellerId,
        category: element.category,
        color: element.color,
        sellerItemId: element.id,
        companyName: element.companyName,
        madeDate: element.madeDate,
        model: element.model,
        otherThings: element.otherThings,
        price: element.price,
        src: element.src,
        buy: false
      };
      a = "";
      do {
        a = await add("forSell", sellItem);
      } while (a != "=))");
      id = id + 1;
    }
    setDone(true)
    history.push('/');
  }
  const submitNot = async (e) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1 style={{ color: "#f5f56e" }}>?האם אתה בטוח</h1>
            <p style={{ color: "#ff50a7" }}>?אתה רוצה למחוק את הפריט </p>
            <div className='buttons'>
              <button
                style={{ backgroundColor:"#27eb68"}}
                className='model-button'
                onClick={() => {
                  notForSalee(e)
                  onClose();
                }}
              >
                !כן,תמחק את זה
              </button>
              <button className='model-button' style={{ backgroundColor:"#f34e4e" }} onClick={onClose}>לא</button>
            </div>
          </div>
        );
      }
    });
  }
  const submitClose = async (e) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1 style={{ color: "#f5f56e" }}>?האם אתה בטוח</h1>
            <div style={{ color: "#ff50a7" }}>?אתה רוצה לקנות את הפריט הזה</div>
            <p style={{ color: "#ff50a7" }}>הבקשה תמחק מהאתר ואימייל ישלח למוכר על מנת שיצור עמך קשר - שמור את פרטי המוכר על מנת ליצור עימו קשר במקרה שלא תענה במהרה</p>
            <div className='buttons'>
              <button
                style={{ backgroundColor:"#27eb68"}}
                className='model-button'
                onClick={() => {
                  closeBuy(e)
                  onClose();
                }}
              >
                !כן,אני קונה את זה
              </button>
              <button className='model-button' style={{ backgroundColor:"#f34e4e" }} onClick={onClose}>לא</button>
            </div>
          </div>
        );
      }
    });
  }
  const submitCloseForSale = async (e) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1 style={{ color: "#f5f56e" }}>?האם אתה בטוח</h1>
            <div style={{ color: "#ff50a7" }}>?אתה רוצה לקנות את הפריט הזה</div>
            <p style={{ color: "#ff50a7" }}>הפריט יוסר מהאתר ואימייל ישלח למוכר על מנת שיצור עימך קשר - שמור את פרטי המוכר על מנת ליצור עימו קשר במקרה שלא תענה במהרה</p>
            <div className='buttons'>
              <button
                style={{ backgroundColor:"#27eb68"}}
                className='model-button'
                onClick={() => {
                  closeForSale(e)
                  onClose();
                }}
              >
                 !כן,אני קונה את זה
              </button>
              <button className='model-button' style={{ backgroundColor:"#f34e4e" }} onClick={onClose}>לא</button>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <>
      {!done ? (< div className="laod">
        <BlockLoading color={"#ff50a7"} speed={"3"} />
      </div>
      ) :
        <div className="responsive" >
          <Card style={{ width: '18rem' }} dir="rtl" className="titelss">
            <Card.Img variant="top" src={item.src} style={{ height: "180px" }} />
            <ListGroup className="list-group-flush">
              {forAll && <ListGroup.Item> שם המוצר  :    <span className="data">{item.name}</span></ListGroup.Item>}
              <ListGroup.Item> קטגוריה  :    <span className="data">{item.category}</span></ListGroup.Item>
              <ListGroup.Item>  דגם   :  <span className="data">{item.model}</span></ListGroup.Item>
              <ListGroup.Item>  תאריך יצור  :  <span className="data"> {item.madeDate}</span></ListGroup.Item>
              <ListGroup.Item>  שם החברה של המוצר  :  <span className="data"> {item.companyName} </span></ListGroup.Item>
              <ListGroup.Item> מחיר  :  <span className="data"> {item.price}</span></ListGroup.Item>
              <ListGroup.Item> צבע הפריט  :  <span className="data"> { color}</span></ListGroup.Item>
              <ListGroup.Item>דברים נוספים  :  <span className="data"> {item.otherThings}</span> </ListGroup.Item>
              <div className="seller-deatails">
                {!forAll && theUser && sellerflag && (
                  <ListGroup>
                    <ListGroup.Item className="seller">פרטי המוכר: </ListGroup.Item>
                    <ListGroup.Item>שם : {seller.name}</ListGroup.Item>
                    <ListGroup.Item>אימייל : {seller.email} </ListGroup.Item>
                    <ListGroup.Item className="margin-center"> <button className="buttons-product" onClick={submitClose}>
                      בחר מוצר לקניה
                    </button>
                    </ListGroup.Item>
                  </ListGroup>
                )}
                {!notForSale && forAll && sellerflag && (localStorage.user != null && localStorage.user != "") && (
                  <ListGroup>
                    <ListGroup.Item className="seller">פרטי המוכר: </ListGroup.Item>
                    <ListGroup.Item>שם : {seller.name}</ListGroup.Item>
                    <ListGroup.Item>אימייל : {seller.email} </ListGroup.Item>
                    <ListGroup.Item className="margin-center"> <button className="buttons-product" onClick={submitCloseForSale}>
                      בחר מוצר לקניה
                    </button>
                    </ListGroup.Item>
                  </ListGroup>
                )}
                {notForSale && (
                  <ListGroup>
                    <ListGroup.Item className="seller">הצעת המכירה התקבלה על ידך</ListGroup.Item>
                    <ListGroup.Item className="margin-center"> <button  className="buttons-product" onClick={submitNot}>
                      בטל את הצעת המוצר למכירה
                    </button>
                    </ListGroup.Item>
                  </ListGroup>
                )}</div>
            </ListGroup>
          </Card>
        </div >
      }
    </>);
}
 