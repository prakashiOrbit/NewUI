package com.dml.application.Retrofit;

import com.dml.application.Models.LoginModel;
import com.dml.application.Models.ResponsebodyClass;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ServiceApi {


    @POST("ProfileFlow/CreateProfile")
    Call<LoginModel> LoginToken(@Header("Session-Id")String sessionId, @Body ResponsebodyClass requestBody );

}
