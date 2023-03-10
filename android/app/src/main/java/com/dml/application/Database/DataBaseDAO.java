package com.dml.application.Database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import com.dml.application.Database.entities.Product;

import java.util.List;

import static androidx.room.OnConflictStrategy.REPLACE;

@Dao
public interface DataBaseDAO {

    @Insert(onConflict = REPLACE)
    void insert(Product product);

    @Query("SELECT * FROM Product ORDER BY id DESC")
    List<Product> getAllCartFromProduct();

    @Query("UPDATE Product SET ProductNum = :ProductNum WHERE ProductId = :ProductId")
    void Update(String ProductId,String ProductNum);
}
