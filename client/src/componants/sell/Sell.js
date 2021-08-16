import "./Sell.css";
import { getAll } from "../../service/users";
import BuyItem from "./buyItem/BuyItem";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BlockLoading } from 'react-loadingg';

export default function Sell(props) {
  let buyItem = props.buyItem;
  let setbuyItem = props.setbuyItem;
  const location = useLocation();
  const catagHistory = location.state === undefined ? "" : location.state.params;
  const [done, setDone] = useState(false);
  const [request, setRequest] = useState([]); 
  const [forSell, setForSell] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catgory, setCatgory] = useState(props.catg);
  const classes = ["buyItemBright", "buyItemDark"];
  let user = (localStorage.user === undefined || localStorage.user === "") ? { id: null } : JSON.parse(localStorage.user);
  useEffect(() => {
    onloud(request);
    user = (localStorage.user === undefined || localStorage.user === "") ? { id: null } : JSON.parse(localStorage.user);
  }, [catagHistory, localStorage.user]);

  const onloud = async (a) => {
    if (catagHistory == "") {
      setCatgory("שונות");
    }
    else {
      setCatgory(catagHistory);
    }
    if (a.length === 0) {
      let requestt = await getAll("request"); 
      let forselll = await getAll("forsell");
      let Categories = await getAll("Categories");
      setCategories(Categories);
      setForSell(forselll); 
      setRequest(requestt);
    }
    setDone(true);
  };

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  function updateDone(bool) {
    setDone(bool);
  }

  let date = new Date();
  let thisDate = formatDate(date);
  let j = 0;
  return (
    <div>
      {!done && < div className="laod">
        <BlockLoading color={"#ff50a7"} speed={"3"} />
      </div>}
      {done && <div className="sell">
        <select onChange={(e) => setCatgory(e.target.value)} id="categoryy" name="category" dir="rtl" value={catgory} >
          {categories.map((item, i) => {
            return <option key={i} value={item[1]}>{item[1]}</option>
          })}
        </select>
        {request.map((element, i) => {
          if (catgory === "שונות") {
            if ((element.finish && user.id === element.userId && element.close > thisDate) || !element.finish) {
              j++;
              let userSeller = (user.id === element.userId);
              return <BuyItem key={i} buyItemDetaels={element} buyItem={buyItem} setbuyItem={setbuyItem} data={classes[j % 2]} buyer={userSeller} updateDone={updateDone} />;
            }
          } else if (catgory === element.category) {
            if ((element.finish && user.id === element.userId && element.close > thisDate) || !element.finish) {
              j++;
              let userSeller = (user.id === element.userId);
              return <BuyItem key={i} buyItemDetaels={element} buyItem={buyItem} setbuyItem={setbuyItem} data={classes[j % 2]} buyer={userSeller} updateDone={updateDone} />;
            }
          }
        })}
      </div>  
      }
    </div>
  );
}
