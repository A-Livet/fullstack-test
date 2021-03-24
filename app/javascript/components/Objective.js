import React, { useEffect, useState } from "react"

import '../../assets/stylesheets/application.css'
import KeyResult from "./KeyResult";
import TitleAndWeight from "./TitleAndWeight";

const HEADERS = {
  'Accept': 'application/json',
  'Content-type': 'application/json'
}

function Objective (props) {

  const [title,setTitle] = useState(props.title || "");
  const [weight,setWeight] = useState(props.weight || "");
  const [keyResults,setKeyResults] = useState([]);
  const [count, setCount] = useState(0);
  const [id] = useState(props.id) 

  const updateObjective = (title,weight) => {

    fetch(`/objectives/${id}`, {
      method: 'put',
      body: JSON.stringify({
        title: title,
        weight: weight
      }),
      headers: HEADERS
    }).then( response => {
      return response.json();
    }).then( json => {
        setTitle(json.title);
        setWeight(json.weight);
    })
  }

  useEffect(() =>{
    fetch(`/keyresults/objectives/${id}`, {
      method: 'get',
      headers: HEADERS
    }).then( response => {
      return response.json();
      }).then( json => {
        console.log(json)
        setKeyResults(json);
    })
  },[count])

  const deleteObjective = () => {
    fetch(`/objectives/${id}`, {  
      method: 'delete',
      headers: HEADERS
    }).then(
      props.updateCount()
    );
  }

  const addKR = () => {
    fetch('/keyresults', {
      method: 'post',
      body: JSON.stringify({
        objective_id: id
      }),
      headers: HEADERS
    }).then( response => {
      setCount(count + 1);
    })
  }

  const updateParent = () => {
    setCount(count-1);
  }

  return (
    <React.Fragment>
      <div className="objective-container">
        <TitleAndWeight title={title} weight={weight} updateFunction={updateObjective}/>
        {keyResults.map( keyResult => {
          return <KeyResult title={keyResult.title} weight={keyResult.weight} key={keyResult.id} id={keyResult.id} updateObjective={updateParent}/>
        })}
        <button className="add-key-result" onClick={addKR}>+ Add KR</button>
        <button className="delete-objective" onClick={deleteObjective}>Delete</button>
      </div>
    </React.Fragment>
  );
}

export default Objective
