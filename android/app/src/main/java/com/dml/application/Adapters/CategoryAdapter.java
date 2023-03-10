package com.dml.application.Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.dml.application.Models.CartModel;
import com.dml.application.R;
import com.squareup.picasso.Picasso;

import java.util.List;

public class CategoryAdapter extends RecyclerView.Adapter<CategoryAdapter.ViewHolder> {

public interface OnItemClickListener {
    void onItemClick(CartModel item);
}

    private final List<CartModel> items;
    private final OnItemClickListener listener;

    public CategoryAdapter(List<CartModel> items, OnItemClickListener listener) {
        this.items = items;
        this.listener = listener;
    }

    @Override public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.cart_single_row_view, parent, false);
        return new ViewHolder(v);
    }

    @Override public void onBindViewHolder(ViewHolder holder, int position) {
        holder.bind(items.get(position), listener);

    }

    @Override public int getItemCount() {
        return items.size();
    }

static class ViewHolder extends RecyclerView.ViewHolder {
    private int ProductId;

    ImageView ProductImage;
    TextView ProductName,ProductQty,ProductPrice,ProductDisPrice;
    private ImageView Product_Image;
    private Context context;

    public ViewHolder(View itemView) {
        super(itemView);
        ProductImage = itemView.findViewById(R.id.Cart_image);
        ProductName = itemView.findViewById(R.id.Cartproduct_name);
        ProductQty = itemView.findViewById(R.id.Cartproduct_qty);
        ProductPrice = itemView.findViewById(R.id.Cartproduct_price2);
        ProductDisPrice = itemView.findViewById(R.id.CartProduct_discount);

    }

    public void bind(final CartModel item, final OnItemClickListener listener) {

        ProductName.setText(item.getProductName());
        ProductQty.setText(item.getProductqty());
        ProductPrice.setText("₹" + item.getProductPrice());
//      ProductPrice.setPaintFlags(item.getProductPrice() );
        ProductDisPrice.setText("₹" + item.getProductDisPrice());
        ProductImage.setImageResource(item.getProductImage());
//        context = Product_Image.getContext();
//        if (item.getProductImage() != null) {
//            int Image = int.valueOf(item.getProductImage());
//            Picasso.with(context).load(Image).fit().into(Product_Image);
//        }

        itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onItemClick(item);
            }


        });
    }
}
}
