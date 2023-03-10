package com.dml.application.Ui.Fragment;

import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;

import androidx.activity.OnBackPressedCallback;
import androidx.activity.OnBackPressedDispatcher;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.dml.application.App.MydialogFragment;
import com.dml.application.R;
import com.google.android.material.button.MaterialButton;

public class HomeFragment extends Fragment {

    LinearLayout Veg_layout, LayoutFruit, LayoutMeat;

    @Override
    public void onResume() {
        super.onResume();

        if (getView() == null) {
            return;
        }

        getView().setFocusableInTouchMode(true);
        getView().requestFocus();
        getView().setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View view, int i, KeyEvent keyEvent) {


                if (keyEvent.getAction() == KeyEvent.ACTION_UP && i == KeyEvent.KEYCODE_BACK) {


                    MydialogFragment mydialogFragment = new MydialogFragment();
                    mydialogFragment.show(getFragmentManager(), "myFragment");

                    return true;
                }
                return false;
            }


        });

    }


    @Override

    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        Veg_layout = view.findViewById(R.id.layout_veg);
        LayoutFruit = view.findViewById(R.id.layout_fruit);
//        LayoutMeat = view.findViewById(R.id.layout_meat);

        callCategory();

        return view;

    }


    private void callCategory() {

        LayoutFruit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Bundle bundle = new Bundle();
                bundle.putString("key", "1");

                ProductFragment productFragment = new ProductFragment();
                FragmentManager fragmentManager = getFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                productFragment.setArguments(bundle);

                fragmentTransaction.replace(R.id.frame_layout, productFragment);
                // Remove the fragment

                fragmentTransaction.commitNow();


            }
        });

        Veg_layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Bundle bundle = new Bundle();
                bundle.putString("key", "2");

                ProductFragment productFragment = new ProductFragment();
                FragmentManager fragmentManager = getFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                productFragment.setArguments(bundle);
                fragmentTransaction.replace(R.id.frame_layout, productFragment);
                fragmentTransaction.commitNow();

            }
        });


    }


}
