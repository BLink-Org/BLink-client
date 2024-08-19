import UIKit
import Social
import MobileCoreServices

class CustomShareViewController: UIViewController {

    var docPath = ""

    override func viewDidLoad() {
        super.viewDidLoad()

        // 그룹 컨테이너 URL 설정
        let containerURL = FileManager().containerURL(forSecurityApplicationGroupIdentifier: "group.org.reactjs.native.bookmarklink.BLinkApp")!
        docPath = "\(containerURL.path)/share"
        
        // 디렉터리 생성
        do {
            try FileManager.default.createDirectory(atPath: docPath, withIntermediateDirectories: true, attributes: nil)
        } catch let error as NSError {
            print("디렉터리를 생성할 수 없습니다: \(error)")
        } catch {
            fatalError()
        }

        // 이전에 저장된 파일 삭제
        let files = try! FileManager.default.contentsOfDirectory(atPath: docPath)
        for file in files {
            try? FileManager.default.removeItem(at: URL(fileURLWithPath: "\(docPath)/\(file)"))
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)

        let group = DispatchGroup()
        
        NSLog("inputItems: \(self.extensionContext!.inputItems.count)")
        
        for item in self.extensionContext!.inputItems {
            let inputItem = item as! NSExtensionItem
            
            for provider in inputItem.attachments! {
                let itemProvider = provider as! NSItemProvider
                group.enter()
                
                itemProvider.loadItem(forTypeIdentifier: "public.url", options: nil) { [weak self] data, error in
                    guard let self = self else { return }

                    if let url = data as? URL {
                        // URL이 파일이 아닐 수 있으므로, 파일 복사 시도는 생략
                        print(">>> 공유된 URL: \(url.absoluteString)")

                        // URL을 UserDefaults에 저장
                        let userDefaults = UserDefaults(suiteName: "group.org.reactjs.native.bookmarklink.BLinkApp")
                        userDefaults?.set(url.absoluteString, forKey: "sharedURL")
                        userDefaults?.synchronize()
                    } else if let error = error {
                        NSLog("Error loading item: \(error.localizedDescription)")
                    } else {
                        NSLog("Error: Data is not a URL")
                    }

                    group.leave()
                }
            }
        }
        
        group.notify(queue: DispatchQueue.main) {
            NSLog("작업 완료")
            
            let userDefaults = UserDefaults(suiteName: "group.org.reactjs.native.bookmarklink.BLinkApp")
            let sharedURL = userDefaults?.string(forKey: "sharedURL") ?? ""
            
            // URL encode sharedURL
            let encodedSharedURL = sharedURL.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
            
            // 파일명을 직렬화하고 openURL 호출
            do {
                let jsonData = try JSONSerialization.data(
                    withJSONObject: [
                        "action" : "incoming-files"
                    ],
                    options: []
                )
                let jsonString = (NSString(data: jsonData, encoding: String.Encoding.utf8.rawValue)! as String).addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
                let result = self.openURL(URL(string: "myapp://com.myapp.share?\(jsonString)&sharedURL=\(encodedSharedURL)")!)
                
            } catch {
                NSLog("오류: \(error.localizedDescription)")
            }
            self.dismiss(animated: false) {
                self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
            }
        }
    }

    @objc func openURL(_ url: URL) -> Bool {
        var responder: UIResponder? = self
        while responder != nil {
            if let application = responder as? UIApplication {
                return application.perform(#selector(openURL(_:)), with: url) != nil
            }
            responder = responder?.next
        }
        return false
    }
}
