#import "AppDelegate.h"

@import UserNotifications;
@import AuthenticationServices;

@interface AppDelegate (FirebasePlugin) <UIApplicationDelegate, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding>
+ (AppDelegate *_Nullable) instance;
@property (nonatomic, strong) NSNumber * _Nonnull applicationInBackground;
@property (NS_NONATOMIC_IOSONLY, nullable, weak) id <UNUserNotificationCenterDelegate> delegate;
@end
