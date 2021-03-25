
const HEADERS = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
  
  export function getObjectives() {
      return dispatch => {
      return fetch('/objectives', {
        method: 'get',
        headers: HEADERS
      }).then( response => {
        return response.json();
      }).then( json => {
        dispatch(getObjectivesSucces(json));
      });
    }
  }
  
  export function checkWeight() {
    return dispatch => {
      return fetch('/objectives/check', {
        method: 'get',
        headers: HEADERS
      }).then( response => {
        return response.json();
      }).then( json => {
        dispatch(getObjectivesCheck(json));
    });
  }
  }
  
  export function getObjectivesCheck(json){
    return {
      type: "CHECK_WEIGHT",
      json
    }
  }
  
  export function getObjectivesSucces(json) {
    return {
      type: "GET_OBJECTIVES",
      json
    }
  }