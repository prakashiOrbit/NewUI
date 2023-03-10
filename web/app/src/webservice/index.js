import axios from "axios";
import { Component } from 'react';
const baseUrl = ""
const authToken = ""

export const handleSearch = (url,value) => {
  postMethod({"FlowAdmin": {"___smart_action___": "lookup","___smart_value___": "MasterDatFlow"},"searchString": value},
  'http://', 'localhost:9082/', 'apptest/', 'MasterDatFlow', "SearchCollectionCenter")
  .then(res=>res.json()
  .then((resp)=>{
   var datalist=(resp.responses[0].farmers); 
   console.log (datalist,"------------------list");
   return datalist;
  }))

  }
  
  // console.log("inside handle Search")
  // var data = JSON.stringify({
  //     "FlowAdmin": {
  //         "___smart_action___": "lookup",
  //         "___smart_value___": "FarmerFlow"
  //     },
  //     "searchString": value
  // });
  // console.log(value)

//   var config = {
//       method: 'post',
//       url: 'http://localhost:9082/apptest/FarmerFlow/SearchFarmers',
//       headers: {
//           'Session-Id': 'b639e661-6443-4f7d-aa5f-596d8508cda0',
//           'Content-Type': 'application/json'
//       },
//       data: data
//   };
// }

export function postApi(url, value) {
  console.log("---------------post API started")
  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + url, value, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
      )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.log(url, 'url POST');
        console.log(value);
      });
      console.log(handleSearch(url,value),"=======================>value");
      return handleSearch(url, value);
  });
}

// handleSearch(url, searchString){
//   console.log(url, searchString, "from handle search click");
//   postMethod({"FlowAdmin": {"smart_action": "lookup","smart_value": "FarmerFlow"},"searchString": searchString},
//   'http://', 'localhost:10324/', 'apptest/', 'FarmerFlow', url);
//   }

export function getApi(url,searchString) {
  console.log(url, "url from getApi");
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + url, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }
      )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
        console.log(url,baseUrl,authToken, '---------------------------url GET');
      });
  });
}

function urlbuilder(protocol, domain, tenant, object, endpoint) {
  var url = protocol + domain + tenant + object + "/" + endpoint;
  console.log(url)
  return url
}


export function postMethod(payload, protocol, domain, tenant, object, endpoint) {
  console.log("post methode");
  var url = urlbuilder(protocol, domain, tenant, object, endpoint);
  //call authenticate function
  var fun = authenticate('http://', 'localhost:9082/', 'apptest/', 'Security', 'Authenticate')
  //localstorage getitem - store the session in a variable
  var id = localStorage.getItem('sessionId', fun)
  //Pass the variable in the header
  console.log(id,"-------------------------->session-id");
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Session-Id': id },
    body: JSON.stringify(payload)
  }

  return new Promise((resolve, reject) => {

    fetch(url, req)
      .then((res) => resolve(res))
      .catch(err => { reject(err) })
  })
}

function authenticate(protocol, domain, tenant, object, endpoint) {
  var url = urlbuilder(protocol, domain, tenant, object, endpoint);
  var pay = { "identity": "apptestadmin", "password": "apptestadmin", "type": "custom", "FlowAdmin": { "___smart_action___": "lookup", "___smart_value___": "Security" } }
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pay)
  }

  fetch(url, req)
    .then(res => res.json()
      .then((resp) => {
        var id = (resp.responses[0].sessionId);
        console.log(id);
        localStorage.setItem('sessionId', id);
      }))
};
