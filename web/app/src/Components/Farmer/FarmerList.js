

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Datatable from "../../Modules/Datatable/datatable";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import { header_data } from "./farmer_headerdata";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FRSelect from "../../Modules/select";
import postMethod, { getMethod } from "../../Modules/service";
import { config } from "../../Constants/constant";


const FarmerList = () => {

  //   fields = "./Service/po.json";
  //   farmerFields = "./Service/farmer.json";


  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [ccdata, setccdata] = useState([{ name: "check", label: "check" }]);
  const [farmerdata, setfarmerdata] = useState({});



  useEffect(() => {
    getCcList();
  }, [])


  const handleChange = (e) => {

    var name = e.target.name;
    var value = e.target.value;

    setfarmerdata({ ...farmerdata, "centerId": value, "centerName": name })


  }




  const getCcList = () => {



    const payloaddata = {
      "FlowAdmin": {
        "___smart_action___": "lookup",
        "___smart_value___": "MasterDataFlow"
      },
      "searchString": "*"
    };


    postMethod(config.getcc, payloaddata)
      .then((res) => {
        console.log(res.data.responses[0].cd);
        const payload = res.data.responses[0].cd.map((index) => ({
          value: index.centerId, label: index.centerName
        }))
        console.log(payload);
        setccdata(payload);


      });


  };


  const handlesubmit = () => {

    console.log(farmerdata);
    const sendpayload = {
      ...farmerdata, "Farmer": {
        "___smart_action___": "lookup",
        "___smart_value___": farmerdata.fId
      }
    }

    postMethod(config.editFarmer, sendpayload)
      .then((res) => {
        console.log(res.data.responses[0].message);
        if (res.data.responses[0].message == "Farmer details has been updated.") {

          navigate("/farmerList")
        }


      });
      setopen(false);


  }


  const handleOptions = (data, option) => {
    console.log(option);
    console.log(data)
    switch (option) {
      case "Edit":

        navigate('/farmer-edit', {
          state: {
            id: data.id,
            data: data,
          }
        });
        break;
      case "Assign to CC":

        setfarmerdata(data);
        setopen(true);
      default:
        break;
    }
  }

  const handleClose = () => {
    setopen(false);
  }



  return (
    <div style={{ margin: "10%" }}>


      <Datatable url={config.getfarmer} handleOptions={handleOptions} flowEvent="farmerEvent" flow="FarmerFlow" header_data={header_data} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Assign to CC
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Please Select one Collection Center</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {ccdata.map((index) => {
                return <FormControlLabel value={index.value} name={index.label} control={<Radio onChange={handleChange} />} label={index.label} />
              })}
            </RadioGroup>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handlesubmit}>Submit</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );

}

export default FarmerList;

