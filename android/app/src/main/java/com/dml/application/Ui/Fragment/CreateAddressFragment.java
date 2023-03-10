package com.dml.application.Ui.Fragment;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.RecyclerView;

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.dml.application.R;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.places.Place;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.libraries.places.api.Places;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class CreateAddressFragment extends Fragment {
    private static final int GPS_CODE = 9001;
    TextView Recipemt_Nmae, Phone_Number, Houseno, Street, Landmark;
    MaterialButton SaveADDRESS;
    RecyclerView Street_View, Landmark_View;
    TextView AddName;

    private Geocoder mGeocoder;

    private boolean GPS_enable = false;
    private boolean network_enable = false;
    String lat, lng;
    String flag;
    Geocoder geocoder;
    List<android.location.Address> myaddresses;

    private static final int REQUEST_LOCATION_PERMISSION_CODE = 1;
    private FusedLocationProviderClient mFusedLocationClient;


    @SuppressLint("MissingInflatedId")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_create_address, container, false);

        Recipemt_Nmae = view.findViewById(R.id.Recipent_Textname);

        Houseno = view.findViewById(R.id.house_Textname);
        Landmark = view.findViewById(R.id.Landmark_Textname);
        Street = view.findViewById(R.id.Street_textname);
        SaveADDRESS = view.findViewById(R.id.save_address);
        AddName = view.findViewById(R.id.Select_addresstype);
        Street_View = view.findViewById(R.id.Street_recycler);
        Landmark_View = view.findViewById(R.id.landmark_recycler);


        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(getActivity());
        mGeocoder = new Geocoder(getActivity(), Locale.getDefault());

        if (ContextCompat.checkSelfPermission(getActivity(), Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    REQUEST_LOCATION_PERMISSION_CODE);
        } else {
            getCurrentAddress();
        }
        SaveADDRESS.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!validateFullName() | !validateHouseName() | !validateLandMark() | !vlidateSterret()) {
                    return;


                }

                PaymentFragment paymentFragment = new PaymentFragment();
                FragmentManager fragmentManager = getFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.frame_layout, paymentFragment);
                fragmentTransaction.commitNow();

            }
        });





        return view;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        if (requestCode == REQUEST_LOCATION_PERMISSION_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                getCurrentAddress();
            }
        }
    }

    @SuppressLint("MissingPermission")
    private void getCurrentAddress() {
        mFusedLocationClient.getLastLocation().addOnCompleteListener(getActivity(), new OnCompleteListener<Location>() {
            @Override
            public void onComplete(@NonNull Task<Location> task) {
                if (task.isSuccessful() && task.getResult() != null) {
                    Location location = task.getResult();
                    try {
                        List<Address> addresses = mGeocoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
                        if (addresses.size() > 0) {
                            Address address = addresses.get(0);
                            String street = address.getSubLocality();
                            String landmark = address.getLocality();
                            String city = address.getPostalCode();
                            String country = address.getCountryName();
                            Street.setText(street);
                            Landmark.setText(landmark);

                            // do something with the address
                        } else {
                            // handle failure
                        }
                    } catch (IOException e) {
                        // handle failure
                    }
                } else {
                    // handle failure
                }
            }
        });
    }

    private boolean validateFullName() {
        String val = Recipemt_Nmae.getText().toString().trim();
        if (val.isEmpty()) {
            Recipemt_Nmae.setError("Field cannot be empty");
            return false;
        } else {
            Recipemt_Nmae.setError(null);
            return true;

        }
    }
//    private Boolean validatePhoneNo() {
//        String val = Phone_Number.getText().toString();
//        if (val.isEmpty()) {
//            Phone_Number.setError("Field cannot be empty");
//            return false;
//        }else if(val.length()<10){
//            Phone_Number.setError("Please enter valid number");
//            return false;
//        }
//        else {
//            Phone_Number.setError(null);
//            return true;
//        }
//    }

    private boolean validateHouseName() {
        String val = Houseno.getText().toString().trim();
        if (val.isEmpty()) {
            Houseno.setError("Field cannot be empty");
            return false;
        } else {
            Houseno.setError(null);
            return true;
        }
    }

    private boolean vlidateSterret() {
        String val = Street.getText().toString().trim();
        if (val.isEmpty()) {
            Street.setError("Field cannot be empty");
            return false;
        } else {
            Street.setError(null);

            return true;
        }
    }

    private boolean validateLandMark() {
        String val = Landmark.getText().toString().trim();
        if (val.isEmpty()) {
            Landmark.setError("Field cannot be empty");
            return false;
        } else {
            Landmark.setError(null);

            return true;
        }
    }

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
                    Location_confirmationFragment location_confirmationFragment = new Location_confirmationFragment();
                    FragmentManager fragmentManager = getFragmentManager();
                    FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                    fragmentTransaction.replace(R.id.frame_layout, location_confirmationFragment);
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






