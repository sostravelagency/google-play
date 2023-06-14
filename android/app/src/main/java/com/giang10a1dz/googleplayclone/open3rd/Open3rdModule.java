package com.giang10a1dz.googleplayclone.open3rd;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class Open3rdModule extends ReactContextBaseJavaModule {
    Open3rdModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "Open3rdModule";
    }

    @ReactMethod
    public void openApp(String name) {
        Log.d("CalendarModule", "Create event called with name: 11111111111111"+ name);
        Intent launchIntent = getReactApplicationContext().getPackageManager().getLaunchIntentForPackage(name);
        Log.d("CalendarModule", "Create event called with name: 11111111111111" + launchIntent);
        if (launchIntent != null) {
            getReactApplicationContext().startActivity(launchIntent);
        }
    }
}