import "./Home.css";
import React from "react";
import Option from "./option/Option";
import buyIcon from "./../../assets/img/buyIcon.png";
import productIcon from "./../../assets/img/productsIcon.png";
import sellIcon from "./../../assets/img/sellIcon.png";
import backImg from "./../../assets/img/backgroundBuy.jpg";

export default function Home() {
  let headOptions = {
    compOne: {
      img: buyIcon,
      backImge: backImg,
      class: "optionStyle",
      title: " ? מחפש לקנות פריט מסוים ולא לשלם יותר משוויו",
      brief:
        "אם את/ה מחפש/ת פריט מסוים לקניה וחושב/ת שהמחיר שלו בשוק גבוה משויו האמיתי או סתם כך מעדיף/ה להוציא כמה שפחות ולקבל כמה שיותר? הגעת למקום הנכון!",
      end: "לחץ/י למעבר למילוי טופס בקשה לפריט אותו את/ה מחפש/ת",
      url: " buy ",
    },
    compTwo: {
      img: sellIcon,
      backImge: backImg,
      class: "optionStyleDiff",
      title: "?יש לך פריטים שונים שאין לך צורך בהם והיית מעדיף להפטר מהם ",
      brief: "הם נמצאים אצלך ואין לך מה לעשות איתם והיית מעדיף/ה למכור אותם ברווח? כאן תוכל/י למצוא אנשים שמתענינם בפריטים האלה ולמכור אותם ברווח בלי לשלם עמלה!",
      end: "לחץ/י למעבר לצפיה בבקשות לפריטים שהתפרסמו במהלך החודש האחרון",
      url: " sell ",
    },
    compThree: {
      img: productIcon,
      backImge: backImg,
      class: "optionStyle",
      title: "?מתחשק לך לצאת לקניות שבהם תוכל/י לקנות כל דבר ",
      brief: "חשבת פעם שתוכל/י לקנות יהלום ומכונית באותה החנות ובלי לקחת סיכון? התשלום מתבצע בינך לבין המוכר כך שהקניה בטוחה לחלוטין!",
      end: "לחץ/י למעבר לצפיה בפריטים המוצגים למכירה באתר בקטגוריות השונות",
      url: " products ",
    },
  };
  return (
    <div id="headerStyle">
      <Option data={headOptions.compOne} />
      <Option data={headOptions.compTwo} />
      <Option data={headOptions.compThree} />
    </div>
  );
};
