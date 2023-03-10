import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import Truck from "./Truck.json";
import { config } from '../../Constants/constant';

const CreateTruck = () => {

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

            postMethod(config.addTruck, payload)
                .then((res) => {
                    console.log(res);

                });

        }
        else {
            navigate("/truckList")
        }

    }





    return (
        <>

            <EditComponent formDetails={Truck} onSubmit={onSubmit} />
        </>
    )
};
export default CreateTruck