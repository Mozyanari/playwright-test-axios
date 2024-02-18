import { useState } from 'react';
import axios from 'axios';

function App() {

  const [postResult, setPostResult] = useState("not post");
  const [getReslt, setGetResult] = useState("not get")

  function onClickPostAxios(){
    axios.post('https://httpbin.org/post', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      setPostResult("POST")
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function onClickGetAxios(){
    axios.get('https://httpbin.org/get').then(function (response){
      setGetResult("GET")
    })
  }

  return (
    <div className="App">
      <button data-testid = "postButton" onClick={onClickPostAxios}>Axios POST Data</button>
      <text>Post Result:</text>
      <text data-testid= "postResult">{postResult}</text>
      <br></br>
      <button data-testid = "getButton"onClick={onClickGetAxios}>Axios GET Data</button>
      <text>Get Result:</text>
      <text data-testid = "getResult">{getReslt}</text>
    </div>
  );
}

export default App;