import "./Buy.css";
import PurchaseRequestForm from "./purchaseRequestForm/PurchaseRequestForm";
import React, { useState } from "react";
import Text from "./text/Text";
import ErrorsAlert from "../errorsAlert/ErrorsAlert";
import { BlockLoading } from 'react-loadingg';

export default function Buy(props) {
  let buyItem = props.buyItem;
  let setbuyItem = props.setbuyItem;
  const [done, setDone] = useState(true)
  const [errorMessage, updateErrorMessage] = useState(null);
  function showError(massege) {
    updateErrorMessage(massege);
  }

  function updateDone(bool) {
    setDone(bool)
  }
  let text =
    " הדרך היעילה והזולה \
  ביותר להשיג את מה שאת/ה מחפש/ת   ,לאחר מילוי הטופס ושליחתו בקשתך תוצג באתר למוכרים\
  פוטנציאלים כך שתוכל/י להשיג את מבוקשך במחיר הזול והמשתלם ביותר =)) ,הצעות למכירה יתקבלו עד חודש \
   מפרסום הבקשה ומה שנשאר לך זה רק לבחור את המשתלם ביותר עבורך, בהצלחה !! "  ;
  return (
    <>
      {!done ? (< div className="laod">
        <BlockLoading color={"#ff50a7"} speed={"3"} />
      </div>
      ) : <div className="PurchaseRequestStyle">
        <div className="continer"  >
          <div>
            <h2>קניית מוצר</h2> <hr className="hrS" />
          </div>
          <Text data={text} />
          <br />
          <div>
            <h2>טופס בקשת מוצר</h2> <hr className="hrS" />
          </div>
        </div>
        <ErrorsAlert errorMessage={errorMessage} hideError={updateErrorMessage} />
        <PurchaseRequestForm showError={showError} buyItem={buyItem} setbuyItem={setbuyItem} updateDone={updateDone} />
      </div>
      } </>
  );
}
