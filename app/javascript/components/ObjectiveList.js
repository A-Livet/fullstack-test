import React, { useState, useEffect } from "react"

import Objective from './Objective'

const ObjectiveList = () => {
  
  const [objectives,setObjectives] = useState([]);
  const [count, setCount] = useState(0);

  const addObjective = () => {
    fetch('/objectives', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      } 
    })
      .then( response => {
      setCount(count + 1);
    }
    )
  }

  const updateCount = () => {
    setCount(count-1);
  }

  useEffect(() => {
    fetch('/objectives', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      } 
    }).then( response => {
      return response.json();
      }).then( json => {
        console.log(json)
        setObjectives(json);
      })
  }, [count])

  return (
    <React.Fragment>
      <button onClick={addObjective}>+ Add objective</button>
      <div id="objectives">{objectives.map( objective => {
        return <Objective title={objective.title} weight={objective.weight} id={objective.id} key={objective.id} updateCount={updateCount}/>
      })}</div> 
    </React.Fragment>
  );
}

export default ObjectiveList
