package com.reactnativeyappasdk;

import android.app.Notification;
import android.app.PendingIntent;
import android.content.Intent;
import android.media.RingtoneManager;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableType;
import com.yappa.sdk.YappaSDK;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.yappa.sdk.ui.MainNavigationActivity;

import java.util.Hashtable;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

import kotlin.Unit;
import kotlin.jvm.functions.Function2;

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
  public void setFCMToken(String token) {
    if (!token.isEmpty()) {
      YappaSDK.INSTANCE.setFCMToken(token);
    }
  }

  @ReactMethod
  public void setContentUrl(String contentUrl) {
    YappaSDK.INSTANCE.setContentUrl(contentUrl);
  }

  @ReactMethod
  public void setCallbackScheme(String scheme) {
  }

  @ReactMethod
  public void handleNotification(ReadableMap remoteMessageMap) {
    ReadableMap notification = remoteMessageMap.getMap("notification");
    ReadableMap data = remoteMessageMap.getMap("data");
    Bundle mappedData = new Bundle();

    if(data != null && notification != null){
      for (String key : data.toHashMap().keySet()) {
        if(data.getType(key) == ReadableType.String){
          mappedData.putString(key, data.getString(key));
        }
      }

      if(notification.hasKey("title") && notification.hasKey("body")){
        YappaSDK.INSTANCE.handleNotification(mappedData, (s, s2) -> {
          return null;
        });
      }
    }
  }

  @ReactMethod
  public void handleNotificationForeground(ReadableMap remoteMessageMap) {
    ReadableMap notification = remoteMessageMap.getMap("notification");
    ReadableMap data = remoteMessageMap.getMap("data");
    HashMap<String, String> mappedData = new HashMap<>();

    if(data != null && notification != null){
      for (String key : data.toHashMap().keySet()) {
        if(data.getType(key) == ReadableType.String){
            mappedData.put(key, data.getString(key));
        }
      }

      if(notification.hasKey("title") && notification.hasKey("body")){
        YappaSDK.INSTANCE.displayNotification(mappedData, notification.getString("title"), notification.getString("body"));
      }
    }
  }
}
