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
import com.dml.application.Ui.Activity.LoginActivity;
import com.google.android.material.button.MaterialButton;

public class Loginalertfragment extends DialogFragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        super.onCreateView(inflater, container, savedInstanceState);
        View view=  inflater.inflate(R.layout.login_alert,container,false);

        MaterialButton YES= view.findViewById(R.id.Continue);
        MaterialButton NO= view.findViewById(R.id.cancel);
        YES.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(),LoginActivity.class);
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
