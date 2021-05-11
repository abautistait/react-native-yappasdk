import YappaSDK
@objc(Yappasdk)
class Yappasdk: NSObject {
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
    @objc(handleNotification:withCallback:withReject:)
    func handleNotification(userInfo: [AnyHashable : Any], callback: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        var dataInfo = userInfo
        if let data = userInfo["data"] as? [AnyHashable : Any] {
            dataInfo = data
        }
        DispatchQueue.main.async {
            Yappa.handleNotification(UIApplication.shared, dataInfo) { (d1, d2) in
                callback(d1)
            }
        }
    }
    @objc(setFCMToken:)
    func setFCMToken(token: String) {
        Yappa.setFCMToken(token)
    }
    @objc(initialize:withAppId:)
    func initialize(hash: String, appId: String) -> Void {
        DispatchQueue.main.async {
            Yappa.initialize(hash: hash, appId: appId)
        }
    }
    @objc(setContentUrl:)
    func setContentUrl(url: String) {
        Yappa.setSiteUrl(url)
    }
    @objc(setCallbackScheme:)
    func setCallbackScheme(urlScheme: String) {
        Yappa.setCallbackScheme(urlScheme)
    }
    @objc(setContentId:)
    func setContentId(contentId: String) {
        Yappa.setContentId(contentId)
    }
    @objc(show)
    func show() {
        DispatchQueue.main.async {
            Yappa.openSDK();
        }
    }
    @objc(close)
    func close() {
        print("not available in iOS")
    }
}