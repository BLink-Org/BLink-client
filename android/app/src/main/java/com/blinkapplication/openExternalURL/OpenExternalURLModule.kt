package com.blinkapplication.openExternalURL

import android.app.Activity
import android.content.Intent
import android.provider.Settings
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class OpenExternalURLModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "OpenExternalURLModule"
    }

    // 언어 설정 창으로 이동
    @ReactMethod
    fun linkAndroidSettings() {
        val activity: Activity? = currentActivity
        activity?.let {
            val intent = Intent(Settings.ACTION_LOCALE_SETTINGS)
            it.startActivity(intent)
        }
    }
}