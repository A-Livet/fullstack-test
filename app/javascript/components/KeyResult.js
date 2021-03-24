import React, { useState }from "react"
import TitleAndWeight from "./TitleAndWeight"

const HEADERS = {
  'Accept': 'application/json',
  'Content-type': 'application/json'
}

function KeyResult (props) {

  const [title,setTitle] = useState(props.title || "");
  const [weight,setWeight] = useState(props.weight || "");
  const [id] = useState(props.id)


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
        console.log(json)
        setTitle(json.title);
        setWeight(json.weight);
    })
  }

  const deleteKR = () => {
    fetch(`/keyresults/${id}`, {  
      method: 'delete',
      headers: HEADERS
    }).then(
      props.updateObjective()
    );
  }

  return (
    <React.Fragment>
      <div className="key-result-container">
        <TitleAndWeight title={title} weight={weight} updateFunction={updateKR}/>
        <button className="delete-key-result" onClick={deleteKR}>Delete</button>
      </div>
    </React.Fragment>
  );
}

export default KeyResult
