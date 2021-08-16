import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { getAll } from "../../../service/users";
import './Search.css'
import { useHistory } from 'react-router-dom' 
       
    
export default function Search() {
  const [reqList, setReqList] = useState([]);
  const [sellList, setSellList] = useState([]);
  const [filteredListRequest, setFilteredListRequest] = useState([]);
  const [filteredListForSell, setFilteredListForSell] = useState([]);
  const location = useLocation(); 
  const [path, setPath] = useState();
  const [searchValue, setSearchValue] = useState("")
  const [done, setDone] = useState(false);
  let history = useHistory(); 

  useEffect(async () => {                   
    let currentPath = location.pathname;
    setPath(currentPath);
  }, [location.pathname]);

  
  useEffect(async () => {
    let reqList = await getAll("request");
    let sellList = await getAll("forSell") 
    setReqList(reqList);
    setSellList(sellList);
    let searchListReq = [];
    let searchListSell = [];
    reqList.map((item) => {
      searchListReq.push([item.id,item.name]);
    })
    sellList.map((item) => {
      searchListSell.push([item.id,item.name]);
    })
    setFilteredListRequest(searchListReq);
    setFilteredListForSell(searchListSell);
  }, []);  


  useEffect(async () => {
    search();
  }, [reqList,sellList, searchValue]) 

  const updateList = async () => {
    let reqList = await getAll("request");
    let sellList = await getAll("forSell") 
    setReqList(reqList);
    setSellList(sellList);
  }

  function search(){
    let searchListReq = [];
    let searchListSell = [];
    reqList.map((item) => {
      searchListReq.push([item.id,item.name]);
    })
    sellList.map((item) => {
      searchListSell.push([item.id,item.name]);
    })
    setFilteredListRequest(searchListReq.filter(item => item[1].includes(searchValue)));
    setFilteredListForSell(searchListSell.filter(item => item[1].includes(searchValue))); 
  }

  function searchResult(){
    history.push("/search-result", { params: [filteredListRequest,filteredListForSell,path]});
  }

  const change = (event) => {
    setSearchValue(event.target.value);
  }
  return (
    <div >
      <div className="search-container" onMouseOver={updateList} onMouseLeave={() => { setSearchValue("") }}>
        <input type="text" placeholder="חפש כאן" name="search" value={searchValue} onChange={change} />
        <button type="submit" onClick={searchResult}><i className="fa fa-search"></i></button>
      </div>
     
    </div >
  );
}


