import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css" 

function App() {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [displayList,setDisplayList] = useState([])
  
  const changeHandler = (e) => {
    setDisplayList(myData.filter(data=>data.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const getApiData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setMyData(res.data);
      setDisplayList(res.data)
      console.log(res);
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="App">
      <h1>Search For User</h1>
      <div className="searchSection" style={{display:"flex",flexDirection:"column",padding:"10px",position:"sticky",top:0,backgroundColor:"lightblue"}}>
        <label htmlFor="search">Search User</label>
        <input type="search" id="search" name="search" data-search style={{width:"100%",padding:"10px",fontSize:"1.5rem"}} onChange={changeHandler}></input>
      </div>
      <br/>
      {isError}
      {displayList.map((data)=>{
        const {name,email,id} = data
        return(
          <div className="profileCard" key={id}>
          <p>{name}</p>
          <p>{email}</p>
        </div>
        )
      })}
    </div>
  );
}

export default App;
