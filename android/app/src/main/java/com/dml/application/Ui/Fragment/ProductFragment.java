package com.dml.application.Ui.Fragment;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.StaggeredGridLayoutManager;

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import com.dml.application.Adapters.ProductAdapter;
import com.dml.application.App.Loginalertfragment;
import com.dml.application.App.MydialogFragment;
import com.dml.application.App.SessionManager;
import com.dml.application.App.ViewClickListener;
import com.dml.application.Database.DataBaseDAO;
import com.dml.application.Database.Roomdatabase;
import com.dml.application.Database.entities.Product;
import com.dml.application.Models.ProductModel;
import com.dml.application.R;
import com.dml.application.Ui.Activity.LoginActivity;
import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ProductFragment extends Fragment implements ViewClickListener {
    TextView TextCatName;
    int id;
    String KEY;
    SessionManager sessionManager;
    RecyclerView RecyclerviewProductList;
    List<ProductModel> productModels;
    Dialog dialog;
    Roomdatabase database;
    DataBaseDAO dataBaseDAO;
    String flag;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_product, container, false);
        View popupView = LayoutInflater.from(getContext()).inflate(R.layout.login_alert, null);
        PopupWindow popupWindow = new PopupWindow(popupView, LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        sessionManager = new SessionManager(getActivity());
        TextCatName = view.findViewById(R.id.text_catname);
        RecyclerviewProductList = view.findViewById(R.id.recyclerview_productList);
        RecyclerviewProductList.setHasFixedSize(true);
        RecyclerviewProductList.setLayoutManager(new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL));
        database = Roomdatabase.getInstance(getActivity());
        dataBaseDAO = database.dataBaseDAO();

        Bundle bundle = this.getArguments();

        if (bundle != null) {

            KEY = bundle.getString("key");
        }

        TextCatName.setText(KEY);
        id = Integer.parseInt(KEY);
        CallProducts();

        return view;

    }


    private void CallProducts() {
        if (id == 1) {
            productModels = new ArrayList<>();
            productModels.add(new ProductModel("1", "Apple", "7 piece",
                    "Rs.8", "Rs.75", "apple, (Malus domestica), domesticated tree and fruit of the rose family (Rosaceae), one of the most widely cultivated tree fruits. Apples are predominantly grown for sale as fresh fruit, though apples are also used commercially for vinegar, juice, jelly, applesauce, and apple butter and are canned as pie stock", R.drawable.apple));
            productModels.add(new ProductModel("2", "Avocado", "7 piece",
                    "Rs.8", "Rs.75", "An avocado is a bright green fruit with a large pit and dark leathery skin. They're also known as alligator pears or butter fruit. Avocados are a favorite of the produce section. They're the go-to ingredient for guacamole dips", R.drawable.avacado));
            productModels.add(new ProductModel("3", "Banana", "7 piece",
                    "Rs.8", "Rs.75", "A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called \"plantains\", distinguishing them from dessert bananas.", R.drawable.banana));
            productModels.add(new ProductModel("4", "Grapes", "7 piece",
                    "Rs.8", "Rs.75", "Grapes are bulb-shaped fruits. They can be eaten fresh, dried to make raisins, or crushed to make grape juice or wine. There are more than 8,000 varieties of grape. Grapes grow in wooded and warm regions of the world.", R.drawable.grape));
            productModels.add(new ProductModel("5", "Mango", "7 piece",
                    "Rs.8", "Rs.75", "Its form is oval, round, heart-shaped, kidney-shaped, or long and slender. The smallest mangoes are no larger than plums, while others may weigh 1.8 to 2.3 kg (4 to 5 pounds). Some varieties are vividly coloured with shades of red and yellow, while others are dull green.", R.drawable.mango));
            productModels.add(new ProductModel("6", "Orange", "1 KG",
                    "Rs.35", "Rs.25", "The orange is a usually round or oval citrus; its rind and flesh are generally orange, except the varieties of red pulp. The edible part of the orange is the flesh, consumed in fresh or in juice. The orange is also used to make stewed fruit, jams, for consumption as dehydrated fruit, etc.", R.drawable.orange));
            productModels.add(new ProductModel("7", "Papaya", "1 KG",
                    "Rs.35", "Rs.25", "The papaya fruit is slightly sweet, with an agreeable musky tang, which is more pronounced in some varieties and in some climates than in others. It is a popular breakfast fruit in many countries and is also used in salads, pies, sherbets, juices, and confections. The unripe fruit can be cooked like squash.", R.drawable.papaya));

            productModels.add(new ProductModel("8", "Pineapple", "1 KG",
                    "Rs.5", "Rs.25", "A pineapple is a large oval fruit that grows in hot countries. It is sweet, juicy, and yellow inside, and it has a thick brownish skin.", R.drawable.pineapple));
            productModels.add(new ProductModel("9", "Pomegranate", "1 KG",
                    "Rs.35", "Rs.25", "It has rounded fruit with a dry outer covering (husk) made up of two layers: (1) a hard-outer layer called an epicarp, (2) a soft inner layer called a mesocarp. The inner mesocarp has distinct chambers that contain fleshy seeds.", R.drawable.pomegranate));
            productModels.add(new ProductModel("10", "Strawberry", "1 KG",
                    "Rs.35", "Rs.25", "A strawberry is a small red fruit which is soft and juicy and has tiny yellow seeds on its skin", R.drawable.strawberry));
            TextCatName.setText("Fruits");
            RecyclerviewProductList.setAdapter(new ProductAdapter(productModels, this));

        } else if (id == 2) {
            productModels = new ArrayList<>();
            productModels.add(new ProductModel("1", "Beans", "1 KG", "Rs.35",
                    "Rs.25", "A bean is the seed of several plants in the family Fabaceae, which are used as vegetables for human or animal food. They can be cooked in many different ways, including boiling, frying, and baking, and are used in many traditional dishes throughout the world.", R.drawable.beans));
            productModels.add(new ProductModel("2", "Broccoli", "1 KG", "Rs.8",
                    "Rs.5", "Broccoli is a fast-growing annual plant that grows 60–90 cm (24–35 inches) tall. Upright and branching with leathery leaves, broccoli bears dense green clusters of flower buds at the ends of the central axis and the branches", R.drawable.brocoli));
            productModels.add(new ProductModel("3", "Carrot", "1 KG", "Rs.35",
                    "Rs.25", "Carrot: Daucus carota sp. sativus (Hoffm.), (2n = 18) Carrot is a biennial, belonging to the family Apiaceae, and is an important vegetable for its fleshy edible, colorful roots. It varies in colour from white, yellow, orange, light purple, deep red to deep violet.", R.drawable.carrot));
            productModels.add(new ProductModel("4", "Capsicum", "1 KG", "Rs.35",
                    "Rs.25", "Capsicum, also known as red pepper or chili pepper, is an herb. Its fruit is commonly applied to the skin for arthritis pain and other conditions. The fruit of the capsicum plant contains a chemical called capsaicin. Capsaicin is what seems to help reduce pain and swelling.", R.drawable.capcicum));
            productModels.add(new ProductModel("5", "Chilli", "1 KG", "Rs.35",
                    "Rs.25", "Chilli (Capsicum annuum L. and Capsicum frutescens L.) is a hot-tasting tropical berry belonging to the Solanaceae family. It was first discovered by Christopher Columbus in tropical America,2 and its use spread rapidly throughout the world because of its pungent flavour.", R.drawable.chilli));
            productModels.add(new ProductModel("5", "Corriander Leaves", "1 KG", "Rs.35",
                    "Rs.25", "Coriander is native to regions spanning from Southern Europe and Northern Africa to Southwestern Asia. It is a soft plant growing to 50 cm (20 in) tall. The leaves are variable in shape, broadly lobed at the base of the plant, and slender and feathery higher on the flowering stems.", R.drawable.corieanderleaf));
            productModels.add(new ProductModel("6", "Onion", "1 KG", "Rs.35",
                    "Rs.25", "An onion is a round vegetable with a brown skin that grows underground. It has many white layers on its inside which have a strong, sharp smell and taste.", R.drawable.onion));
            productModels.add(new ProductModel("7", "Pumpkin", "1 KG", "Rs.35",
                    "Rs.25", "Pumpkins are often yellowish to orange in colour, and they vary from oblate to globular to oblong; some feature a white rind. The rind is smooth and usually lightly furrowed or ribbed. The fruit stem is hard and woody, ridged, and angled", R.drawable.pumpkin));
            productModels.add(new ProductModel("8+", "Potato", "1 KG", "Rs.35",
                    "Rs.25", "The potato is one of some 150 tuber-bearing species of the genus Solanum (a tuber is the swollen end of an underground stem). The compound leaves are spirally arranged; each leaf is 20–30 cm (about 8–12 inches) long and consists of a terminal leaflet and two to four pairs of leaflets.", R.drawable.tomato));
            productModels.add(new ProductModel("9", "Sweet Corn", "1 KG", "Rs.35",
                    "Rs.25", "dghjsaghda", R.drawable.sweetcorn));
            productModels.add(new ProductModel("10", "Tomato", "1 KG", "Rs.35",
                    "Rs.25", "They are usually red, scarlet, or yellow, though green and purple varieties do exist, and they vary in shape from almost spherical to oval and elongate to pear-shaped. Each fruit contains at least two cells of small seeds surrounded by jellylike pulp.", R.drawable.potato));


            TextCatName.setText("Vegetables");
            RecyclerviewProductList.setAdapter(new ProductAdapter(productModels, this));

        } else {
            productModels = new ArrayList<>();
            productModels.add(new ProductModel("1", "Chicken", "1 KG", "35", "25", "HDHASDSAKD", R.drawable.onion));
            productModels.add(new ProductModel("2", "Mutton", "1 KG", "8", "5", "HHSS", R.drawable.onion));
            productModels.add(new ProductModel("3", "Beef", "1 KG", "35", "25", "BSKJHS", R.drawable.onion));


            TextCatName.setText("Meats and Eggs");
            RecyclerviewProductList.setAdapter(new ProductAdapter(productModels, this));

        }
    }

    @Override
    public void onItemclick(ProductModel item) {
        Bundle bundle = new Bundle();
        bundle.putString("pid", item.getProductId());
        bundle.putString("pname", item.getProductName());
        bundle.putString("pquant", item.getProductqty());
        bundle.putString("pidis", item.getProductDisPrice());
        bundle.putString("proprice", item.getProductPrice());
        bundle.putString("pdiscription", item.getProductDiscription());
        bundle.putString("key", KEY);

        ProductdetailsFragment productdetailsFragment = new ProductdetailsFragment();
        FragmentManager fragmentManager = getFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        productdetailsFragment.setArguments(bundle);
        fragmentTransaction.replace(R.id.frame_layout, productdetailsFragment);
        fragmentTransaction.commitNow();
    }

    @Override
    public void onItemPlusClick(ProductModel item) {

        if (isConnected()) {

            if (sessionManager.getLogin()) {


                HashMap<String, String> user = sessionManager.getuserDetail();
                String phonenumber = user.get(SessionManager.KEY_UserPhoneNumber);

                Product product = new Product(0, phonenumber, item.getProductId(), item.getProductName(), "1", item.getProductPrice(), item.getProductDisPrice(), item.getProductqty());

                dataBaseDAO.insert(product);
                Toast.makeText(getActivity(), "Added to cart", Toast.LENGTH_SHORT).show();

            } else {
                showCustomDialog();
            }


        } else {


            showpopup();
        }
    }

    public boolean isConnected() {
        ConnectivityManager cm = (ConnectivityManager) getActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = cm.getActiveNetworkInfo();
        return (info != null && info.isConnected());
    }

    private void showpopup() {
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

    private void showCustomDialog() {
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
                    HomeFragment homeFragment = new HomeFragment();
                    FragmentManager fragmentManager = getFragmentManager();
                    FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                    fragmentTransaction.replace(R.id.frame_layout, homeFragment);
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

