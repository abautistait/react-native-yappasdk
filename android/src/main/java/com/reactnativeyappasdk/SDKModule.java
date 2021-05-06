package com.reactnativeyappasdk;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yappa.sdk.YappaSDK;
import com.facebook.react.bridge.Promise;

import java.util.Map;
import java.util.HashMap;

public class SDKModule extends ReactContextBaseJavaModule {

    ReactApplicationContext context;

    SDKModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "Yappasdk";
    }

    @ReactMethod
    public void initialize(String apiKey, String appId) {
       YappaSDK.INSTANCE.initialize("aefab81bcc7b2e83d619b6e8f90a6029", 1, this.context); // Lo primero que se tiene que llamar antes que nada
       YappaSDK.INSTANCE.setAppIcon(33);
    }

    @ReactMethod
    public void setContentId(String contentId) {
       YappaSDK.INSTANCE.setContentId(contentId);
    }

    @ReactMethod
    public void show() {
       YappaSDK.INSTANCE.show();
    }

    @ReactMethod
    public void close() {
       YappaSDK.INSTANCE.close();
    }

    @ReactMethod
    public void setAppId(String appId) {
        // TODO parse string
       // YappaSDK.INSTANCE.setAppId(contentId);
    }

    @ReactMethod
    public void setContentUrl(String contentUrl) {
       YappaSDK.INSTANCE.setContentUrl(contentUrl);
    }

    @ReactMethod
    public void setCallbackScheme(String scheme) {
    }

    @ReactMethod
    public void handleNotification(Promise b) {
         promise.resolve("hello") // TODO check type
    }
}
