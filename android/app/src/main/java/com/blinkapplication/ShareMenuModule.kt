package com.blinkapplication

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class ShareMenuModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    // Events
    private val NEW_SHARE_EVENT = "NewShareEvent"

    // Keys
    private val MIME_TYPE_KEY = "mimeType"
    private val DATA_KEY = "data"

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String {
        return "ShareMenu"
    }

    private fun extractShared(intent: Intent?): ReadableMap? {
        val type = intent?.type ?: return null
        val action = intent.action

        val data = Arguments.createMap()
        data.putString(MIME_TYPE_KEY, type)

        when (action) {
            Intent.ACTION_SEND -> {
                if ("text/plain" == type) {
                    data.putString(DATA_KEY, intent.getStringExtra(Intent.EXTRA_TEXT))
                    return data
                }

                val fileUri = intent.getParcelableExtra<Uri>(Intent.EXTRA_STREAM)
                if (fileUri != null) {
                    data.putString(DATA_KEY, fileUri.toString())
                    return data
                }
            }
            Intent.ACTION_SEND_MULTIPLE -> {
                val fileUris = intent?.getParcelableArrayListExtra<Uri>(Intent.EXTRA_STREAM)
                if (fileUris != null) {
                    val uriArr = Arguments.createArray()
                    for (uri in fileUris) {
                        uriArr.pushString(uri.toString())
                    }
                    data.putArray(DATA_KEY, uriArr)
                    return data
                }
            }
        }

        return null
    }

    @ReactMethod
    fun getSharedText(successCallback: Callback) {
        val currentActivity = currentActivity

        if (currentActivity == null) {
            return
        }

        // If this isn't the root activity then make sure it is
        if (!currentActivity.isTaskRoot) {
            val newIntent = Intent(currentActivity.intent)
            newIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            currentActivity.startActivity(newIntent)

            val shared = extractShared(newIntent)
            successCallback.invoke(shared)
            clearSharedText()
            currentActivity.finish()
            return
        }

        val intent = currentActivity.intent
        val shared = extractShared(intent)
        successCallback.invoke(shared)
        clearSharedText()
    }

    @ReactMethod
    fun addListener(eventName: String) {
        Log.v("test", "MainApplication")
        // Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun removeListeners(count: Int?) {
        Log.v("test", "MainApplication")
        // Required for RN built in Event Emitter Calls.
    }

    private fun dispatchEvent(shared: ReadableMap?) {
        if (!reactContext.hasActiveCatalystInstance()) {
            return
        }

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(NEW_SHARE_EVENT, shared)

        if (shared != null) {
            val mimeType = shared.getString(MIME_TYPE_KEY)
            val data = shared.getString(DATA_KEY)
            Log.d("ShareMenuModule", "Received shared data: mimeType=$mimeType, data=$data")
        }
    }

    private fun clearSharedText() {
        val mActivity = currentActivity

        if (mActivity == null) {
            return
        }

        val intent = mActivity.intent
        val type = intent.type

        if (type == null) {
            return
        }

        if ("text/plain" == type) {
            intent.removeExtra(Intent.EXTRA_TEXT)
        } else {
            intent.removeExtra(Intent.EXTRA_STREAM)
        }
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        // Do nothing
    }

    override fun onNewIntent(intent: Intent?) {
        // Possibly received a new share while the app was already running
        val currentActivity = currentActivity

        if (currentActivity == null) {
            return
        }

        val shared = extractShared(intent)
        if (shared != null) {
            dispatchEvent(shared)
            clearSharedText()
        }

        // Update intent in case the user calls `getSharedText` again
        currentActivity.intent = intent
    }
}
