

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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import postMethod, { getMethod } from "../../Modules/service";
import { config } from "../../Constants/constant";


const CollectionCenterList = () => {

  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [ccdata, setccdata] = useState([{ name: "check", label: "check" }]);
  const [centerdata, setcenterdata] = useState({});



  useEffect(() => {
    getCcList();
  }, [])


  const handleChange = (e) => {

    var name = e.target.name;
    var value = e.target.value;

    setcenterdata({ ...centerdata, "centerId": value, "centerName": name })


  }




  const getCcList = () => {



    const payloaddata = {
      "FlowAdmin": {
        "___smart_action___": "lookup",
        "___smart_value___": "MasterDataFlow"
      },
      "searchString": "*"
    };


    postMethod(config.getCollectionCenter, payloaddata)
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

    console.log(centerdata);
    const sendpayload = {
      ...centerdata, "CollectionCenter": {
        "___smart_action___": "lookup",
        "___smart_value___": centerdata.centerId
      }
    }

    postMethod(config.editCollectionCenter, sendpayload)
      .then((res) => {
        console.log(res.data.responses[0].message);
        if (res.data.responses[0].message == "CollectionCeter details has been updated.") {

          navigate("/centerList")
        }


      });
      setopen(false);


  }


  const handleOptions = (data, option) => {
    console.log(option);
    console.log(data)
    switch (option) {
      case "Edit":

        navigate('/center-edit', {
          state: {
            id: data.id,
            data: data,
          }
        });
        break;
      case "Assign to CC":

        setcenterdata(data);
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


      <Datatable url={config.getCollectionCenter} handleOptions={handleOptions} flowEvent="CollectionCenterEvent" flow="MasterDataFlow" header_data={header_data} />

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

export default CollectionCenterList;

