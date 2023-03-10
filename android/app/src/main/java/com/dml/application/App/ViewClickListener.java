package com.dml.application.App;

import com.dml.application.Models.ProductModel;

public interface ViewClickListener {
    void onItemclick(ProductModel productModel);
    void onItemPlusClick(ProductModel productModel);
}
