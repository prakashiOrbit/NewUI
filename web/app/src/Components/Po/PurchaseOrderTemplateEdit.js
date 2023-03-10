import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import PurchaseOrderTemplate from "./PurchaseOrderTemplate.json";
import { config } from '../../Constants/constant';

const PurchaseOrderTemplateEdit =()=>{
    
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state;
    console.log(data);

    const onSubmit = (text,data)=>{
console.log(data,text);

if(text=="submit"){

const sendpayload = {...data,"PurchaseOrderTemplate":{ "___smart_action___": "lookup",
"___smart_value___": data.poId}}

postMethod(config.editPurchaseOrderTemplate,sendpayload)
.then((res)=>{
    console.log(res.data.responses[0].message);
    if(res.data.responses[0].message == "Purchase Order Template details has been updated."){
      
        navigate("/poList")
    }


});

}
else {
    navigate("/poist")
}

    }
    




    return(
        <>

<EditComponent   rowdata={data} type="edit" formDetails={PurchaseOrderTemplate} onSubmit={onSubmit} />
        </>
    )
};
export default PurchaseOrderTemplateEdit;