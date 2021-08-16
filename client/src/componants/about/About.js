import './About.css'
import React from 'react'

export default function About() {
    let pink = "#ff50a7";
    let yellow = " #f5f56e";
    return (
        <div id='center'>
            <div className='aboutStyle'  >
                <h2 style={{ color: pink, fontSize: "5vh" }}> ברוכים הבאים לאתר   just for you,</h2 >
     מאחורי האתר just for you    עומד קהל משתמשים גדול ומגוון שמתגייס להציג למכירה לרשות הלקוחות מוצרים  על פי בקשתם ודואג לכך שהמוצרים המוצעים למכירה יהיו הטובים ביותר ביחס למחירם
    ,האתר מנוהל ומתוחזק ללא מטרות רווח אלא לרווחת הלקוחות בלבד
                  <br />
                <br />
                 just for you מציע לחברי מועדון הלקוחות הרשומים באתר חווית קנייה אינטראקטיבית , מגוון מוצרים אשר נבנה בשיתוף עם קהל הלקוחות
                 , תוצאות מסחר מהירות ומיידיות ואפשרות קניה של פריטים נדירים בצורה נוחה ומשתלמת בקשר ישיר בין המוכר ללקוח ללא תשלום עמלה על השרות
                <br />
                <br />
    מוקד שירות הלקוחות שלנו ישמח לעמוד לרשותכם בטלפון: <span style={{ color: yellow }} >09-9999999</span>  <br />
                <span style={{ color: yellow }} >א'-ה' בין השעות 8:30 - 16:30 </span> <br />
                <br />
                <br />
                <br />
                <span style={{ color: yellow, fontSize: "2.8vh" }} > כתובת החברה: </span> <br />
                <br />
    ח.פ.: 519999999 <br />
   הזית 5 אשדוד<br />
                <br />
                <br />
    ניתן לפנות במייל לתיבה: justForYouIsreal@gmail.com   ;
        </div>
        </div>
    )
}
