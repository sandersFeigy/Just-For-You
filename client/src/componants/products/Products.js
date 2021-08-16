import "./Products.css";
import React, { useState, useEffect } from "react";
import Product from "./product/Product";
import { useLocation } from "react-router-dom";
import { getAll } from "../../service/users";
import { BlockLoading } from 'react-loadingg';


export default function Products(props) {
  const location = useLocation();
  const catagHistory = location.state === undefined ? "" : location.state.params;
  const [done, setDone] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catgory, setCatgory] = useState("שונות");
  const [items, setItems] = useState([]);

  useEffect(() => {
    onloud(categories);
  }, [catagHistory]);

  async function onloud(a) {
    if (catagHistory === "") {
      setCatgory("שונות");
    }
    else {
      setCatgory(catagHistory);
    }
    if (a.length !== 0) {
      return;
    }
    else {
      let sellItems = await getAll("forSell");
      let Categories = await getAll("Categories");
      setDone(true);
      setCategories(Categories);
      setItems(sellItems);
    }
  };

  return (
    <>
      {!done ? (< div className="laod">
        <BlockLoading color={"#ff50a7"} speed={"3"} />
      </div>) :
        <div id="highet">
          <div className="Gallery">
            <select onChange={(e) => setCatgory(e.target.value)} id="categoryy" name="category" dir="rtl" value={catgory} >
              {categories.map((item, i) => {
                return <option key={i} value={item[1]}> {item[1]} </option>;
              })}
            </select>
            {items.map((element, i) => {
              if (catgory === "שונות") {
                return <Product key={i} num={i + 1} item={element} forAll={true} />;
              } else if (catgory === element.category) {
                return <Product key={i} num={i + 1} item={element} forAll={true} />;
              }
            })}
          </div>
        </div>
      }</>
  );
}
