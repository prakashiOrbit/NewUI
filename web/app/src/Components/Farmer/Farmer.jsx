import React from "react";
import FormView from "../CreateForm"
import { getApi, postMethod } from "../../webservice";
import SmartConnect from "../smart-connect/smart-connect";
import Datatable from "../../Modules/Datatable/datatable";
import {config} from "../../Constants/constant";

class Farmer extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {
            functions: this.child,
            handleClick:null,
            handleSearch:null,
            flow:"FarmerFlow",
            tenant:"apptest/"
        }
        console.log(this.child, "child propss");

       
    }
    componentDidMount(){
        this.setState({
            handleClick:  this.state.functions.current ? this.state.functions.current.handleClick : {} 
        })
        
    }

    render() {
        return (
            <div>
                {
                    this.state.handleClick ? (<>
                        <FormView aev="add" fields={"/Service/farmer.json"} search={"/Service/posearch.json"} getApi={getApi} postApi={this.state.functions.current ? this.state.functions.current.handleClick : null} />
                    </>) : (null)
    }
          <SmartConnect server={config.host} port={config.port} tenant={config.tenant} flow="farmer" flowEvent="farmerEvent" ref={this.child} /> 
                {/* <SmartConnect ref={this.child} flow={this.state.flow} tenant={this.state.tenant}/> */}
             
                {/* <SmartConnect server="localhost" port="9082" tenant="fresh2rely" flow="farmer" flowEvent="farmerEvent" /> */}
            </div>
        );
    }
}

export default Farmer;
