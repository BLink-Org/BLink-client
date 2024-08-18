#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
#import "BLinkApp-Swift.h"
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"BLinkApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  // splash screen 설정
  BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];
   
  if (success) {
    //This is where we will put the logic to get access to rootview
    UIView *rootView = self.window.rootViewController.view;
      
    rootView.backgroundColor = [UIColor whiteColor]; // change with your desired backgroundColor
   
    Dynamic *t = [Dynamic new];
    UIView *animationUIView = (UIView *)[t createAnimationViewWithRootView:rootView lottieName:@"blink-splash"]; // change lottieName to your lottie files name
   
    // register LottieSplashScreen to RNSplashScreen
    [RNSplashScreen showLottieSplash:animationUIView inRootView:rootView];
    // casting UIView type to AnimationView type
    AnimationView *animationView = (AnimationView *) animationUIView;
    // play
    [t playWithAnimationView:animationView];
    // If you want the animation layout to be forced to remove when hide is called, use this code
    [RNSplashScreen setAnimationFinished:true];
  }
   
  NSUserDefaults *userDefaults = [[NSUserDefaults alloc] initWithSuiteName:@"group.org.reactjs.native.example.BLinkApp.Share"];
  NSString *sharedText = [userDefaults objectForKey:@"sharedText"];
  
  if (sharedText) {
    [userDefaults removeObjectForKey:@"sharedText"];
    [userDefaults synchronize];
  }

  // Launch React Native app
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:[self initializeBridge]
                                                   moduleName:self.moduleName
                                            initialProperties:@{@"sharedText": sharedText ?: @""}];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return success;
}

// URL Scheme 처리
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  return [RCTLinkingManager application:application openURL:url options:options];
}

// 유저 액티비티 처리 (예: 유니버설 링크)
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
  return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

// React Native Bridge 초기화
- (RCTBridge *)initializeBridge
{
  NSURL *jsCodeLocation = [self sourceURLForBridge:nil];
  RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                           moduleProvider:nil
                                            launchOptions:nil];
  return bridge;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
