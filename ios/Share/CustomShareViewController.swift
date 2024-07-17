import UIKit

class CustomShareViewController: UIViewController {

    var folderButtons: [UIButton] = []

    override func viewDidLoad() {
        super.viewDidLoad()

        self.view.backgroundColor = .white
        setupNavBar()
        self.view.addSubview(titleLabel)
        self.view.addSubview(textField)
        self.view.addSubview(folderLabel)
        self.view.addSubview(folderButton)
        setupFolderButtons()
        setupViews()
        fetchSharedURL()
    }

    private func setupNavBar() {
        self.navigationItem.title = "링크 저장"
        self.navigationController?.navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.black]

        let itemCancel = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(cancelAction))
        self.navigationItem.setLeftBarButton(itemCancel, animated: false)

        let itemDone = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(doneAction))
        self.navigationItem.setRightBarButton(itemDone, animated: false)
    }

    private lazy var titleLabel: UILabel = {
        let label = UILabel()
        label.text = "링크"
        label.font = UIFont.boldSystemFont(ofSize: 18)
        label.textColor = .black
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private lazy var folderLabel: UILabel = {
        let label = UILabel()
        label.text = "폴더"
        label.font = UIFont.boldSystemFont(ofSize: 18)
        label.textColor = .black
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private lazy var folderButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("+ 새로운 폴더", for: .normal)
        button.setTitleColor(.blue, for: .normal)
        button.contentHorizontalAlignment = .trailing
        button.titleLabel?.font = UIFont.systemFont(ofSize: 14)
        button.addTarget(self, action: #selector(addNewFolder(_:)), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private lazy var textField: UITextField = {
        let textField = UITextField()
        textField.text = "링크 저장"
        textField.textColor = .black
        textField.backgroundColor = .white
        textField.translatesAutoresizingMaskIntoConstraints = false

        return textField
    }()

    private func setupFolderButtons() {
        let button1 = createFolderButton(title: "기본 폴더")
        let button2 = createFolderButton(title: "JavaScript")

        folderButtons = [button1, button2]
        folderButtons.forEach { button in
            button.addTarget(self, action: #selector(folderButtonTapped(_:)), for: .touchUpInside)
            button.adjustsImageWhenHighlighted = false
            self.view.addSubview(button)
        }

        updateFolderButtonLayout()
    }

    private func createFolderButton(title: String) -> UIButton {
        let button = UIButton(type: .custom)
        button.setTitle(title, for: .normal)
        button.setTitleColor(.black, for: .normal)
        button.setTitleColor(.white, for: .selected)
        button.contentHorizontalAlignment = .center
        button.backgroundColor = UIColor(red: 247/255, green: 249/255, blue: 251/255, alpha: 1.0) // 초기 배경색 설정
        button.layer.cornerRadius = 5
        button.titleLabel?.font = UIFont.systemFont(ofSize: 14)
        button.addTarget(self, action: #selector(folderButtonTapped(_:)), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }

    private func updateFolderButtonLayout() {
    var previousButton: UIButton?

    for button in folderButtons {
        button.heightAnchor.constraint(equalToConstant: 50).isActive = true
        button.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        button.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20).isActive = true

        if let previousButton = previousButton {
            button.topAnchor.constraint(equalTo: previousButton.bottomAnchor, constant: 15).isActive = true
        } else {
            button.topAnchor.constraint(equalTo: folderLabel.bottomAnchor, constant: 15).isActive = true
        }
        previousButton = button
    }
}


    @objc private func addNewFolder(_ sender: UIButton) {
        let alertController = UIAlertController(title: "새로운 폴더 추가", message: "폴더 이름을 입력하세요", preferredStyle: .alert)
        alertController.addTextField { textField in
            textField.placeholder = "폴더 이름"
        }
        let addAction = UIAlertAction(title: "추가", style: .default) { [weak self] _ in
            guard let folderName = alertController.textFields?.first?.text else { return }
            self?.createAndAddFolderButton(title: folderName)
        }
        let cancelAction = UIAlertAction(title: "취소", style: .cancel, handler: nil)
        alertController.addAction(addAction)
        alertController.addAction(cancelAction)
        present(alertController, animated: true, completion: nil)
    }

    private func createAndAddFolderButton(title: String) {
        let newButton = createFolderButton(title: title)
        folderButtons.append(newButton)
        view.addSubview(newButton)

        updateFolderButtonLayout()
    }

    @objc private func folderButtonTapped(_ sender: UIButton) {
        sender.isSelected.toggle() // 선택 상태를 토글

        if sender.isSelected {
            sender.backgroundColor = UIColor(red: 109/255, green: 150/255, blue: 255/255, alpha: 1.0) // 선택된 배경색
        } else {
            sender.backgroundColor = UIColor(red: 247/255, green: 249/255, blue: 251/255, alpha: 1.0) // 기본 배경색
        }
    }

    private func setupViews() {
        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
            titleLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),

            textField.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 20),
            textField.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 20),
            textField.trailingAnchor.constraint(equalTo: self.view.trailingAnchor, constant: -20),
            textField.heightAnchor.constraint(equalToConstant: 44),

            folderLabel.topAnchor.constraint(equalTo: textField.bottomAnchor, constant: 20),
            folderLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),

            folderButton.topAnchor.constraint(equalTo: textField.bottomAnchor, constant: 20),
            folderButton.leadingAnchor.constraint(equalTo: folderLabel.trailingAnchor, constant: 8),
            folderButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
        ])
    }

    private func fetchSharedURL() {
        guard let inputItems = extensionContext?.inputItems as? [NSExtensionItem], !inputItems.isEmpty,
            let item = inputItems.first,
            let itemProvider = item.attachments?.first,
            itemProvider.hasItemConformingToTypeIdentifier("public.url") else {
                return
            }

        itemProvider.loadItem(forTypeIdentifier: "public.url", options: nil) { [weak self] (url, error) in
            guard let self = self, let url = url as? URL else { return }
            
            DispatchQueue.main.async {
                self.textField.text = url.absoluteString
            }
        }
    }

    @objc private func cancelAction () {
        let error = NSError(domain: "some.bundle.identifier", code: 0, userInfo: [NSLocalizedDescriptionKey: "An error description"])
        extensionContext?.cancelRequest(withError: error)
    }

    @objc private func doneAction() {
        extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
    }
}