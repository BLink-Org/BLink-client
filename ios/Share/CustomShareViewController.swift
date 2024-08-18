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
                itemProvider.loadItem(forTypeIdentifier: kUTTypeData as String, options: nil) { data, error in
                    if let url = data as? URL {
                        let path = "\(self.docPath)/\(url.lastPathComponent)"
                        print(">>> 공유된 경로: \(url.path)")
                        try? FileManager.default.copyItem(at: url, to: URL(fileURLWithPath: path))
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
            
            let files = try! FileManager.default.contentsOfDirectory(atPath: self.docPath)
            NSLog("디렉터리 내용: \(files)")
            
            // 파일명을 직렬화하고 openURL 호출
            do {
                let jsonData = try JSONSerialization.data(
                    withJSONObject: [
                        "action" : "incoming-files"
                    ],
                    options: []
                )
                let jsonString = (NSString(data: jsonData, encoding: String.Encoding.utf8.rawValue)! as String).addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
                let result = self.openURL(URL(string: "myapp://com.myapp.share?\(jsonString!)")!)
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
