import React, { useState } from "react"

import '../../assets/stylesheets/application.css'


function Objective (props) {

  const [title,setTitle] = useState(props.title || "");
  const [weight,setWeight] = useState(props.weight || "");
  const [id] = useState(props.id) 

  const onTitleChange = event => {
    setTitle(event.target.value);
  }

  const onWeightChange = event => {
    setWeight(event.target.value);
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
