#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"BLinkApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
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

  return YES;
}

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
