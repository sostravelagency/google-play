package com.giang10a1dz.googleplayclone.open3rd;

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CalendarModule"

    @ReactMethod
    fun createCalendarEvent() {
        Log.d("CalendarModule", "Create event called with name")
        Intent launchIntent = getPackageManager().getLaunchIntentForPackage("com.package.address");
        if (launchIntent != null) { 
            startActivity(launchIntent);//null pointer check in case package name was not found
        }
    }
}