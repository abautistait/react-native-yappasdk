import YappaSDK

@objc(Yappasdk)
class Yappasdk: NSObject {

    @objc(initialize:withAppId:)
    func initialize(hash: String, appId: String) -> Void {
        Yappa.initialize(hash: hash, appId: appId)
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
        //TO-DO
    }
}
