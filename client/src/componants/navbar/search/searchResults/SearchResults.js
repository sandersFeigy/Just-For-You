import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { get, getAll } from '../../../../service/users'
import { useHistory } from 'react-router-dom'
import { BlockLoading } from 'react-loadingg';
import "./SearchResults.css"


export default function SearchResults() {
    let history = useHistory();
    let user = (localStorage.user != null && localStorage.user !== "") ? JSON.parse(localStorage.user) : { id: null };
    const location = useLocation();
    const [done, setDone] = useState(false);
    const [request, setRequest] = useState([]);
    const [forSell, setForSell] = useState([]);
    const [filteredListReq, setFilteredListReq] = useState(location.state.params[0]);
    const [filteredListSell, setFilteredListSell] = useState(location.state.params[1]);
    const [path, setPath] = useState(location.state.params[2]);
    const [theUser, setTheUser] = useState(false);
    useEffect(async () => {
        setFilteredListReq(location.state.params[0])
    }, [location.state.params[0]]);

    useEffect(async () => {
        setFilteredListSell(location.state.params[1])
    }, [location.state.params[1]]);

    useEffect(async () => {
        setPath(location.state.params[2]);
    }, [location.state.params[2]]);

    useEffect(async () => {
        onloud(user)
    }, [localStorage.buyItem]);

    function click(e) {
        let num = Number([e.currentTarget.id])
        let tempRequest;
        for (let i = 0; i < request.length; i++) {
            if (request[i].id === num) {
                tempRequest = request[i]
                break
            }
        }
        localStorage.setItem("buyItem", JSON.stringify(tempRequest));
        history.push("/item")
    }

    function click2(e) { 
         let num = Number([e.currentTarget.id])
         let tempProduct;
        for (let i = 0; i < forSell.length; i++) {
            if (forSell[i].id === num) {
                tempProduct =forSell[i]
                break
            }
        }
         history.push("/products" , {
             key:num+1,
             num: num ,
             item: tempProduct,
             theUser: theUser,
             forAll: false
         })  
    }

    const onloud = async (a) => {
        user = (localStorage.user != null && localStorage.user !== "") ? JSON.parse(localStorage.user) : { id: null };
        if (localStorage.buyer != null && localStorage.buyer !== "") {
            let buyItem = JSON.parse(localStorage.buyItem);
            let buyer = await get("users/" + buyItem.userId);
            if (buyer.id === user.id) {
                setTheUser(true);
            }
        }
        setDone(false);
        let requestt = await getAll("request");
        let forSell = await getAll("forSell");
        setForSell(forSell);
        setRequest(requestt);
        setDone(true)
    };


    return (
        <>
            {!done ? (< div className="laod">
                <BlockLoading color={"#ff50a7"} speed={"3"} />
            </div>) :
                <div className="resolts">
                    <div className="block" >
                        <h1>מכירה</h1><hr />
                        <div className="listtt" >
                            {
                                (filteredListReq !== undefined)
                                &&
                                filteredListReq.map((item) => {
                                    console.log(item)
                                    return <a key={item[0]} onClick={click} href={'http://localhost:3000/item'} id={item[0]} className={((path !== null) && (path.includes(item[0]))) ? "list_item active_link" : "list_item"}><span>לחץ למעבר לבקשת המוצר - </span>{item[1]}</a>

                                })
                            }
                        </div >
                        {
                            (filteredListReq.length === 0)
                            &&
                            <h4>אין בקשות מכירה המתאימות לחיפוש שלך</h4>
                        }
                    </div>
                    <div className="block" >
                        <h1>פריטים לקניה</h1><hr />
                        <div  className="listtt" >
                            {
                                (filteredListSell !== undefined)
                                &&
                                filteredListSell.map((item) => {
                                    return <a key={item[0]} onClick={click2} href={'http://localhost:3000/products'} id={item[0]} className={((path !== null) && (path.includes(item[0]))) ? "list_item active_link" : "list_item"} ><span>לחץ למעבר לפריטים למכירה - </span>{item[1]}</a>
                                })
                            }
                        </div>
                        {
                            (filteredListSell.length === 0)
                            &&
                            <h4>אין מוצרים לקניה המתאימות לחיפוש שלך</h4>
                        }
                    </div>
                </div>
            }</>
    )
}
