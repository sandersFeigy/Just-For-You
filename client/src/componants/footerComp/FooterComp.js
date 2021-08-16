import './FooterComp.css'
import { useHistory } from 'react-router-dom'
 

export default function FooterComp(props) { 
    let history = useHistory(); 

    function sell(e) {
        history.push("/sell", { params: e.currentTarget.childNodes[0].data });
    }
    
    function buy(e) {
        history.push("/products", { params: e.currentTarget.childNodes[0].data });
    }
    
    return (
        <footer className="footer">
            <div className="container bottom_border">
                <div className="row">
                    <div className=" col-sm-4 col-md  col-6 col">
                        <h5 className="headin5_amrc col_white_amrc pt2">מכירה</h5>
                        <ul className="footer_ul_amrc">
                            <li><a href="/sell" onClick={sell}>סיטונאות</a></li>
                            <li><a href="/sell" onClick={sell}>סרטים ודיסקים</a></li>
                            <li><a href="/sell" onClick={sell}>מכשירי חשמל</a></li>
                            <li><a href="/sell" onClick={sell}>כלים וחומרה</a></li>
                            <li><a href="/sell" onClick={sell}>תינוקות</a></li>
                            <li><a href="/sell" onClick={sell}>תכשיטים ושעונים</a></li>
                        </ul>
                    </div>
                    <div className=" col-sm-4 col-md  col-6 col">
                        <h5 className="headin5_amrc col_white_amrc pt2">פריטים לקניה</h5>
                        <ul className="footer_ul_amrc">
                            <li><a href="/products" onClick={buy}>רכב</a></li>
                            <li><a href="/products" onClick={buy}>יופי וניחוחות</a></li>
                            <li><a href="/products" onClick={buy}>יצירה</a></li>
                            <li><a href="/products" onClick={buy}>ספורט וחוץ</a></li>
                            <li><a href="/products" onClick={buy}>עתיקות</a></li>
                            <li><a href="/products" onClick={buy}>ציוד משרדי</a></li>
                        </ul>
                    </div>
                    <div className=" col-sm-4 col-md col-sm-4  col-12 col">
                        <h5 className="headin5_amrc col_white_amrc pt2">מצא אותנו</h5>
                        <p><i className="fa fa-location-arrow"></i> הזית 5 אשדוד</p>
                        <p><i className="fa fa-phone"></i> 09-9999999  </p>
                        <p><i className="fa fa fa-envelope"></i> justForYouIsreal@gmail.com </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <ul className="foote_bottom_ul_amrc">
                    <li><a href="/faq">שאלות נפוצות</a></li>
                    <li><a href="/prodects">פריטים לקניה</a></li>
                    <li><a href="/sell">מכירה</a></li>
                    <li><a href="/buy">קניה</a></li>
                    <li><a href="/about">אודות</a></li>
                    <li><a href="/">בית</a></li>
                </ul>
                <p className="text-center">Copyright @2021 | Designed With by <span style={{ color: "  #8d7f7f " }}>FS</span></p>
            </div>
        </footer>
    )
}
