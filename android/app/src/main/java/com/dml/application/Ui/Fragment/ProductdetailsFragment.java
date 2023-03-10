package com.dml.application.Ui.Fragment;

import static android.view.View.*;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.drawable.ColorDrawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;

import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.dml.application.App.Loginalertfragment;
import com.dml.application.App.SessionManager;
import com.dml.application.Database.DataBaseDAO;
import com.dml.application.Database.Roomdatabase;
import com.dml.application.Database.entities.Product;
import com.dml.application.R;
import com.dml.application.Ui.Activity.LoginActivity;
import com.google.android.material.button.MaterialButton;

import java.util.HashMap;

public class ProductdetailsFragment extends Fragment {

    TextView Product_Name, Product_Quantity, Product_Discription, Product_Rate, Product_Disount;
    MaterialButton ADD_tocart;
    String ProductName, ProductPrice, ProductQty, ProductDis, ProductId, ProductDiscription, KEY;
    Dialog dialog;
    Roomdatabase database;
    DataBaseDAO dataBaseDAO;
    Bundle bundle;
    String flag;
    SessionManager sessionManager;

    @SuppressLint("MissingInflatedId")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {


        View view = inflater.inflate(R.layout.fragment_productdetails, container, false);
        Product_Name = view.findViewById(R.id.product_name);
        Product_Quantity = view.findViewById(R.id.product_qty);
        Product_Rate = view.findViewById(R.id.product_price);
        ADD_tocart = view.findViewById(R.id.add_tocart);
        sessionManager = new SessionManager(getActivity());
        Product_Discription = view.findViewById(R.id.product_Discription);
        Product_Disount = view.findViewById(R.id.pdproduct_discount);

        // initview();
        bundle = this.getArguments();
        if (bundle != null) {
            ProductId = bundle.getString("pid");
            ProductName = bundle.getString("pname");
            ProductQty = bundle.getString("pquant");
            ProductDis = bundle.getString("pidis");
            ProductPrice = bundle.getString("proprice");
            ProductDiscription = bundle.getString("pdiscription");
            KEY = bundle.getString("key");
            int a = Integer.parseInt(KEY);

        }
        Product_Name.setText(ProductName);
        Product_Quantity.setText(ProductQty);
        Product_Discription.setText(ProductDis);
        Product_Rate.setText(ProductPrice);
        Product_Disount.setText(ProductDis);
        Product_Disount.setPaintFlags(Product_Disount.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
        Product_Discription.setText(ProductDiscription);
        database = Roomdatabase.getInstance(getActivity());
        dataBaseDAO = database.dataBaseDAO();


        ADD_tocart.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View view) {
                if (isConnected()) {
                    if (sessionManager.getLogin()) {


                        HashMap<String, String> user = sessionManager.getuserDetail();
                        String phonenumber = user.get(SessionManager.KEY_UserPhoneNumber);

                        Product product = new Product(0, phonenumber,ProductId, ProductName, "1", ProductPrice, ProductDis, ProductQty);
                        dataBaseDAO.insert(product);
                        Toast.makeText(getActivity(), "Added to cart", Toast.LENGTH_SHORT).show();


                    }else {
                        showCustomDialog();
                    }


                    } else {
                        Toast.makeText(getActivity(), "Not OK", Toast.LENGTH_SHORT).show();

                        showpopup();
                    }
                }
            });


        return view;


        }


        public boolean isConnected () {
            ConnectivityManager cm = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo info = cm.getActiveNetworkInfo();
            return (info != null && info.isConnected());
        }


        private void showpopup () {
            dialog = new Dialog(getActivity());
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
            Button Reload = dialog.findViewById(R.id.Reload);
            Reload.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    if (isConnected()) {
                        dialog.cancel();
                    }

                }
            });


        }


        private void showCustomDialog () {
            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

            View view = getLayoutInflater().inflate(R.layout.login_alert, null);

            MaterialButton YES = view.findViewById(R.id.Continue);
            MaterialButton NO = view.findViewById(R.id.cancel);

            builder.setView(view);
            AlertDialog dialog = builder.create();
            YES.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(getActivity(), LoginActivity.class);
                    startActivity(intent);
                    dialog.cancel();


                }
            });
            NO.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    dialog.cancel();
                }

            });

            dialog.show();

        }
        @Override
        public void onResume () {
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
                        ProductFragment productFragment = new ProductFragment();
                        FragmentManager fragmentManager = getFragmentManager();
                        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                        productFragment.setArguments(bundle);
                        fragmentTransaction.replace(R.id.frame_layout, productFragment);
                        // Remove the fragment

                        fragmentTransaction.commitNow();

//                    ShowDialog();


                        return true;
                    }
                    return false;
                }


            });

        }
    }



