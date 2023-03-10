package com.dml.application.Models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;


public class LoginModel {
    public ArrayList<Response> responses;

    public ArrayList<Response> getResponses() {
        return responses;
    }

    public void setResponses(ArrayList<Response> responses) {
        this.responses = responses;
    }

    public static class Response {
        private String otp;
        private String message;
        private String smartResponseId;

        public String getOtp() {
            return otp;
        }

        public void setOtp(String otp) {
            this.otp = otp;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getSmartResponseId() {
            return smartResponseId;
        }

        public void setSmartResponseId(String smartResponseId) {
            this.smartResponseId = smartResponseId;
        }
    }

}



