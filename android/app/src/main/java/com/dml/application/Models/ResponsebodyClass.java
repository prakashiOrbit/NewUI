package com.dml.application.Models;


public class ResponsebodyClass{

    public FlowAdmin FlowAdmin;
    public String phoneNumber;
    public String type;

    public ResponsebodyClass( String phoneNumber,String type,FlowAdmin FlowAdmin ) {
           this.FlowAdmin=FlowAdmin;
            this.phoneNumber=phoneNumber;
            this.type=type;
    }

    public FlowAdmin getFlowAdmin() {
        return FlowAdmin;
    }

    public void setFlowAdmin(FlowAdmin FlowAdmin) {
        this.FlowAdmin = FlowAdmin;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public static class FlowAdmin{
        public String ___smart_action___;
        public String ___smart_value___;

        public FlowAdmin(String ___smart_action___, String ___smart_value___) {
            this.___smart_action___ = ___smart_action___;
            this.___smart_value___ = ___smart_value___;
        }

        public String get___smart_action___() {
            return ___smart_action___;
        }

        public void set___smart_action___(String ___smart_action___) {
            this.___smart_action___ = ___smart_action___;
        }

        public String get___smart_value___() {
            return ___smart_value___;
        }

        public void set___smart_value___(String ___smart_value___) {
            this.___smart_value___ = ___smart_value___;
        }
    }


}
