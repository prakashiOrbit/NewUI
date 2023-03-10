import { debounce } from 'lodash';
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { config } from '../../Constants/constant';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import SmartConnect from '../../Components/smart-connect/smart-connect';
import postMethod from '../service';

const  Datatable = ({url,handleOptions,flow,header_data,flowEvent}) => {
  const [responsive, setResponsive] = useState("vertical");



  const[tableData,settableData]= useState([]);

  const[columndata,setcolumndata]=useState(header_data);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  

  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };

  useEffect(()=>{
    console.log(header_data);
  })

  
  
useEffect(()=>{

  
  const action =   {
    name: "Action",
    options: {
      filter: false,
      sort: false,
      viewColumns:false,
      customBodyRender: (value, rowdata ) => {
        return (<>

            <IconButton 
            onClick={(e)=>{handleClick(e)}}
                >
                <MoreVertIcon/>
            </IconButton>

            <Menu
    id="long-menu"
    MenuListProps={{
      'aria-labelledby': 'long-button',
    }}
    anchorEl={anchorEl}
    open={open}
    onClose={() => {handleClose()}}
    PaperProps={{
      style: {
        maxHeight:  ITEM_HEIGHT  * 4.5,
        width: '20ch',
      },
    }}
  >
    {options.map((option) => (
      <MenuItem key={option}  onClick={()=>{handleClose(rowdata,option)}}>
        {option}
      </MenuItem>
    ))}
  </Menu>


              </>
          
        );
      }
    }
  };
  setcolumndata([...columndata,action]);

  getData("*");
 
},[]);


const getData = async (searchString) =>{
 

 const payload =  {"FlowAdmin": {"___smart_action___": "lookup","___smart_value___": flow},"searchString": searchString}

postMethod(url,payload)
.then((res)=>{
  console.log(res);
  settableData(res?.data?.responses[0]?.farmers);
});



}


  const handleClose = (data,option) => {
    // console.log(option);
    // console.log(data.rowIndex);
    // console.log(data.tableData[data.rowIndex])
    handleOptions(data.tableData[data.rowIndex],option)
    setAnchorEl(null);
  };

  const options = [
    "Edit",
   
    "Assign to CC"
  ];

  const ITEM_HEIGHT = 48;

  const columns = [
    
      {
        "label": "flabel",
        "name": "flabel",
        "control": "textbox",
        "vallabelation": "alphanumeric",
        options:{
          display:false,
          filter:false
       
        }
      },
      {
        "label": "name",
        "name": "name",
        "control": "textbox",
        "vallabelation": "alphanumeric"
      },
      {
        "label": "phoneNo",
        "name": "phoneNo",
        "control": "textbox",
        "vallabelation": "phone"
      },
      {
        "label": "Aadhar No",
        "name": "aadharNo",
        options:{
          display:false,
       
        }
      
      },
      {
        "name": "panNo",
        "label": "pan",
        "control": "textbox",
        "vallabelate": "alphanumeric",
        options:{
          display:false,
       
        }
        
      },
      {
        "label": "Street Address",
        "name": "streetAddress",
        "control": "textbox",
        "vallabelate": "alphanumeric",
        options:{
          display:false,
       
        }
      },
      {
        "label": "City",
        "name": "city",
        "control": "textbox",
        "vallabelate": "alphanumeric",
        options:{
          display:false,
       
        }
      },
      {
        "label": "State",
        "name": "state",
        "control": "textbox",
        "vallabelate": "alphanumeric"
      },
      {
        "label": "Pin Code",
        "name": "pinCode",
        "control": "textbox",
        "vallabelate": "number",
        options:{
          display:false,
       
        }
      },
      {
        "label": "Payee Name",
        "name": "payeeName",
        "control": "textbox",
        "vallabelate": "alphanumeric"
      },
      {
        "label": "Account Number",
        "name": "accountNo",
        "control": "textbox",
        "vallabelate": "number"
      },
      {
        "label": "IFSC  Code",
        "name": "ifscCode",
        "control": "textbox",
        "vallabelate": "number",
        options:{
          display:false,
       
        }
      }
    ,

    {
        name: "Action",
        options: {
          filter: false,
          sort: false,
          viewColumns:false,
          customBodyRender: (value, rowdata ) => {
            return (<>

                <IconButton 
                onClick={handleClick}
                    >
                    <MoreVertIcon/>
                </IconButton>

                <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
         anchorEl={anchorEl}
        open={open}
        onClose={()=>{handleClose(rowdata,option)}}
        PaperProps={{
          style: {
            maxHeight:  ITEM_HEIGHT  * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option}  onClick={()=>{handleClose(rowdata,option)}}>
            {option}
          </MenuItem>
        ))}
      </Menu>


                  </>
              
            );
          }
        }
      },
  ];

  const logValue = debounce((value) => {
    getData(value+"*");
}, 1000);


  const option = {
    search: true,
    download: false,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
   
 

    
    onTableChange: (action, state) => {
        console.log(action);
     if(action==="search"){
        logValue(state.searchText);
         
     }
    }
  };


  return (
    <>
        <MUIDataTable
       
          data={tableData}
          columns={columns}
          options={option}
        />
           {/* <SmartConnect server={config.host} port={config.port} tenant={config.tenant} flow={flow} flowEvent={flowEvent} ref={this.child} /> 
      */}
      </>
  );
}

export default Datatable;
