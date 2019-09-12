package com.ugame.react.c2capp;

import android.app.Application;
import android.util.Log;

import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.bridge.JavaScriptExecutorFactory;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import io.sentry.RNSentryPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.ugame.react.c2capp.upgrade.UpgradePackage;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile(){
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      packages.add(new UpgradePackage());
      packages.add(new CodePush("AqwQDS5Qa7JSCxCgmdkPrMFIvWXY4ksvOXqog", getApplicationContext(), BuildConfig.DEBUG, "http://192.168.88.163:3000/"));
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
