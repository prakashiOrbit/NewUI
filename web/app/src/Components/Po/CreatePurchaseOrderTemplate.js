import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import PurchaseOrderTemplate from "./PurchaseOrderTemplate.json";
import { config } from '../../Constants/constant';

const CreatePurchaseOrderTemplate = () => {

    const navigate = useNavigate();
    const onSubmit = (text, data) => {
        console.log(data, text);

        if (text == "submit") {

            

            const payload = {
                ...data, "FlowAdmin": {
                    "___smart_action___": "lookup",
                    "___smart_value___": "PurchaseOrderTemplateFlow",
                }
            }

            postMethod(config.addPurchaseOrderTemplate, payload)
                .then((res) => {
                    console.log(res);

                });

        }
        else {
            navigate("/PurchaseOrderTemplateList")
        }

    }





    return (
        <>

            <EditComponent formDetails={PurchaseOrderTemplate} onSubmit={onSubmit} />
        </>
    )
};
export default CreatePurchaseOrderTemplate;