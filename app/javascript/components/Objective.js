import React, { useEffect, useState } from "react"

import '../../assets/stylesheets/application.css'
import KeyResult from "./KeyResult";
import TitleAndWeight from "./TitleAndWeight";
import { checkWeight } from '../storeActions';
import { useDispatch } from "react-redux";

const HEADERS = {
  'Accept': 'application/json',
  'Content-type': 'application/json'
}

function Objective (props) {

  const [title,setTitle] = useState(props.title || "");
  const [weight,setWeight] = useState(props.weight || "");
  const [keyResults,setKeyResults] = useState([]);
  const [count, setCount] = useState(0);
  const [id] = useState(props.id);
  const [completion,setCompletion] = useState(0);

  const dispatch = useDispatch();

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
        dispatch(checkWeight());
    })
  }

  const getCompletion = () => {
    fetch(`/objectives/completion/${id}`, {
      method: 'get',
      headers: HEADERS
    }).then( response => {
      return response.json();
    }).then( json => {
        setCompletion(json.completion)
    })
  }

  useEffect(() =>{
    fetch(`/keyresults/objectives/${id}`, {
      method: 'get',
      headers: HEADERS
    }).then( response => {
      return response.json();
      }).then( json => {
        setKeyResults(json);
    })
    getCompletion();
  },[count])

  const deleteObjective = () => {
    fetch(`/objectives/${id}`, {  
      method: 'delete',
      headers: HEADERS
    }).then( () => {
      props.updateObjectiveList()
      dispatch(checkWeight());
    }
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
      setCount(count + 1)
      dispatch(checkWeight());
    })
  }

  const updateParent = () => {
    setCount(count-1);
  }

  return (
    <React.Fragment>
      <div className="objective-container">
        <TitleAndWeight title={title} weight={weight} updateFunction={updateObjective} placeholder="Objective Name..."/>
        {keyResults.map( keyResult => {
          return <KeyResult title={keyResult.title} weight={keyResult.weight} isComplete={keyResult.complete} key={keyResult.id} id={keyResult.id} updateObjective={updateParent}/>
        })}
        <button className="add-key-result" onClick={addKR}>+ Add KR</button>
        <button className="delete-objective" onClick={deleteObjective}>Delete</button>
        <span> completion : {completion}% </span>
      </div>
    </React.Fragment>
  );
}

export default Objective
