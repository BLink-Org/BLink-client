package com.blinkapplication

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class ShareActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleSendIntent()
    }

    private fun handleSendIntent() {
        intent?.let {
            if (Intent.ACTION_SEND == it.action && "text/plain" == it.type) {
                val sharedText = it.getStringExtra(Intent.EXTRA_TEXT)
                sharedText?.let { text ->
                    sendToReactNative(text)
                }
            } else if (Intent.ACTION_SEND_MULTIPLE == it.action && "text/plain" == it.type) {
                // Handle multiple texts if needed
                finish() // finish activity
            } else {
                finish() // finish activity if no relevant action
            }
        }
    }

    private fun sendToReactNative(sharedText: String) {
        val reactContext = (application as ReactApplication).reactNativeHost.reactInstanceManager.currentReactContext
        reactContext?.let {
            it
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("UrlShared", sharedText)
        }
        finish() // Close the activity after sending the data
    }
}
