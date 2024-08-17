import Security

class KeychainManager {
    static func fetchAccessTokenFromKeychain() -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: "accessToken",
            kSecReturnData as String: kCFBooleanTrue!,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]

        var item: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &item)

        guard status == errSecSuccess else {
            print("Error fetching token from Keychain: \(status)")
            return nil
        }

        if let data = item as? Data,
           let token = String(data: data, encoding: .utf8) {
            return token
        }

        return nil
    }
}
