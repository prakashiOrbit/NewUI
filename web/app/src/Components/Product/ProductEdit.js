import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import Product from "./Product.json";
import { config } from '../../Constants/constant';

const ProductEdit =()=>{
    
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state;
    console.log(data);

    const onSubmit = (text,data)=>{
console.log(data,text);

if(text=="submit"){

const sendpayload = {...data,"Product":{ "___smart_action___": "lookup",
"___smart_value___": data.skuId}}

postMethod(config.editProduct,sendpayload)
.then((res)=>{
    console.log(res.data.responses[0].message);
    if(res.data.responses[0].message == "Product details has been updated."){
      
        navigate("/productList")
    }


});

}
else {
    navigate("/productList")
}

    }
    




    return(
        <>

<EditComponent   rowdata={data} type="edit" formDetails={Product} onSubmit={onSubmit} />
        </>
    )
};
export default ProductEdit;