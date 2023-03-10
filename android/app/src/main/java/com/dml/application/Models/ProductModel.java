package com.dml.application.Models;

public class ProductModel {

    private String ProductId;
    private String ProductName;
    private String Productqty;
    private String ProductPrice;
    private String ProductDisPrice;

    private String ProductDiscription;
    private int ProductImage;


    public ProductModel(String productId, String productName, String productqty, String productPrice, String productDisPrice,String productDiscription, int productImage) {
        ProductId = productId;
        ProductName = productName;
        Productqty = productqty;
        ProductPrice = productPrice;
        ProductDisPrice = productDisPrice;
        ProductDiscription = productDiscription;
        ProductImage = productImage;

    }

    public String getProductId() {
        return ProductId;
    }

    public void setProductId(String productId) {
        ProductId = productId;
    }

    public String getProductName() {
        return ProductName;
    }

    public void setProductName(String productName) {
        ProductName = productName;
    }

    public String getProductqty() {
        return Productqty;
    }

    public void setProductqty(String productqty) {
        Productqty = productqty;
    }

    public String getProductPrice() {
        return ProductPrice;
    }

    public void setProductPrice(String productPrice) {
        ProductPrice = productPrice;
    }

    public String getProductDisPrice() {
        return ProductDisPrice;
    }

    public void setProductDisPrice(String productDisPrice) {
        ProductDisPrice = productDisPrice;
    }

    public int getProductImage() {
        return ProductImage;
    }

    public void setProductImage(int productImage) {
        ProductImage = productImage;
    }


    public String getProductDiscription() {
        return ProductDiscription;
    }

    public void setProductDiscription(String productDiscription) {
        ProductDiscription = productDiscription;
    }
}
