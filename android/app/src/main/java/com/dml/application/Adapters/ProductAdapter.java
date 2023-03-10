package com.dml.application.Adapters;

import android.app.AlertDialog;
import android.content.Context;
import android.graphics.Paint;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.dml.application.App.MydialogFragment;
import com.dml.application.App.ViewClickListener;
import com.dml.application.Models.ProductModel;
import com.dml.application.R;

import java.util.List;

public class ProductAdapter  extends RecyclerView.Adapter<ProductAdapter.ViewHolder> {


    private final List<ProductModel> items;
  private ViewClickListener viewClickListener;

    public ProductAdapter(List<ProductModel> items,ViewClickListener viewClickListener) {
        this.items = items;
        this.viewClickListener = viewClickListener;

    }

    @Override public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.product_single_row_view, parent, false);
        return new ViewHolder(v);
    }

    @Override public void onBindViewHolder(ViewHolder holder, int position) {
        holder.bind(items.get(position));

    }

    @Override public int getItemCount() {
        return items.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {

        ImageView ProductImage;
        TextView ProductName,ProductQty,ProductPrice,ProductDisPrice;
        CardView Single_Product;
        ImageView Addto_quantycart;
        private Context context;

        public ViewHolder(View itemView) {
            super(itemView);

            ProductImage = itemView.findViewById(R.id.product_img);
            ProductName = itemView.findViewById(R.id.product_name);
            ProductQty = itemView.findViewById(R.id.product_qty);
            ProductPrice = itemView.findViewById(R.id.product_price);
            ProductDisPrice = itemView.findViewById(R.id.product_dis_price);
            Addto_quantycart=itemView.findViewById(R.id.add_cartquantity);
            ProductDisPrice.setPaintFlags(ProductDisPrice.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
            Single_Product = itemView.findViewById(R.id.single_product);
        }

        public void bind(final ProductModel item) {
            ProductName.setText(item.getProductName());
            ProductQty.setText(item.getProductqty());
           ProductPrice.setText(  item.getProductPrice());
//           ProductPrice.setPaintFlags(item.getProductPrice() );
          ProductDisPrice.setText(item.getProductDisPrice());
           ProductImage.setImageResource(item.getProductImage());
//            if (item.getImage() != null) {
//                String Image = item.getImage();
//                Picasso.with(context).load(Image).fit().into(cat_image);
//            }

            ProductImage.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) {
                    viewClickListener.onItemclick(item);
                }
            });
        Addto_quantycart.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                viewClickListener.onItemPlusClick(item);
            }
        });
        }
    }
}
