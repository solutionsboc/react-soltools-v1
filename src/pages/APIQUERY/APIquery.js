import React from 'react';
import { useEffect, useState } from "react";
import DataContext from "./DataContext";
import UseFetch from './UseFetch';
import useFetchData from './useFetchData';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

import '../../components/shared/Modal.css';
import styled from 'styled-components';
import { Modal } from '../../components/shared/Modal';
import { GlobalStyle } from '../../components/shared/globalStyles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
`;

const columns = [
  { field: "id", header: "#" },
  { field: "title", header: "Title" },
];

// const Button = styled.button`
//   min-width: 100px;
//   padding: 16px 32px;
//   border-radius: 4px;
//   border: none;
//   background: #141414;
//   color: #fff;
//   font-size: 24px;
//   cursor: pointer;
// `;

function refreshPage() {
  window.location.reload(false);
}

function APIquery() {
  // const [currQuote, setCurrQuote] = useState(1);
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnUrlDisabled, setUrlBtnDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [dataFetch, setUseFetchData] = useState(null);
  // const { data, loading, error, refetch } = useState(null);
  // const [{ data, loading, error, refetch }, setFetchData] = useState({});


  // const dataFetch = useFetchData("https://jsonplaceholder.typicode.com/todos");
  const { dataFetch, loadingUrl, errorUrl, refetchUrl } = useFetchData(url && url.trim().length >= 10 ? url : "");

  const { data, loading, error, refetch } = UseFetch(text && text.trim().length >= 10 ? text : "https://v2.jokeapi.dev/joke/Programming");

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10){
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value);
  }

  const handleUrlChange = (e) => {
    if (url === '') {
      setUrlBtnDisabled(true)
      // setMessage(null)
    } else if (url !== '' && url.trim().length <= 10){
      setUrlBtnDisabled(true)
      // setMessage('Text must be at least 10 characters')
    } else {
      setUrlBtnDisabled(false)
      // setMessage(null)
    }
    setUrl(e.target.value);
  }


  function HandleUseFetchData() {
    var t = "tt";
    // setUseFetchData(useFetchData("https://jsonplaceholder.typicode.com/todos"));
    // const dataFetch = useFetchData("https://jsonplaceholder.typicode.com/todos");
  }


  if (errorUrl) {
    console.log("APIquery errorUrl:");
    console.log(errorUrl);
  }
  if (error) {
    console.log("APIquery error:");
    console.log(error);
  }

  // data check only for Joke API -> remove and check smth else -> eg:some state
  if (!data) {
    // setBtnDisabled(true)
    return (
      <div className='apiquery'>
        <h1>API query</h1>
        <Card>
          <p>No data from API.</p>
          <button className='btn btn-primary' onClick={refreshPage}>Reload Page!</button>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="apiquery">
        <h1>API query</h1>
        <p>Data from API:</p>

        <Card reverse={true}>
          <p>dataFetch Example: "https://jsonplaceholder.typicode.com/todos"</p>
          {/* <button onClick={HandleUseFetchData}>Click</button> */}
          {/* <button className='btn btn-secondary' onClick={() => HandleUseFetchData}>{loading ? 'Loading…' : 'Refetch'}</button> */}

          {/* <useFetchData url="https://jsonplaceholder.typicode.com/posts"/> */}


          <div className="input-group">
            <input onChange={handleUrlChange} type="text" placeholder="insert URL" value={url} />
            <Button type="submit" isDisabled={btnUrlDisabled} onClick={refetchUrl}>
              {loadingUrl ? "Loading…" : "Refetch data"}
            </Button>
          </div>
          {/* {message && <div className="message">{message}</div>} */}

          {/* Modal popup */}
          <Container>
            <Button onClick={openModal}>Show result</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} data={dataFetch} columns={columns} table={true}/>
            <GlobalStyle />
          </Container>

        </Card>
        {/* Joke Card */}
        <Card reverse={true}>
        <p>used Example: "https://v2.jokeapi.dev/joke/Programming"</p>
          <div className="input-group">
            <input onChange={handleTextChange} type="text" placeholder="insert URL" value={text} />
            <Button type="submit" isDisabled={btnDisabled} onClick={refetch}>
              {loading ? "Loading…" : "Refetch"}
            </Button>
          </div>
          {message && <div className="message">{message}</div>}
          <h3>
            {data?.setup} : {data?.delivery}
          </h3>
        </Card>
        {/* <div className="output-group">
          <p>{data?.setup} : {data?.delivery}</p>
        </div> */}
      </div>
    );
  }

  // if (!dataFetch) {
  //   return (
  //     <div className='apiquery'>
  //       <h1>API query</h1>
  //       <p>No data from API.</p>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className='apiquery'>
  //       <h1>API query</h1>

  //       {/* DataContext not realy needed yet */}
  //       <DataContext.Provider value={{ dataFetch, currQuote, setCurrQuote }}>
  //         <ul>
  //           {dataFetch.map((el, i) => {
  //             return (
  //               <li key={i}>
  //                 <a href="#top" onClick={() => setCurrQuote(el.id)}>
  //                   {el.title}
  //                 </a>
  //               </li>
  //             );
  //           })}

  //         </ul>
  //       </DataContext.Provider>
        
  //     </div>
  //   );
  // }
}

export default APIquery;
