package com.dml.application.Ui.Fragment;

import android.content.Context;
import android.graphics.Paint;
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
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.dml.application.Database.DataBaseDAO;
import com.dml.application.Database.Roomdatabase;
import com.dml.application.Database.entities.Product;
import com.dml.application.Models.CartModel;
import com.dml.application.R;
import com.google.android.material.button.MaterialButton;

import java.util.List;

public class CartFragment extends Fragment {
    RecyclerView cart_item;
    List<CartModel> cartModels;
    Roomdatabase database;
    DataBaseDAO dataBaseDAO;
    List<Product> productList;



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_cart, container, false);
        database = Roomdatabase.getInstance(getActivity());
        dataBaseDAO = database.dataBaseDAO();
        cart_item = view.findViewById(R.id.cart_item);
       MaterialButton materialButton=(MaterialButton)view.findViewById(R.id.Add_address);
       materialButton.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View view) {
               Address_BookFragment address_bookFragment=new Address_BookFragment();
               FragmentManager fragmentManager=getFragmentManager();
               FragmentTransaction fragmentTransaction=fragmentManager.beginTransaction();
               fragmentTransaction.replace(R.id.frame_layout,address_bookFragment);
               fragmentTransaction.commitNow();
           }
       });

        cart_item.setHasFixedSize(true);
        cart_item.setLayoutManager(new StaggeredGridLayoutManager(1, StaggeredGridLayoutManager.VERTICAL));
        callCart();
        return view;

    }

    private void callCart() {
        productList = dataBaseDAO.getAllCartFromProduct();
        cart_item.setAdapter(new CartAdapter(productList));
    }



    public class CartAdapter  extends RecyclerView.Adapter<CartFragment.CartAdapter.ViewHolder> {
private CartViewInterface cartViewInterface;
        private final List<Product> items;

        public CartAdapter(List<Product> items) {
            this.items = items;
            this.cartViewInterface=cartViewInterface;


        }

        @Override public CartFragment.CartAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.cart_single_row_view, parent, false);
            return new CartFragment.CartAdapter.ViewHolder(v);
        }

        @Override public void onBindViewHolder(CartFragment.CartAdapter.ViewHolder holder, int position) {
            holder.bind(items.get(position));

        }

        @Override public int getItemCount() {
            return items.size();
        }

        class ViewHolder extends RecyclerView.ViewHolder {

            ImageView Cart_image;
            RelativeLayout Plus,Minus;
            TextView Cartproduct_name,Cartproduct_qty,Cartproduct_pricetext,CartProduct_discount,CartqtyNum;
            private Context context;
            RelativeLayout main_layout;

            public ViewHolder(View itemView) {
                super(itemView);
                Cart_image = itemView.findViewById(R.id.Cart_image);
                Cartproduct_name = itemView.findViewById(R.id.Cartproduct_name);
                Cartproduct_qty = itemView.findViewById(R.id.Cartproduct_qty);
                Cartproduct_pricetext = itemView.findViewById(R.id.Cartproduct_price2);
                CartProduct_discount = itemView.findViewById(R.id.CartProduct_discount);
                CartProduct_discount.setPaintFlags(CartProduct_discount.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
                CartqtyNum = itemView.findViewById(R.id.carttxt_qty);
                main_layout = itemView.findViewById(R.id.main_layout);
                Plus = itemView.findViewById(R.id.cartqty_add);
                Minus = itemView.findViewById(R.id.cartqty_min);
                itemView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        cartViewInterface.onItemClick(getAdapterPosition());
                    }
                });


           itemView.setOnLongClickListener(view -> {
//               items.remove(getAdapterPosition());
//               notifyItemRemoved(getAdapterPosition());


               cartViewInterface .onLongItemClick(getAdapterPosition());

               return true;
           });
            }

            public void bind(final Product item) {
                Cartproduct_name.setText(item.getProductName());
                Cartproduct_qty.setText(item.getProductQty());
                Cartproduct_pricetext.setText( item.getProductPrice());
//           ProductPrice.setPaintFlags(item.getProductPrice() );
                CartProduct_discount.setText(item.getProductDis());
                CartqtyNum.setText(item.getProductNum());
                //           ProductImage.setImageResource(item.getProductImage());
//            if (item.getImage() != null) {
//                String Image = item.getImage();
//                Picasso.with(context).load(Image).fit().into(cat_image);
//            }

                main_layout.setOnClickListener(new View.OnClickListener() {
                    @Override public void onClick(View v) {

                    }
                });

                Plus.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        int pn = Integer.parseInt(item.getProductNum()) + 1;
                        dataBaseDAO.Update(item.getProductId(), String.valueOf(pn));
                        callCart();
                    }
                });
                Minus.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        int pn = Integer.parseInt(item.getProductNum()) - 1;
                        dataBaseDAO.Update(item.getProductId(), String.valueOf(pn));

                    }
                });
            }
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