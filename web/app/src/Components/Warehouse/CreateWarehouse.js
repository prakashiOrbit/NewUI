import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import Warehouse from "./Warehouse.json";
import { config } from '../../Constants/constant';

const CreateWarehouse = () => {

    const navigate = useNavigate();
    const onSubmit = (text, data) => {
        console.log(data, text);

        if (text == "submit") {

            

            const payload = {
                ...data, "FlowAdmin": {
                    "___smart_action___": "lookup",
                    "___smart_value___": "MasterDataFlow",
                }
            }

            postMethod(config.addWarehouse, payload)
                .then((res) => {
                    console.log(res);

                });

        }
        else {
            navigate("/warehouseList")
        }

    }





    return (
        <>

            <EditComponent formDetails={Warehouse} onSubmit={onSubmit} />
        </>
    )
};
export default CreateWarehouse;