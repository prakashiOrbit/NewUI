import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import farmer from "./farmer.json";
import { config } from '../../Constants/constant';

const FarmerEdit =()=>{
    
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state;
    console.log(data);

    const onSubmit = (text,data)=>{
console.log(data,text);

if(text=="submit"){

const sendpayload = {...data,"Farmer":{ "___smart_action___": "lookup",
"___smart_value___": data.fId}}

postMethod(config.editFarmer,sendpayload)
.then((res)=>{
    console.log(res.data.responses[0].message);
    if(res.data.responses[0].message == "Farmer details has been updated."){
      
        navigate("/farmerList")
    }


});

}
else {
    navigate("/farmerList")
}

    }
    




    return(
        <>

<EditComponent   rowdata={data} type="edit" formDetails={farmer} onSubmit={onSubmit} />
        </>
    )
};
export default FarmerEdit;