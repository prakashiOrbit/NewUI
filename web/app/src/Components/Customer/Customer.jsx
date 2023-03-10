import React from "react";

import FormView from "../CreateForm";
import { getApi, postMethod } from "../../webservice";
import SmartConnect from "../Url/SmartConnect";

//import farmerFields from "./farmerFields.json";

class Customer extends React.Component {
  //   fields = "./Service/po.json";
  //   farmerFields = "./Service/farmer.json";
  constructor(props) {
    super(props);
    this.child = React.createRef();

    this.state = {
      functions: this.child,
      handleClick: null,
    };
    console.log(this.child, "child propss");
  }
  componentDidMount() {
    this.setState({
      handleClick: this.state.functions.current
        ? this.state.functions.current.handleClick
        : {},
    });
  }

  render() {
    return (
      <div>
        {this.state.handleClick ? (
          <>
            <FormView
              aev="add"
              fields={"/Service/customer.json"}
              search={"/Service/CustomerSearch.json"}
              getApi={getApi}
              postApi={
                this.state.functions.current
                  ? this.state.functions.current.handleClick
                  : null
              }
            />
          </>
        ) : null}
        <SmartConnect ref={this.child} />
      </div>
    );
  }
}

export default Customer;
