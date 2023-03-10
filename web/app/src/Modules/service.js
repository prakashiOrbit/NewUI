import axios from "axios";
const postMethod = async (url,payload) => {
    
  
    var id = localStorage.getItem('sessionId');
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Session-Id': id
        },
        body: JSON.stringify(payload) // To do: Write a construct param function to build the payload
    }
    const config = {
        headers:{ 'Content-Type': 'application/json',  'Session-Id': id }
      };
    console.log("http://localhost:9082/apptest"+url, payload)
    return await axios.post("http://localhost:9082/apptest"+url, payload,config)
            .then((res) => {
          
                return res;
                
            })
            .catch(err => {
                return ;
            })
  
}
export default postMethod;


export const getMethod = async (url,payload) => {
    
  
    var id = localStorage.getItem('sessionId');
    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Session-Id': id
        },
        body: JSON.stringify(payload) // To do: Write a construct param function to build the payload
    }
    const config = {
        headers:{ 'Content-Type': 'application/json',  'Session-Id': id }
      };
    console.log("http://localhost:9082/apptest"+url, payload)
    return await axios.get("http://localhost:9082/apptest"+url, payload,config)
            .then((res) => {
          
                return res;
                
            })
            .catch(err => {
                return ;
            })
  
}
