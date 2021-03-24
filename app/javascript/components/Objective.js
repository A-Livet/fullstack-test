import React, { useState } from "react"

import '../../assets/stylesheets/application.css'


function Objective (props) {

  const [title,setTitle] = useState(props.title || "");
  const [weight,setWeight] = useState(props.weight || "");
  const [id] = useState(props.id) 

  const updateObjective = (title,weight) => {

    console.log(title);

    fetch(`/objectives/${id}`, {
      method: 'put',
      body: JSON.stringify({
        title: title,
        weight: weight
      }),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      } 
    }).then( response => {
      return response.json();
    }).then( json => {
        setTitle(json.title);
        setWeight(json.weight);
    })
  }

  const onTitleChange = event => {
    setTitle(event.target.value);
    updateObjective(event.target.value,weight);
  }

  const onWeightChange = event => {
    setWeight(event.target.value);
    updateObjective(title,event.target.value);
  }

  return (
    <React.Fragment>
      <div className="objective-container">
        <input className="objective-title" onBlur={onTitleChange} placeholder="Objective name..." defaultValue={title}/>
        <input className="objective-weight" onBlur={onWeightChange} placeholder="XX%" defaultValue={weight}/>
      </div>
    </React.Fragment>
  );
}

export default Objective
