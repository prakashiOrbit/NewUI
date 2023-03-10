package com.dml.application.Ui.Activity;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.chaos.view.PinView;
import com.dml.application.App.SessionManager;
import com.dml.application.R;
import com.dml.application.Ui.Fragment.HomeFragment;
import com.google.android.material.button.MaterialButton;

public class OTPActivity extends AppCompatActivity {
    MaterialButton VeryFy;
    SessionManager sessionManager;
    String Otp,Phonenumber;
    PinView pinView;
    TextView otp_text2,text2;
    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_otpactivity);
        VeryFy=findViewById(R.id.btn_Verify);
        otp_text2=findViewById(R.id.otp_text2);
        text2=findViewById(R.id.text2);
        sessionManager = new SessionManager(getApplicationContext());
       pinView=findViewById(R.id.pin_view);
        Otp = getIntent().getStringExtra("OTP");
        Phonenumber=getIntent().getStringExtra("phonenumber");


        new CountDownTimer(120000, 1000) {

            public void onTick(long millisUntilFinished) {
                int minutes = (int) millisUntilFinished / 60000;
                int seconds = (int) (millisUntilFinished % 60000) / 1000;
                String timeLeftFormatted = String.format("%02d:%02d", minutes, seconds);
                text2.setText(timeLeftFormatted);
            }

            public void onFinish() {
                text2.setText("00:00"); // Reset to 2:00
                // Add any action to perform when the timer finishes
            }
        }.start();

        VeryFy.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                if (!validateOtp()) {


                    if (pinView.getText().toString().equals(Otp)) {
                        otp_text2.setVisibility(View.GONE);
                        sessionManager.setLogin(true);
                        sessionManager.setUserDetail(Phonenumber);
                        Toast.makeText(OTPActivity.this, "Otp", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                        intent.putExtra("key", "1");

                        startActivity(intent);
                        finish();
                    } 

                }

            }
        });
    }

    private boolean validateOtp() {
        String val = pinView.getText().toString().trim();

        if (val.isEmpty()) {
            pinView.setError("Field cannot be empty");
            return false;
        } else if (val.length() != 4) {
            pinView.setError("OTP must be 4 Digits");
        } else if (!val.equals(Otp)) {
            otp_text2.setVisibility(View.VISIBLE);
            pinView.setError("Invalid OTP");
            return true;
        }
        return false;
    }
    }


