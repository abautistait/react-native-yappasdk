#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Yappasdk, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)hash withAppId:(NSString *)appId)

RCT_EXTERN_METHOD(setContentUrl:(NSString *)url)

RCT_EXTERN_METHOD(setCallbackScheme:(NSString *)urlScheme)

RCT_EXTERN_METHOD(setContentId:(NSString *)contentId)

RCT_EXTERN_METHOD(show)

RCT_EXTERN_METHOD(close)

RCT_EXTERN_METHOD(handleNotification: (RCTPromiseResolveBlock)resolve
                                  rejecter:(RCTPromiseRejectBlock)reject)

@end
