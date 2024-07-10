//
//  ShareViewController.swift
//  Share
//
//  Created by 곽수정 on 7/10/24.
//

import UIKit
import Social
import UniformTypeIdentifiers

class ShareViewController: SLComposeServiceViewController {

    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return !self.contentText.isEmpty
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let item = extensionContext?.inputItems.first as? NSExtensionItem,
           let itemProvider = item.attachments?.first {
            if itemProvider.hasItemConformingToTypeIdentifier(UTType.url.identifier) {
                itemProvider.loadItem(forTypeIdentifier: UTType.url.identifier, options: nil) { (url, error) in
                    if let shareURL = url as? URL {
                        DispatchQueue.main.async {
                            self.textView.text = shareURL.absoluteString
                        }
                    }
                }
            }
        }
    }

    override func didSelectPost() {
        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.

        // Inform the host that we're done, so it un-blocks its UI. Note: Alternatively you could call super's -didSelectPost, which will similarly complete the extension context.
        if let text = contentText {
            if let userDefaults = UserDefaults(suiteName: "group.org.reactjs.native.example.BLinkApp.Share") {
                userDefaults.set(self.textView.text, forKey: "sharedText")
                userDefaults.synchronize()
            }
        }

        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    override func configurationItems() -> [Any]! {
        // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
        return []
    }

}
