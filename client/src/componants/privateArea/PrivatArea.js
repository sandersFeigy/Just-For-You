import React, { useState, useEffect } from 'react' 
import Product from '../products/product/Product'
import BuyItem from '../sell/buyItem/BuyItem'
import { get, getAll } from '../../service/users'
import { BlockLoading } from 'react-loadingg'; 
import "./PrivatArea.css"


export default function SearchResults() { 
    let user = (localStorage.user != null && localStorage.user !== "") ? JSON.parse(localStorage.user) : { id: null };
    const [done, setDone] = useState(false); 
    const [userReq, setUserReq] = useState( []);
    const [userForSell, setUserForSell] = useState([ ]); 
    const [login, setLogin] = useState(false);
    const classes = ["buyItemBright", "buyItemDark"];

    useEffect(async () => {
        onloud(user)
    }, [localStorage.buyItem]);

     
    const onloud = async (a) => {
        user = (localStorage.user != null && localStorage.user !== "") ? JSON.parse(localStorage.user) : { id: null }; 
        setDone(false);
        if(user.id!==null){
            setUserReq(user.buyItems)
            setUserForSell(user.sellItems)
            setLogin(true);
        }   
        setDone(true)
    };

    function updateDone(bool) {
        setDone(bool);
      }
    return (
        <>
            {!done ? (< div className="laod">
                <BlockLoading color={"#ff50a7"} speed={"3"} />
            </div>) :
                login ?<div className="resolts">
                    <div className="block" >
                        <h1>מכירה</h1><hr />
                        <div className="listtt" >
                            {
                                (userReq.length !== 0)
                                &&
                                userReq.map((item,i) => { 
                                     return <BuyItem key={i} buyItemDetaels={item} buyItem={JSON.parse(localStorage.buyItem)} setbuyItem={null} data={classes[i % 2]} buyer={true} updateDone={updateDone}  user ={true}/>;

                                })
                            }
                        </div >
                        {
                            (userReq.length === 0)
                            &&
                            <h4>אין לך בקשות למוצרים</h4>
                        }
                    </div>
                    <div className="block" >
                        <h1>פריטים לקניה</h1><hr />
                        <div  className="galleryyy-diff " >
                            {
                                (userForSell.length !== 0)
                                &&
                                userForSell.map((item,i) => {
                                    return <Product key={i} num={i + 1} item={item} forAll={false} user={true}/>;
                                })
                            }
                        </div>
                        {
                            (userForSell.length === 0)
                            &&
                            <h4>אין לך פריטים למכירה</h4>
                        }
                    </div>
                </div>:<div className="resolts data">על מנת לראות את המידע שלך עליך להיכנס למערכת</div>
            }</>
    )
}
