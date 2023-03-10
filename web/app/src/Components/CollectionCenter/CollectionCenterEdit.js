import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import CollectionCenter from "./CollectionCenter.json";
import { config } from '../../Constants/constant';

const CollectionCenterEdit =()=>{
    
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state;
    console.log(data);

    const onSubmit = (text,data)=>{
console.log(data,text);

if(text=="submit"){

const sendpayload = {...data,"CollectionCenter":{ "___smart_action___": "lookup",
"___smart_value___": data.centerId}}

postMethod(config.editCollectionCenter,sendpayload)
.then((res)=>{
    console.log(res.data.responses[0].message);
    if(res.data.responses[0].message == "CollectionCenter details has been updated."){
      
        navigate("/centerList")
    }


});

}
else {
    navigate("/centerList")
}

    }
    




    return(
        <>

<EditComponent   rowdata={data} type="edit" formDetails={CollectionCenter} onSubmit={onSubmit} />
        </>
    )
};
export default CollectionCenterEdit;