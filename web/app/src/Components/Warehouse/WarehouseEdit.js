import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import Warehouse from "./Warehouse.json";
import { config } from '../../Constants/constant';

const WarehouseEdit =()=>{
    
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state;
    console.log(data);

    const onSubmit = (text,data)=>{
console.log(data,text);

if(text=="submit"){

const sendpayload = {...data,"Warehouse":{ "___smart_action___": "lookup",
"___smart_value___": data.address}}

postMethod(config.editWarehouse,sendpayload)
.then((res)=>{
    console.log(res.data.responses[0].message);
    if(res.data.responses[0].message == "Warehouse details has been updated."){
      
        navigate("/warehouseList")
    }


});

}
else {
    navigate("/warehouseList")
}

    }
    




    return(
        <>

<EditComponent   rowdata={data} type="edit" formDetails={Warehouse} onSubmit={onSubmit} />
        </>
    )
};
export default WarehouseEdit;