package com.dml.application.Ui.Activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.dml.application.Ui.Fragment.CartFragment;
import com.dml.application.Ui.Fragment.FavoriteFragment;
import com.dml.application.Ui.Fragment.HomeFragment;
import com.dml.application.Ui.Fragment.ProfileFragment;
import com.dml.application.R;
import com.etebarian.meowbottomnavigation.MeowBottomNavigation;

public class MainActivity extends AppCompatActivity {
 MeowBottomNavigation bottomNavigation;
    Fragment fragment=null;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

       bottomNavigation=findViewById(R.id.bottm_navigation);
       bottomNavigation.add(new MeowBottomNavigation.Model(1,R.drawable.baseline_home_24));
        bottomNavigation.add(new MeowBottomNavigation.Model(2,R.drawable.baseline_favorite_24));
        bottomNavigation.add(new MeowBottomNavigation.Model(3,R.drawable.ic_baseline_shopping_cart_24));
        bottomNavigation.add(new MeowBottomNavigation.Model(4,R.drawable.baseline_person_24));



bottomNavigation.setOnShowListener(new MeowBottomNavigation.ShowListener() {
    @Override
    public void onShowItem(MeowBottomNavigation.Model item) {

        switch (item.getId()){
            case 1:
                fragment=new HomeFragment();


                break;
            case  2:
                fragment=new FavoriteFragment();
                break;
            case 3:
                fragment=new CartFragment();
                break;
            case 4:
                fragment=new ProfileFragment();
                break;


        }
    loadFragment(fragment);

    }
});

    bottomNavigation.setCount(3,"3");
    bottomNavigation.show(1,true);
    bottomNavigation.setOnClickMenuListener(new MeowBottomNavigation.ClickListener() {
        @Override
        public void onClickItem(MeowBottomNavigation.Model item) {
            Toast.makeText(getApplicationContext()
                    ,"You Clicked"+item.getId()
            ,Toast.LENGTH_SHORT).show();
        }
    });
   bottomNavigation.setOnReselectListener(new MeowBottomNavigation.ReselectListener() {
       @Override
       public void onReselectItem(MeowBottomNavigation.Model item) {
           Toast.makeText(getApplicationContext()
                   ,"You Reselected"+item.getId()
                   ,Toast.LENGTH_SHORT).show();
       }
   });

    }





    private void loadFragment(Fragment fragment) {
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.frame_layout,fragment)
                .commit();
    }



}