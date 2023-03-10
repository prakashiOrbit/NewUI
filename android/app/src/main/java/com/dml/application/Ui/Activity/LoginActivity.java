package com.dml.application.Ui.Activity;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.dml.application.App.F2R;
import com.dml.application.App.Loginalertfragment;
import com.dml.application.App.SessionManager;
import com.dml.application.Models.LoginModel;
import com.dml.application.Models.ResponsebodyClass;
import com.dml.application.R;
import com.dml.application.Retrofit.RetrofitClient;
import com.dml.application.Retrofit.ServiceApi;
import com.github.ybq.android.spinkit.SpinKitView;
import com.google.android.material.textfield.TextInputEditText;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class LoginActivity extends AppCompatActivity {

    Button LOGIN;
    String phone_number;
    TextInputEditText userPhoneNumber;

    SpinKitView spin_kit;
    Dialog mydialoge;
    Dialog dialog;
    String OTP;
    private ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        LOGIN = findViewById(R.id.log);
        userPhoneNumber = findViewById(R.id.phonenumber_);

        spin_kit = findViewById(R.id.spin_kit);//progressBar =findViewById(R.id.progress_bar);


        LOGIN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String phonenumber = userPhoneNumber.getText().toString().trim();
                if (!validatePhonenumber()) {


                    return;

                }
                checkUserExist();
            }


        });

  }




    private boolean validatePhonenumber() {
        String val = userPhoneNumber.getText().toString().trim();
        String checkPhonenumber = "^(?=*[0-9])";
        if (val.isEmpty()) {
            userPhoneNumber.setError("Field cannot be empty");
            return false;
        } else if (val.length() != 10) {
            userPhoneNumber.setError("Number must be 10 Digits");
        } else {
            userPhoneNumber.setError(null);

            return true;
        }
        return false;
    }


    private void checkUserExist() {

        if(isConnected()) {


            String sessionId = "23e1ab2b-b9ff-4935-a17a-dc56a686b5ef";

            ResponsebodyClass.FlowAdmin requestBody = new ResponsebodyClass.FlowAdmin("lookup", "ProfileFlow");
            ResponsebodyClass responsebodyClass = new ResponsebodyClass(userPhoneNumber.getText().toString(), "custom", requestBody);

            Log.e("Error", String.valueOf(responsebodyClass));

            spin_kit.setVisibility(View.GONE);

            phone_number = userPhoneNumber.getText().toString();
            RetrofitClient retrofit = new RetrofitClient();
            Retrofit retrofitClient = retrofit.getRetrofitInstance(LoginActivity.this);
            if (retrofitClient == null) {
                return;
            }


            Call<LoginModel> call = retrofitClient.create(ServiceApi.class).LoginToken(sessionId, responsebodyClass);
           call.enqueue(new Callback<LoginModel>() {
               @Override
               public void onResponse(Call<LoginModel> call, Response<LoginModel> response) {
 if (response.isSuccessful()){
     List<LoginModel.Response> responses = response.body().getResponses();
     for (LoginModel.Response r : responses) {
         if (r.getOtp() != null ) {

             String otp = r.getOtp();
             Log.d("LoginActivity", "OTP: " + otp );
             Toast.makeText(LoginActivity.this, otp, Toast.LENGTH_SHORT).show();
             Intent intent = new Intent(getApplicationContext(), OTPActivity.class);
             intent.putExtra("OTP", otp);
             intent.putExtra("phonenumber",phone_number);

             startActivity(intent);

         }
 }


                   }else {
     Toast.makeText(LoginActivity.this, "something went wrong", Toast.LENGTH_SHORT).show();
 }
               }
               @Override
               public void onFailure(Call<LoginModel> call, Throwable t) {
                   Toast.makeText(LoginActivity.this, "something went wrong", Toast.LENGTH_SHORT).show();
               }
           });
         }else {

        Toast.makeText(LoginActivity.this, "not ok", Toast.LENGTH_SHORT).show();

           showpopup();
        }

    }

    private void showpopup() {
            dialog = new Dialog(this);
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
            dialog.setContentView(R.layout.alert_dialog_layout);
        WindowManager.LayoutParams lp = new WindowManager.LayoutParams();
        lp.copyFrom(dialog.getWindow().getAttributes());
        lp.width = WindowManager.LayoutParams.MATCH_PARENT;
        lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();
        dialog.getWindow().setAttributes(lp);
        @SuppressLint("WrongViewCast")
        Button Reload =dialog.findViewById(R.id.Reload);
        Reload.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (isConnected()){
                    dialog.cancel();
                }

            }
        });



    }


    public boolean isConnected(){
        ConnectivityManager cm = (ConnectivityManager) this.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = cm.getActiveNetworkInfo();
        return (info != null && info.isConnected());
    }






}
