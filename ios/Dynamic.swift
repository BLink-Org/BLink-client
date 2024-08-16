//
//  Dynamic.swift
//  BLinkApp
//
//  Created by 김태건 on 8/15/24.
//

import Foundation
import UIKit
import Foundation
import Lottie

@objc class Dynamic: NSObject {

  @objc func createAnimationView(rootView: UIView, lottieName: String) -> AnimationView {
    let animationView = AnimationView(name: lottieName)
    animationView.frame = rootView.frame
    animationView.center = rootView.center
    animationView.backgroundColor = UIColor.white
    return animationView
  }

  @objc func play(animationView: AnimationView) {
    animationView.play(completion: { (success) in
      RNSplashScreen.setAnimationFinished(true)
    })
  }
}
