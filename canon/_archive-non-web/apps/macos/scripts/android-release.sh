#!/usr/bin/env bash
set -euo pipefail

ANDROID_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../android" && pwd)"
APK="$ANDROID_DIR/app/build/outputs/apk/release/app-release.apk"
APP_ID="com.trainingappmac"
API="35"
BUILD_TOOLS="35.0.0"
NDK="26.1.10909125"

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

command -v java >/dev/null 2>&1 || fail "java not found. Install JDK 17 and set JAVA_HOME."
[ -n "${JAVA_HOME:-}" ] || fail "JAVA_HOME is missing."

SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
[ -n "$SDK" ] || fail "ANDROID_HOME or ANDROID_SDK_ROOT is missing."
[ -d "$SDK" ] || fail "Android SDK directory not found: $SDK"
export ANDROID_HOME="$SDK"
export ANDROID_SDK_ROOT="$SDK"

[ -d "$ANDROID_HOME/platforms/android-$API" ] || fail "Android SDK platform android-$API is missing."
[ -d "$ANDROID_HOME/build-tools/$BUILD_TOOLS" ] || fail "Android build-tools $BUILD_TOOLS is missing."
[ -x "$ANDROID_HOME/build-tools/$BUILD_TOOLS/apksigner" ] || fail "apksigner not found in build-tools $BUILD_TOOLS."
[ -d "$ANDROID_HOME/ndk/$NDK" ] || fail "Android NDK $NDK is missing."

if [ -z "${ANDROID_KEYSTORE_FILE:-}" ] && [ ! -f "$ANDROID_DIR/key.properties" ]; then
  fail "Signing config is missing. Create android/key.properties or set ANDROID_KEYSTORE_FILE, ANDROID_KEYSTORE_PASSWORD, ANDROID_KEY_ALIAS, ANDROID_KEY_PASSWORD."
fi

if [ -f "$ANDROID_DIR/key.properties" ]; then
  grep -Eq '^(storeFile|ANDROID_KEYSTORE_FILE)=' "$ANDROID_DIR/key.properties" || fail "Missing storeFile in android/key.properties."
  grep -Eq '^(storePassword|ANDROID_KEYSTORE_PASSWORD)=' "$ANDROID_DIR/key.properties" || fail "Missing storePassword in android/key.properties."
  grep -Eq '^(keyAlias|ANDROID_KEY_ALIAS)=' "$ANDROID_DIR/key.properties" || fail "Missing keyAlias in android/key.properties."
  grep -Eq '^(keyPassword|ANDROID_KEY_PASSWORD)=' "$ANDROID_DIR/key.properties" || fail "Missing keyPassword in android/key.properties."
fi

cd "$ANDROID_DIR"
./gradlew clean assembleRelease

[ -f "$APK" ] || fail "APK not found: $APK"
"$ANDROID_HOME/build-tools/$BUILD_TOOLS/apksigner" verify --verbose --print-certs "$APK"

echo "$APK"
echo "Install: adb install -r $APK"
echo "Logs: adb logcat -s ReactNative:V,AndroidRuntime:V '*:S'"
echo "Package: adb shell dumpsys package $APP_ID"
