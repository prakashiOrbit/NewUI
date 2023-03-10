import React from "react";
import FormView from "../CreateForm"
import { getApi, postMethod } from "../../webservice";
import SmartConnect from "../smart-connect/smart-connect";
import {config} from "../../Constants/constant";

class CollectionCenter extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {
            functions: this.child,
            handleClick:null,
            handleSearch:null,
            flow:"MasterDataFlow",
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
                        <FormView aev="add" fields={"/Service/MasterData/CollectionCenter.json"} search={"/Service/centerSearch.json"} getApi={getApi} postApi={this.state.functions.current ? this.state.functions.current.handleClick : null} />
                    </>) : (null)
    }
          <SmartConnect server={config.host} port={config.port} tenant={config.tenant} flow="MasterDataFlow" flowEvent="CreateCollectionCenter" ref={this.child} /> 
               
            </div>
        );
    }
}

export default CollectionCenter;
