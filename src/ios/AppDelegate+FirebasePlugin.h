#import "AppDelegate.h"

@import UserNotifications;

@interface AppDelegate (FirebasePlugin) <UIApplicationDelegate>
+ (AppDelegate *_Nullable) instance;
@property (nonatomic, strong) NSNumber * _Nonnull applicationInBackground;
@property (NS_NONATOMIC_IOSONLY, nullable, weak) id <UNUserNotificationCenterDelegate> delegate;
@end
