package com.dml.application.App;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

import com.dml.application.R;
import com.google.android.material.button.MaterialButton;

import java.util.HashMap;


public class MydialogFragment extends DialogFragment {


    SessionManager sessionManager;
    @Nullable
    @Override

    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
         super.onCreateView(inflater, container, savedInstanceState);
        View view=  inflater.inflate(R.layout.alertdialog,container,false);
        sessionManager = new SessionManager(getActivity());
        MaterialButton YES= view.findViewById(R.id.yes);
        MaterialButton NO= view.findViewById(R.id.no);
        YES.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sessionManager.setLogin(false);
                sessionManager.setUserDetail("");
                Intent intent = new Intent(Intent.ACTION_MAIN);
                intent.addCategory(Intent.CATEGORY_HOME);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.setFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
               startActivity(intent);
                getDialog().dismiss();

            }
        });
        NO.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                getDialog().dismiss();
            }
        });
        return view;


    }
}
