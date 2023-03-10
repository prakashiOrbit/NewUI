import React, { Component } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import FarmerComponent from "./FarmerComponent";
import Container from "@mui/material/Container";
import { postMethod } from "../smart-connect/smart-connect";

import { withRouter } from "./WithRouter";
import SelectClass from "./SelectClass";
import TextFieldClass from "./TextFieldClass";
import DateClass from "./DateClass";
import ButtonClass from "./ButtonClass";
import { validation } from "./Validattion";

import BasicTable from '../BasicTable'

import { getApi} from "../../webservice";

import EnhancedTable from "./DataTable";
//import { Navigate, Outlet, useNavigate } from "react-router-dom";

//import MultipleTextBoxes from "./MultipleTextBoxes";

export class FormView extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showData = this.showData.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.setView = this.setView.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.child = React.createRef();

    //console.log(,this.props.aev"aev propsss");
    const { aev } = this.props.aev;
    
    this.state = {
      inputDetails: {},
      searchInputDetails: {},
      formDetails: {},
      search: "",
      searchBar: {},
      view: aev,
      selected: [],
      isSubmit: "",
      formErrors: {},
    };
  }

  handleEditButton() {
    console.log("from handle button");
    const ress = {};
    const newDescData = this.state.view[0].map((item, index) => {
      ress[this.state.view[0][index].dataAttribute] =
        this.state.view[1][0][index];
    });
    this.setState({
      inputDetails: { ...ress },
    });

    console.log(ress, "from handle button");
    this.props.navigate("/test/edit");
  }

  setView(selectedView) {
    console.log(selectedView, "selected viewww");
    this.setState({
      view: selectedView,
    });
  }
  setSelected(newSelected) {
    const selection = newSelected;
    console.log(selection, "selected");
    this.setState({
      selected: selection,
    });
  }
  showData(url, search) {
    console.log(url, "url :", search, "#########################");

    const valid = false;
    this.state.formDetails.division.formelements.generalDetails.map(
      (item, index) => {
        if (item.validate) {
          if (!this.state.inputDetails[item.id]) {
            console.log(item.id, "validationnnn erre");
          }
        }
      }
    );

    // this.state.formDetails.division.formelements.paymentDetails.map(
    //   (item, index) => {
    //     if (item.validate) {
    //       if (!this.state.inputDetails[item.id]) {
    //         console.log(item.id, "validationnnn erre");
    //       }
    //     }
    //   }
    // );

    console.log("inpuuu",this.state.inputDetails)

    this.props
      .postApi(
        
        this.state.inputDetails
      )
      // .then((resp) => {
      //   // setFormDetails(resp.data)
      //   console.log(resp, "respo from postapi");
      // });
  }
  onChangeSearch(e) {
    console.log(e);
    console.log(this.state.searchInputDetails);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      searchInputDetails: {
        ...this.state.searchInputDetails,
        [name]: value,
      },
    });
  }

  redirectToOtherPage = (button) => {
    const { redirect } = button;

    if (!redirect) return;

    this.history.push(redirect);
  };

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const component =
      this.state.formDetails.division.formelements.generalDetails.filter(
        (item) => {
          if (item.id === name) return item;
        }
      );
    const component1 =
      this.state.formDetails.division.formelements?.paymentDetails?.filter(
        (item) => {
          if (item.id === name) return item;
        }
      );

    //const isValid = validation(value, component[0].item.validate);
    //console.log(validation(value, component[0].validate), "validation");
    console.log(component, "selected comp");

    this.setState({
      inputDetails: {
        ...this.state.inputDetails,
        [name]: value,
      },
    });

    this.setState({
      formErrors: {
        ...this.state.formErrors,
        //[name]: !validation(value, component[0].validate),
      },
    });
    console.log("input in onchange",this.state.inputDetails)
  }
  getData() {
    console.log("component did mount getdata");
    this.props.getApi(this.props.fields).then((resp) => {
      console.log(resp.data);
      this.setState({ formDetails: resp.data });
    });
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevState, "component did update ");
    if (prevState.formDetails !== this.state.formDetails) {
      console.log("State Changed");
      if (this.props.aev !== "add") {
        console.log("edit function", this.props.list);
        this.props
          .getApi(this.props.list)
          .then((resp) => {
            const array = [];
            resp.data.data.map((item, index) => {
              array.push(Object.values(item));
            });
            const newData = {};
            newData.headCells = resp.data.headCells;
            newData.data = array;

            console.log(newData, "converted array");
            this.setState({
              inputDetails: { ...newData },
            });
            if (this.props.aev === "list") {
              this.props
                .getApi(this.props.search)

                .then((resp) => {
                  this.setState({
                    searchBar: resp.data,
                  });

                  console.log(resp, "serach f");
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
  render() {
    return (
      <Container component="main" maxWidth>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box noValidate sx={{ mt: 4 }}>
            {this.props.aev === "list" ? (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {Object.keys(this.state.searchBar).length ? (
                    this.state.searchBar.division.formelements?.map(
                      (item, index) => {
                        return (
                          <div key={index} sitem xs={12} sm={4}>
                            {item.control === "select" ? (
                              <SelectClass
                                formDetails={item}
                                onChange={this.onChangeSearch}
                                inputDetails={this.state.inputDetails}
                                editFlag={this.props.aev}
                              />
                            ) : item.control === "textbox" ? (
                              <TextFieldClass
                                formDetails={item}
                                onChange={this.onChangeSearch}
                                inputDetails={this.state.inputDetails}
                                editFlag={this.props.aev}
                                formErrors={this.state.formErrors}
                              />
                            ) : item.control === "date" ? (
                              <DateClass
                                formDetails={item}
                                onChange={this.onChangeSearch}
                                inputDetails={this.state.inputDetails}
                                editFlag={this.props.aev}
                              />
                            ) : (
                              <>No Data Box</>
                            )}
                          </div>
                        );
                      }
                    )
                  ) : (
                    <div>No Data</div>
                  )}
                  <div>
                    <div>
                      {Object.keys(this.state.searchBar).length ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {this.state.searchBar.division.buttons.map(
                            (button) => (
                              <ButtonClass
                                key={button.id}
                                fun={this.navi}
                                formDetails={button}
                                showData={this.showData}
                                inputDetails={this.state.inputDetails}
                                aev={this.props.aev}
                                search
                              />
                            )
                          )}
                        </div>
                      ) : (
                        <div>No Data</div>
                      )}
                    </div>
                  </div>
                </div>

                <EnhancedTable
                  inputDetails={this.state.inputDetails}
                  selected={this.state.selected}
                  state={this.state}
                  setState={this.setState}
                  setSelected={this.setSelected}
                  setView={this.setView}
                />
              </>
            ) : this.props.aev === "view" ? (
              <div>
                <div>
                  <Grid container spacing={4}>
                    {this.state.view &&
                      [...Array(this.state.view[0].length).keys()].map(
                        (_item, index) => {
                          return (
                            <Grid item xs={12} sm={4}>
                              <div>
                                <h3>{this.state.view[0][index].headerLabel}</h3>
                                <p>{this.state.view[1][0][index]}</p>
                              </div>
                            </Grid>
                          );
                        }
                      )}
                  </Grid>
                </div>
                <Grid container spacing={4}>
                  <Grid xs={3} sm={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 10, mb: 2 }}
                      onClick={this.handleEditButton}
                    >
                      EDIT
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : (
              //function for adding 
              <Grid container spacing={8}>
                {Object.keys(this.state.formDetails).length ? (
                  <>
                  <Grid>
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        display: "block",
                        marginTop: "1px",
                        color: "navy",
                      }}
                    >
                      {this.state.formDetails.division.formelements.title}
                    </span>
                    <Grid
                      container
                      spacing={5}
                      style={{
                        border: "3px solid #ace",
                        padding: "30px",
                        boxSizing: "borderBox",
                        marginTop: "20px",
                      }}
                    >
                      {this.state.formDetails.division.formelements.generalDetails?.map(
                        (item, index) => {
                          return (
                            <Grid key={index} item xs={12} sm={6}>
                              {item.control === "select" ? (
                                <SelectClass
                                  formDetails={item}
                                  onChange={this.onChange}
                                  inputDetails={this.state.inputDetails}
                                  editFlag={this.props.aev}
                                />
                              ) : item.control === "textbox" ? (
                                <TextFieldClass
                                  formDetails={item}
                                  onChange={this.onChange}
                                  inputDetails={this.state.inputDetails}
                                  editFlag={this.props.aev}
                                  formErrors={this.state.formErrors}
                                  labelInside={true}
                                  rows={item.rows?item.rows:1}
                                  minRows={item.minRows?item.minRows : 1}
                                />
                              ) : item.control === "date" ? (
                                <DateClass
                                  formDetails={item}
                                  onChange={this.onChange}
                                  inputDetails={this.state.inputDetails}
                                  editFlag={this.props.aev}
                                />
                              ) : (
                                <span></span>
                              )}

                            

                            </Grid>
                          );
                        }
                      )}

                      
                    </Grid>
                  
                  
                    
                  
                </Grid>
                </>
                ) : (
                  <div>No Data</div>
                )}

                {Object.keys(this.state.formDetails).length && this.state.formDetails.division.formelements.section > 1 ? (
                  <>
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        color: "navy",
                        display: "block",
                        marginTop: "100px",
                      }}
                    >
                      {this.state.formDetails.division.formelements.title1}
                    </span>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        border: "3px solid #ace",
                        padding: "30px",
                        boxSizing: "borderBox",
                        marginTop: "50px",
                      }}
                    >
                      {this.state.formDetails.division.formelements.paymentDetails?.map(
                        (item, index) => {
                          return (
                            <Grid key={index} item xs={4} sm={8}>
                              {item.control === "select" ? (
                                <SelectClass
                                  formDetails={item}
                                  onChange={this.onChange}
                                  inputDetails={this.state.inputDetails}
                                  editFlag={this.props.aev}
                                />
                              ) : item.control === "textbox" ? (
                                <TextFieldClass
                                  formDetails={item}
                                  onChange={this.onChange}
                                  inputDetails={this.state.inputDetails}
                                  editFlag={this.props.aev}
                                  formErrors={this.state.formErrors}
                                  labelInside={true}
                                />
                              ) : item.control === "date" ? (
                                <DateClass
                                  formDetails={item}
                                  onChange={this.onChange}
                                  inputDetails={this.state.inputDetails}
                                  editFlag={this.props.aev}
                                />
                              ) : (
                                <>No Data Box</>
                              )}
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </>
                ) : (
                  <div>No Data</div>
                )}

                  {
                                            Object.keys(this.state.formDetails).length ? (
                                                this.state.formDetails.division.edittable?.map((item, index) => {
                                                    return (
                                                        <Grid key={index} item xs={12} sm={12} >
                                                            <BasicTable formDetails = {this.state.formDetails.division.buttons[0]} tableData={this.state.formDetails.division.edittable} showData={this.showData} getApi={getApi}/>
                                                        </Grid>
                                                    )
                                                })
                                            ) : <div>No Data</div>
                                        }

                {Object.keys(this.state.formDetails).length ? (
                  this.state.formDetails.division.buttons?.map(
                    (item, index) => {
                      return (
                        <Grid key={index} item xs={12} sm={3}>
                          <ButtonClass
                            formDetails={item}
                            showData={this.showData}
                            inputDetails={this.state.inputDetails}
                            aev={this.props.aev}
                          />
                        </Grid>
                      );
                    }
                  )
                ) : (
                  <div>No Data</div>
                )}
               
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    );
  }
}
export default withRouter(FormView);