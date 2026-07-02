// Создаём SwiftUI-превью для главного viewController
import SwiftUI
import UIKit

// Обёртка для отображения UIKit ViewController в SwiftUI-превью
struct AppViewControllerPreview: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        // Используем стартовый ViewController, который обычно запускается приложением
        // Подберите правильный, если ваш проект использует другой класс
        let mainVC = CAPBridgeViewController()
        return mainVC
    }
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}

#Preview("Главный экран приложения") {
    AppViewControllerPreview()
}
