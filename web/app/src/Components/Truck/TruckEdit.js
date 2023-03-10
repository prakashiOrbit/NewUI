import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import Truck from "./Truck.json";
import { config } from '../../Constants/constant';

const TruckEdit =()=>{
    
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state;
    console.log(data);

    const onSubmit = (text,data)=>{
console.log(data,text);

if(text=="submit"){

const sendpayload = {...data,"Truck":{ "___smart_action___": "lookup",
"___smart_value___": data.licenseNo}}

postMethod(config.editTruck,sendpayload)
.then((res)=>{
    console.log(res.data.responses[0].message);
    if(res.data.responses[0].message == "Truck details has been updated."){
      
        navigate("/truckist")
    }


});

}
else {
    navigate("/truckList")
}

    }
    




    return(
        <>

<EditComponent   rowdata={data} type="edit" formDetails={Truck} onSubmit={onSubmit} />
        </>
    )
};
export default TruckEdit;