import React, { useState } from "react"

const ObjectiveList = () => {
  
  const [count,setCount] = useState(0);

  const addCount = () => {
    setCount(count +1);
  }
  return (
    <React.Fragment>
      <button onClick={addCount}>+ Add objective</button>
      <div id="count">{count}</div> 
    </React.Fragment>
  );
}

export default ObjectiveList
