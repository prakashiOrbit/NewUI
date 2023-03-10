package com.dml.application.Database.entities;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.io.Serializable;

@Entity(tableName = "Product")
public class Product implements Serializable {

    @PrimaryKey(autoGenerate = true)
    int ID = 0;
    @ColumnInfo(name = "Phonenumber")
    String Phonenumber = "";

    @ColumnInfo(name = "ProductId")
    String ProductId = "";

    @ColumnInfo(name = "ProductName")
    String ProductName = "";

    @ColumnInfo(name = "ProductNum")
    String ProductNum = "";


    @ColumnInfo(name = "ProductPrice")
    String ProductPrice = "";

    @ColumnInfo(name = "ProductDis")
    String ProductDis = "";

    @ColumnInfo(name = "ProductQty")
    String ProductQty = "";

    public Product(int ID, String phonenumber, String productId, String productName, String productNum, String productPrice, String productDis, String productQty) {
        this.ID = ID;
        Phonenumber = phonenumber;
        ProductId = productId;
        ProductName = productName;
        ProductNum = productNum;
        ProductPrice = productPrice;
        ProductDis = productDis;
        ProductQty = productQty;
    }

    public Product() {

    }

    public String getPhonenumber() {
        return Phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        Phonenumber = phonenumber;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
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

    public String getProductNum() {
        return ProductNum;
    }

    public void setProductNum(String productNum) {
        ProductNum = productNum;
    }

    public String getProductPrice() {
        return ProductPrice;
    }

    public void setProductPrice(String productPrice) {
        ProductPrice = productPrice;
    }

    public String getProductDis() {
        return ProductDis;
    }

    public void setProductDis(String productDis) {
        ProductDis = productDis;
    }

    public String getProductQty() {
        return ProductQty;
    }

    public void setProductQty(String productQty) {
        ProductQty = productQty;
    }

}
