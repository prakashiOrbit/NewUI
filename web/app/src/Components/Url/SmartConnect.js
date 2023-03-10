import axios from 'axios';
import React, { Component } from 'react';

export default class SmartConnect extends Component {
    constructor(props) {
        super(props);
        this.urlbuilder = this.urlbuilder.bind(this);
        this.postMethod = this.postMethod.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
       
    }

    // handleSearch = (url, searchString) => {
    //     var data = JSON.stringify({
    //         "FlowAdmin": {
    //             "___smart_action___": "lookup",
    //             "___smart_value___": "FarmerFlow"
    //         },
    //         "searchString": searchString
    //     });
    //     console.log(data);
    // }

    //     var config = {
    //         method: 'post',
    //         url: url,
    //         headers: {
    //             'Session-Id': id,
    //             'Content-Type': 'application/json'
    //         },
    //         data: data
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    // }

    


    // handleSearch = (url, searchString) => {
    //     console.log("inside handle Search",url,searchString)
    //     var fun = this.authenticate('http://', 'localhost:9082/', 'apptest/', 'Security', 'Authenticate')
    //     //localstorage getitem - store the session in a variable
    //     var id = localStorage.getItem('sessionId', fun)
    //     console.log(id);
    //     var data = JSON.stringify({
    //         "FlowAdmin": {
    //             "___smart_action___": "lookup",
    //             "___smart_value___": "FarmerFlow"
    //         },
    //         "searchString": searchString
    //     });
    //     console.log(data);

    //     var config = {
    //         method: 'post',
    //         url: url,
    //         headers: {
    //             'Session-Id': id,
    //             'Content-Type': 'application/json'
    //         },
    //         data: data
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    // }


        // var data = JSON.stringify({
        //     "FlowAdmin": {
        //         "___smart_action___": "lookup",
        //         "___smart_value___": "FarmerFlow"
        //     },
        //    ...data
        // });

        // var config = {
        //     method: 'post',
        //     url: 'http://localhost:9082/apptest/FarmerFlow/CreateFarmer',
        //     headers: {
        //         'Session-Id': 'e529ce66-e8bb-41b2-839d-2af769bf942f',
        //         'Content-Type': 'application/json'
        //     },
        //     data: data
        // };

        // axios(config)
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })


    handleClick = (url, data) => {
        console.log(url, data, "from handle click");
        this.postMethod({ "FlowAdmin": { "___smart_action___": "lookup", "___smart_value___": this.props.flow }, ...data },
            'http://', 'localhost:9082/', this.props.tenant,this.props.flow, url)
            .then(res=>res.json()
            .then((resp)=>{
             var datalist=(resp.responses[0].message); 
             window.alert(datalist,"------------------list");
           // return datalist;
             }))
    };

    handleSearch = (url, searchString) => {
        console.log(url, searchString, "from handle search click");
        this.postMethod({"FlowAdmin": {"___smart_action___": "lookup","___smart_value___": this.props.flow},"searchString": searchString},
        'http://', 'localhost:9082/', this.props.tenant, this.props.flow, url);
    }

    handleEdit = (url, data) => {
        console.log(url, data, "from handle Edit click");
        this.postMethod(...data,{"FlowAdmin": {"___smart_action___": "lookup","___smart_value___": this.props.flow}},
        'http://', 'localhost:9082/', this.props.tenant, this.props.flow, url);
    }


    urlbuilder(protocol, domain, tenant, object, endpoint) {
        var url = protocol + domain + tenant + object + "/" + endpoint;
        //console.log(url,"url&&&&&&&&&&&&&&&&&&&&&&&&&77")
        return url
    }
    postMethod(payload, protocol, domain, tenant, object, endpoint) {
        console.log(payload, "payload &&&&&&&&&&&&&&&&&&#####################")
        var url = this.urlbuilder(protocol, domain, tenant, object, endpoint);
        //call authenticate function
        var fun = this.authenticate('http://', 'localhost:9082/', 'apptest/', 'Security', 'Authenticate')
        //localstorage getitem - store the session in a variable
        var id = localStorage.getItem('sessionId', fun)
        console.log(id);
        //Pass the variable in the 
        // console.log(payload,"%%%%^^^^^^^^^^^^^^&")
        const req = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Session-Id': id },
            body: JSON.stringify(payload)
        }
        console.log(url, req)
        return new Promise((resolve, reject) => {

            fetch(url, req)
                .then((res) => {
                    resolve(res)
                    console.log(res);
                })
                .catch(err => { reject(err) })
        })
    }

    authenticate(protocol, domain, tenant, object, endpoint) {
        var url = this.urlbuilder(protocol, domain, tenant, object, endpoint);
        var pay = { "identity": "apptestadmin", "password": "apptestadmin", "type": "custom", "FlowAdmin": { "___smart_action___": "lookup", "___smart_value___": "Security" } }
        const req = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pay)
        }
        fetch(url, req)
            .then(res => res.json()
                .then((resp) => {
                    var id = (resp.responses[0].sessionId);
                    console.log(id);
                    localStorage.clear();
                    localStorage.setItem('sessionId', id);
                }))
    };
    render() {
        return (
            <>
            </>
        )
    }
}