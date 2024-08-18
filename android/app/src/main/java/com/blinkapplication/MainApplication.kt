package com.blinkapplication

import android.app.Application
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import java.lang.reflect.InvocationTargetException
import org.devio.rn.splashscreen.SplashScreenReactPackage; // 스플래시 스크린
import com.blinkapplication.openExternalURL.OpenExternalURLPackage

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
            return PackageList(this).packages.apply {
                add(ShareMenuPackage())
                add(OpenExternalURLPackage())  // 언어 설정 창으로 이동
                // add(SplashScreenReactPackage()) // SplashScreen 패키지 추가
            }
        }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            load()
        }
        initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }

    private fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                val aClass = Class.forName("com.blinkapp.ReactNativeFlipper")
                aClass.getMethod("initializeFlipper", Context::class.java, ReactInstanceManager::class.java)
                    .invoke(null, context, reactInstanceManager)
            } catch (e: ClassNotFoundException) {
                e.printStackTrace()
            } catch (e: NoSuchMethodException) {
                e.printStackTrace()
            } catch (e: IllegalAccessException) {
                e.printStackTrace()
            } catch (e: InvocationTargetException) {
                e.printStackTrace()
            }
        }
    }
}
