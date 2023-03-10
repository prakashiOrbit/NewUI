import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ButtonClass from "../Components/CreateForm/ButtonClass";
import TextFieldClass from "../Components/CreateForm/TextFieldClass";
import CustomTextField from "./Textfield";
import { validation } from "../Components/CreateForm/Validattion";

const EditComponent = ({formDetails,rowdata,onSubmit,type}) =>{
const [formdata,setformdata]= useState(rowdata?rowdata:{});
const [validationError, setValidationError] = useState(null);

const validateInput = (inputValue) => {
  if (inputValue === "") {
    setValidationError("This field is required.");
  } else {
    setValidationError(null);
  }
};
const onClick = (e) =>{
    onSubmit(e.target.name , formdata);
    
}

const onChange =(e) =>{
    let id = e.target.id;
    let value = e.target.value;

    setformdata({...formdata ,[id] : value});
}

useEffect(()=>{
console.log(formdata);
},[formdata])
    return(
        <div style={{margin:"12%"}}>
        <Grid container spacing={8}>
                {Object.keys(formDetails).length ? (
                  <Grid>
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        display: "block",
                        marginTop: "40px",
                        color: "navy",
                      }}
                    >
                      {formDetails.division.formelements.title}
                    </span>
                    <Grid
                      container
                      spacing={5}
                      style={{
                        border:
                         formDetails.division.formelements.title ===
                          "GENERAL DETAILS"
                            ? "none"
                            : "3px solid #ace",
                        padding: "30px",
                        boxSizing: "borderBox",
                        marginTop: "25px",
                      }}
                    >
                      {formDetails.division.formelements.generalDetails?.map(
                        (item, index) => {
                          return (
                            <Grid key={index} item xs={12} sm={6}>
                             
                               {  item.control === "textbox" ? (
                                <CustomTextField
                                 value={rowdata?.[item.label]}
                                  onChange={onChange}
                                  label={item.label}
                                  required={validation}
                                  
                                />
                              ) : (
                                <>No Data Box</>
                              )}
                            </Grid>
                          );
                        }
                      )}

                      
                    </Grid>
                  </Grid>
                ) : (
                  <div>No Data</div>
                )}
                {Object.keys(formDetails).length ? (
                  <Grid>
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        display: "block",
                        marginTop: "30px",
                        color: "navy",
                      }}
                    >
                      {formDetails.division.formelements.title2}
                    </span>
                    <Grid
                      container
                      spacing={5}
                      style={{
                        border:
                         formDetails.division.formelements.title ===
                          "ADDRESS DETAILS"
                            ? "none"
                            : "3px solid #ace",
                        padding: "30px",
                        boxSizing: "borderBox",
                        marginTop: "20px",
                      }}
                    >
                      {formDetails.division.formelements.addressDetails?.map(
                        (item, index) => {
                          return (
                            <Grid key={index} item xs={12} sm={6}>
                             
                               {  item.control === "textbox" ? (
                                <CustomTextField
                                 value={rowdata?.[item.label]}
                                  onChange={onChange}
                                  label={item.label}
                                  required={validation}
                                  
                                />
                              ) : (
                                <>No Data Box</>
                              )}
                            </Grid>
                          );
                        }
                      )}

                      
                    </Grid>
                  </Grid>
                ) : (
                  <div>No Data</div>
                )}

{Object.keys(formDetails).length ? (
                  <Grid>
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        display: "block",
                        marginTop: "30px",
                        color: "navy",
                      }}
                    >
                      {formDetails.division.formelements.title1}
                    </span>
                    <Grid
                      container
                      spacing={5}
                      style={{
                        border:
                         formDetails.division.formelements.title ===
                          "PAYMENT DETAILS"
                            ? "none"
                            : "3px solid #ace",
                        padding: "30px",
                        boxSizing: "borderBox",
                        marginTop: "20px",
                      }}
                    >
                      {formDetails.division.formelements.paymentDetails?.map(
                        (item, index) => {
                          return (
                            <Grid key={index} item xs={12} sm={6}>
                             
                               {  item.control === "textbox" ? (
                                <CustomTextField
                                 value={rowdata?.[item.label]}
                                  onChange={onChange}
                                  label={item.label}
                                  required={validation}
                                  
                                />
                              ) : (
                                <>No Data Box</>
                              )}
                            </Grid>
                          );
                        }
                      )}

                      
                    </Grid>
                  </Grid>
                ) : (
                  <div>No Data</div>
                )}
                

               
                        <Grid>
                        <Button style={{marginRight:"10px", marginTop: "30px"}} variant="contained" name="submit" onClick={onClick}>{type=="edit"?"Save":"Add"}</Button>
                        <Button style={{marginRight:"10px", marginTop: "30px"}} variant="contained" onClick={onClick} name="cancel">Cancel</Button>
                
                        </Grid>
               
              </Grid>
              </div>
    )
}
export default EditComponent;