import React, { useState } from "react"

import '../../assets/stylesheets/application.css'

function TitleAndWeight (props) {

    const [title,setTitle] = useState(props.title);
    const [weight,setWeight] = useState(props.weight);


    const onTitleChange = event => {
        setTitle(event.target.value);
        props.updateFunction(event.target.value,weight);
    }
    
    const onWeightChange = event => {
        setWeight(event.target.value);
        props.updateFunction(title,event.target.value);
    }

    return(
        <div className="infos">
            <input className="title" onBlur={onTitleChange} placeholder={props.placeholder} defaultValue={title}/>
            <input className="weight" onBlur={onWeightChange} placeholder="XX%" defaultValue={weight}/>
        </div>
    )

}

export default TitleAndWeight;