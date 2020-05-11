interface IChannelOptions {
    id: string
    name?: string
    description?: string
    sound?: string
    vibration?: boolean | number[]
    light?: boolean
    lightColor?: string
    importance?: 0 | 1 | 2 | 3 | 4
    badge?: boolean
    visibility?: -1 | 0 | 1
}

interface FirebasePlugin {
    getId(
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    getToken(
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    onTokenRefresh(
        success: (value: string) => void,
        error: (err: string) => void): void
    getAPNSToken(
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    onApnsTokenReceived(
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    onMessageReceived(
        success: (value: object) => void,
        error: (err: string) => void
    ): void
    grantPermission(
        success: (value: boolean) => void,
        error: (err: string) => void
    ): void
    hasPermission(
        success: (value: boolean) => void,
        error: (err: string) => void
    ): void
    unregister(): void
    setBadgeNumber(
        badgeNumber: number
    ): void
    getBadgeNumber(
        success: (badgeNumber: number) => void,
        error: (err: string) => void
    ): void
    clearAllNotifications(): void
    subscribe(
        topic: string
    ): void
    unsubscribe(
        topic: string
    ): void
    isAutoInitEnabled(
        success: (enabled: boolean) => void,
        error?: (err: string) => void
    ): void
    setAutoInitEnabled(
        enabled: boolean,
        success?: () => void,
        error?: (err: string) => void
    ): void
    createChannel(
        channel: IChannelOptions,
        success: () => void,
        error: (err: string) => void
    ): void
    setDefaultChannel(
        channel: IChannelOptions,
        success: () => void,
        error: (err: string) => void
    ): void
    deleteChannel(
        channel: string,
        success: () => void,
        error: (err: string) => void
    ): void
    listChannels(
        success: (list: { id: string; name: string }[]) => void,
        error: (err: string) => void
    ): void
}
declare var FirebasePlugin: FirebasePlugin;
