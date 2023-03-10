import React from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import EditComponent from '../../Modules/edit';
import postMethod from '../../Modules/service';
import farmer from "./farmer.json";
import { config } from '../../Constants/constant';

const FarmerOnboard = () => {

    const navigate = useNavigate();
    const onSubmit = (text, data) => {
        console.log(data, text);

        if (text == "submit") {

            

            const payload = {
                ...data, "FlowAdmin": {
                    "___smart_action___": "lookup",
                    "___smart_value___": "FarmerFlow",
                }
            }

            postMethod(config.addfarmer, payload)
                .then((res) => {
                    console.log(res);

                });

        }
        else {
            navigate("/farmerList")
        }

    }





    return (
        <>

            <EditComponent formDetails={farmer} onSubmit={onSubmit} />
        </>
    )
};
export default FarmerOnboard;