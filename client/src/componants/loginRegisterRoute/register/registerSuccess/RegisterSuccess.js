import './RegisterSuccess.css'

import React from "react";

export default function RegisterSuccess() {
  return (
    <div className='success'  >
      <div>
        <p>
          <h2>
            ההרשמה בוצעה בהצלחה <hr />
          </h2>
        </p >
        <p id='textStyle'  >
          <br /><div id='diffColor'>את/ה מחובר/ת</div> <br /> כעת באפשרותך לבקש מוצרים אותם את/ה מעונין/ת לקנות באתר, למכור מוצרים
          לבקשת משתמשים אחרים
          .וכן לקנות פריטים המוצגים באתר לאחר שהוצעו על ידי משתמשים אחרים
        </p>
        <br />
        <div className="continerBattens">
          <a href="/buy" id='decoration'  ><div id='a'>לקניית פריט</div></a>
          <a href="/sell" id='decoration' ><div id='a'>למכירת פריט</div></a>
        </div><br /><br />
        <div id='color'>
          ! just for you - תודה שנרשמת ל
        </div>
      </div>
    </div>
  );
}