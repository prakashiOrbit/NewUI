import React from "react";
//import farmerFields from "./farmerFields.js";
//import FormView from "form-create-builder";
import FormView from "../CreateForm"
import { getApi, postMethod } from "../../webservice";
//import SmartConnect from "../Url/SmartConnect";
import SmartConnect from "../smart-connect/smart-connect";
import Datatable from "../../Modules/Datatable/datatable";
//import farmerFields from "./farmerFields.json";
import {config} from "../../Constants/constant";

class Po extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {
            functions: this.child,
            handleClick:null,
            handleSearch:null,
            flow:"PurchaseOrderTemplateFlow",
            tenant:"apptest/"
        }
        console.log(this.child, "child propss");

       
    }
    componentDidMount(){
        this.setState({
            handleClick:  this.state.functions.current ? this.state.functions.current.handleClick : {} 
        })
        // this.child.current.handleSearch();
        //var sc = new SmartConnect();
        
    }

    render() {
        return (
            <div>
                {
                    this.state.handleClick ? (<>
                        <FormView aev="add" fields={"/Service/po.json"} search={"/Service/posearch.json"} getApi={getApi} postApi={this.state.functions.current ? this.state.functions.current.handleClick : null} />
                    </>) : (null)
    }
          <SmartConnect server={config.host} port={config.port} tenant={config.tenant} flow="PurchaseOrderTemplate" flowEvent="PurchaseOrderTemplateEvent" ref={this.child} /> 
                {/* <SmartConnect ref={this.child} flow={this.state.flow} tenant={this.state.tenant}/> */}
             
                {/* <SmartConnect server="localhost" port="9082" tenant="fresh2rely" flow="farmer" flowEvent="farmerEvent" /> */}
            </div>
        );
    }
}

export default Po;
