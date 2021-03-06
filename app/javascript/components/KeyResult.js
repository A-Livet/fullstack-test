import React, { useState }from "react"
import {useDispatch} from "react-redux"
import { checkWeight } from '../storeActions';
import TitleAndWeight from "./TitleAndWeight"

const HEADERS = {
  'Accept': 'application/json',
  'Content-type': 'application/json'
}

function KeyResult (props) {

  const [title,setTitle] = useState(props.title);
  const [weight,setWeight] = useState(props.weight);
  const [id] = useState(props.id)
  const [isComplete,setIsComplete] = useState(props.isComplete);

  const dispatch = useDispatch();


  const updateKR = (title,weight) => {
    fetch(`/keyresults/${id}`, {
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
        setIsComplete(json.complete);
        dispatch(checkWeight());
    })
  }

  const updateComplete = (complete) => {
    fetch(`/keyresults/${id}`, {
      method: 'put',
      body: JSON.stringify({
        complete: complete
      }),
      headers: HEADERS
    }).then( response => {
      return response.json();
    }).then( json => {
        setTitle(json.title);
        setWeight(json.weight);
        setIsComplete(json.complete);
        dispatch(checkWeight());
    })
  }

  const deleteKR = () => {
    fetch(`/keyresults/${id}`, {  
      method: 'delete',
      headers: HEADERS
    }).then(() => {
      dispatch(checkWeight());
      props.updateObjective();
    });
  }

  const handleCheckBox = (event) => {
    console.log(event.target.checked);
    setIsComplete(event.target.checked);
    updateComplete(event.target.checked);
    props.updateObjective();
  }

  return (
    <React.Fragment>
      <div className="key-result-container">
        <input type="checkbox" checked={isComplete} onChange={handleCheckBox}/>
        <TitleAndWeight title={title} weight={weight} updateFunction={updateKR} placeholder="KR Name..."/>
        <button className="delete-key-result" onClick={deleteKR}>Delete</button>
      </div>
    </React.Fragment>
  );
}

export default KeyResult
