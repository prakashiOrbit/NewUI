package com.dml.application.Database;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.dml.application.Database.entities.Product;


@Database(entities = Product.class, version = 1, exportSchema = false)
public abstract class Roomdatabase extends RoomDatabase {

    private static Roomdatabase database;
    private static String DATABASE_NAME = "TEST";

    public synchronized static Roomdatabase getInstance(Context context){
        if(database == null){
            database = Room.databaseBuilder(context.getApplicationContext(),
                    Roomdatabase.class,DATABASE_NAME)
                    .allowMainThreadQueries()
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return database;
    }

    public abstract DataBaseDAO dataBaseDAO();
}
