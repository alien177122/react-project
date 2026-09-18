import Capacitor
import SwiftUI
import UIKit

/// SwiftUI canvas preview for the Capacitor bridge (optional; app still launches via Main.storyboard).
struct AppViewControllerPreview: UIViewControllerRepresentable {
  func makeUIViewController(context: Context) -> UIViewController {
    CAPBridgeViewController()
  }

  func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}

#Preview("Главный экран приложения") {
  AppViewControllerPreview()
}
