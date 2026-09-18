#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#if DEBUG && __has_include(<React/RCTDevLoadingViewSetEnabled.h>)
#import <React/RCTDevLoadingViewSetEnabled.h>
#endif

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)notification
{
  self.moduleName = @"TrainingAppMac";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

#if DEBUG && __has_include(<React/RCTDevLoadingViewSetEnabled.h>)
  RCTDevLoadingViewSetEnabled(NO);
#endif

  [super applicationDidFinishLaunching:notification];

  dispatch_async(dispatch_get_main_queue(), ^{
    [NSApp activateIgnoringOtherApps:YES];
    [self.window makeMainWindow];
    [self.window makeKeyAndOrderFront:nil];
  });
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

- (void)customizeRootView:(RCTRootView *)rootView
{
  [super customizeRootView:rootView];

  rootView.backgroundColor = [NSColor colorWithSRGBRed:0.05 green:0.05 blue:0.05 alpha:1.0];
  self.window.opaque = YES;
  self.window.backgroundColor = [NSColor colorWithSRGBRed:0.05 green:0.05 blue:0.05 alpha:1.0];
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
#ifdef RN_FABRIC_ENABLED
  return true;
#else
  return false;
#endif
}

@end
