import React, { useState, useEffect } from "react";
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import axios from "axios";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };



const BasicTable = ({formDetails, tableData, showData, getApi}) => {
  
  console.log("datee",tableData)
  const  farmerdata  = tableData;

  

  console.log("taaa",farmerdata)
  const [gridData, setGridData] = useState({
    
  });

  const [dataurl, setDataurl] = useState(tableData[0].dataurl);

  const [title, setTitle] = useState(tableData[0].label);
  

  useEffect(() => {   
    const data = formDetails.submitURL ? () => showData(formDetails.submitURL,false) : ''

    
       
    axios.get(dataurl).then((resp) => {  
      //setValue(resp.data.submitURL)   
      console.log("checkkeee axioo",resp.data.submitURL)
      //showData(resp.data.submitURL,{"searchString":"Mohan"} )
      setGridData({
        data: resp.data.data,
        columns: resp.data.headCells,
        resolve: () => {},
        updatedAt: new Date() 
      })
    });

    
  //gridData.resolve();
  
}, []);



  const onRowAdd = newData =>
    new Promise((resolve, reject) => {     
      const data = [...gridData.data];
      showData(formDetails.submitURL, newData)
      data.push(newData);
      const updatedAt = new Date();
      setGridData({ ...gridData, data, updatedAt, resolve });
      
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      // Copy current state data to a new array
      const data = [...gridData.data];
      // Get edited row index
      const index = data.indexOf(oldData);
      // replace old data
      data[index] = newData;
      // update state with the new array
      const updatedAt = new Date();
      showData(formDetails.submitURL, newData)
      setGridData({ ...gridData, data, updatedAt, resolve });
    });

  const onRowDelete = oldData =>
    new Promise((resolve, reject) => {
      let data = [...gridData.data];
      const index = data.indexOf(oldData);
      data.splice(index, 1);
      const updatedAt = new Date();
      setGridData({ ...gridData, data, updatedAt, resolve });
    });

    const defaultMaterialTheme = createTheme();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
    <MaterialTable
      title={title}
      icons={tableIcons}
      columns={gridData.columns}
      data={gridData.data}
      editable={{
        isEditable: rowData => true,
        isDeletable: rowData => true,
        onRowAdd: onRowAdd,
        onRowUpdate: onRowUpdate,
        onRowDelete: onRowDelete
      }}
    />
    </ThemeProvider>
  );
};

export default BasicTable;