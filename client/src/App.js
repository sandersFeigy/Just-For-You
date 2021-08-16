import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./componants/home/Home";
import Navbar from "./componants/navbar/Navbar";
import About from "./componants/about/About";
import Faq from "./componants/faq/Faq";
import LoginRegistrRoute from "./componants/loginRegisterRoute/LoginRegisterRoute";
import FooterComp from "./componants/footerComp/FooterComp";
import BuyItemDetails from "./componants/sell/buyItemDetails/BuyItemDetails";
import Buy from "./componants/buy/Buy";
import Sell from "./componants/sell/Sell";
import Products from "./componants/products/Products";
import Product from "./componants/products/product/Product";
import AddSellForm from "./componants/sell/buyItemDetails/addSellForm/AddSellForm";
import Error404 from "./componants/error404/Error404";
import SearchResults from "./componants/navbar/search/searchResults/SearchResults"
import PrivateArea from "./componants/privateArea/PrivatArea"
// Json-server --watch src\data\Data.json --port 5000

function App() {
  const [userClassName, setUserClassName] = useState(true);
  const [buyItem, setbuyItem] = useState(null); 
  const [catg, setCatg] = useState("");

  useEffect(() => {
    if (localStorage.user == "" || localStorage.user == undefined)
      setUserClassName(true);
    else setUserClassName(false);
    if (!localStorage.buyItem == "") setbuyItem(null);
    else setbuyItem(localStorage.buyItem);  
    if (catg !== "") setCatg(catg);
     
  }, []);

  function setItem(item) {
    setbuyItem(item);
  }
  
  const setClass = (booll) => {
    setUserClassName(booll);
  };
 
  return (
    <div className="center">
      <Router>
        <div className="App">
          <Navbar userClassName={userClassName} onChange={setClass} />
          <div className="switch">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/buy">
                <Buy buyItem={buyItem} setbuyItem={setItem} />
              </Route>
              <Route exact path="/sell">
                <Sell buyItem={buyItem} setbuyItem={setItem} catg={catg}  setCatg={setCatg} />
              </Route> 
              <Route path="/item">
                <BuyItemDetails
                  buyItem={buyItem}
                  setbuyItem={setItem} 
                />
              </Route>
              <Route path="/addSellItem" component={AddSellForm} />
              <Route path="/private-area" component={PrivateArea} />
              <Route exact path="/products">
                <Products buyItem={buyItem} catg={catg}  setCatg={setCatg} />
              </Route>
               <Route path="/faq" component={Faq} />
              <Route path="/register">
                <LoginRegistrRoute
                  userClassName={userClassName}
                  onChange={(booll) => {
                    setClass(booll);
                  }}
                />
              </Route>
              <Route path="/login">
                <LoginRegistrRoute
                  userClassName={userClassName}
                  onChange={(booll) => {
                    setClass(booll);
                  }}
                />
              </Route>
              <Route path="/search-result" component={SearchResults} />
              <Route component={Error404} />
            </Switch>
          </div>
          <FooterComp catg={catg}  setCatg={setCatg} />
        </div>
      </Router>
    </div>
  );
}

export default App;
