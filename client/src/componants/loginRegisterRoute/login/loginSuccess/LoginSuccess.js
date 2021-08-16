import './LoginSuccess'

import React from "react";

export default function LoginSuccess() {
  return (
    <div className='success'  > 
    <div style={ {width: '100%'}}> 
        <p>
          <h2>
            הכניסה בוצעה בהצלחה <hr />
          </h2>
        </p > 
        <p id='textStyle'  >
          <br /><div id='diffColor'>את/ה מחובר/ת</div>  
          </p>
        <div className="continerBattens">
          <a href="/buy" id='decoration'  ><div id='a'>לקניית פריט</div></a>
          <a href="/sell" id='decoration' ><div id='a'>למכירת פריט</div></a>
        </div><br /><br /> 
        </div>
    </div>
  );
}