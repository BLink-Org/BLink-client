package com.blinkapplication

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen  // 올바른 SplashScreen import
import com.blinkapplication.R
import com.blinkapplication.ShareActivity
import com.facebook.react.ReactApplication

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  /**
   * SplashScreen.show()를 onCreate 메서드에서 호출하여 스플래시 화면을 표시
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this, R.id.lottie)  // 올바른 SplashScreen 메서드 호출
    super.onCreate(savedInstanceState)
  }

  override fun getMainComponentName(): String = "BLinkApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {
        override fun getLaunchOptions(): Bundle? {
            // Retrieve the shared text and pass it to React Native via initialProps
            val sharedText = ShareActivity.sharedText
                return sharedText?.let {
                    Bundle().apply {
                        putString("sharedURL", it)
                    }
            }
        }
    }
  }
}
