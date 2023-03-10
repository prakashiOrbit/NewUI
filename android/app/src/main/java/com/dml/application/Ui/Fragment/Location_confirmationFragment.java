package com.dml.application.Ui.Fragment;

import android.Manifest;
import android.annotation.SuppressLint;
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

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.dml.application.R;
import com.dml.application.Ui.Fragment.CreateAddressFragment;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.button.MaterialButton;

import java.io.IOException;
import java.util.List;
import java.util.Locale;


public class Location_confirmationFragment extends Fragment {
    private static final int GPS_CODE = 9001;
    TextView Address1, Address2, Address3;
    MaterialButton Confirm_continew;
    private Geocoder mGeocoder;
    String lat, lng;
    String flag;
    Geocoder geocoder;
    List<Address> myaddresses;
    private boolean GPS_enable = false;
    private boolean network_enable = false;
    List<android.location.Address> mylocationaddresses;

    private static final int REQUEST_LOCATION_PERMISSION_CODE = 1;
    private FusedLocationProviderClient mFusedLocationClient;

    @SuppressLint("MissingInflatedId")
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_location_confirmation, container, false);
        Address1 = view.findViewById(R.id.textadd_1);
        Address2 = view.findViewById(R.id.textadd_2);
        Address3 = view.findViewById(R.id.textadd_3);
        Confirm_continew = view.findViewById(R.id.confirm_address);

        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(getActivity());
        mGeocoder = new Geocoder(getActivity(), Locale.getDefault());

        if (ContextCompat.checkSelfPermission(getActivity(), Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    REQUEST_LOCATION_PERMISSION_CODE);
        } else {
            getCurrentAddress();
        }
        Confirm_continew.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                CreateAddressFragment createAddressFragment=new CreateAddressFragment();
                FragmentManager fragmentManager=getFragmentManager();
                FragmentTransaction fragmentTransaction=fragmentManager.beginTransaction();
                fragmentTransaction.replace(R.id.frame_layout,createAddressFragment);
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
                            String bulding = address.getSubAdminArea();
                            String country = address.getCountryName();
                            Address1.setText(bulding);
                            Address2.setText(street);
                            Address3.setText(landmark);

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
                    Address_BookFragment address_bookFragment = new Address_BookFragment();
                    FragmentManager fragmentManager = getFragmentManager();
                    FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                    fragmentTransaction.replace(R.id.frame_layout, address_bookFragment);
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