import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getObjectives, checkWeight } from "../storeActions";


import Objective from './Objective'

const HEADERS = {
  'Accept': 'application/json',
  'Content-type': 'application/json'
}

const ObjectiveList = () => {
  
  const [count, setCount] = useState(0);

  const objectives = useSelector(state => state.objectives);
  const weightMissing = useSelector(state => state.weightMissing)
  const invalidWeight = useSelector(state => state.invalidWeight)


  const dispatch = useDispatch();

  const addObjective = () => {
    fetch('/objectives', {
      method: 'post',
      headers: HEADERS
    })
      .then( response => {
      setCount(count + 1);
    })
  }

  useEffect(() => {
    dispatch(getObjectives())
    dispatch(checkWeight())
  }, [count])

  const updateObjectiveList = () => {
    setCount(count-1)
  }

  let message = "";

  if(weightMissing){
    message = "Weights are missing on some KRs or objective"
  } else if(invalidWeight) {
    message = "You have some invalid weights!"
  }

  return (
    <React.Fragment>
      <button onClick={addObjective}>+ Add objective</button>
      <div id="objectives">{objectives.map( objective => {
        return <Objective title={objective.title} weight={objective.weight} id={objective.id} key={objective.id} updateObjectiveList={updateObjectiveList}/>
      })}</div>
      { message}
    </React.Fragment>
  );
}

export default ObjectiveList
