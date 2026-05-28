$ErrorActionPreference = "Stop"

$AndroidDir = Resolve-Path "$PSScriptRoot\..\android"
$Apk = Join-Path $AndroidDir "app\build\outputs\apk\release\app-release.apk"
$AppId = "com.trainingappmac"
$Api = "35"
$BuildTools = "35.0.0"
$Ndk = "26.1.10909125"

function Fail($Message) {
  Write-Error "ERROR: $Message"
  exit 1
}

if (!(Get-Command java -ErrorAction SilentlyContinue)) { Fail "java not found. Install JDK 17 and set JAVA_HOME." }
if (!$env:JAVA_HOME) { Fail "JAVA_HOME is missing." }

$Sdk = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } elseif ($env:ANDROID_SDK_ROOT) { $env:ANDROID_SDK_ROOT } else { "" }
if (!$Sdk) { Fail "ANDROID_HOME or ANDROID_SDK_ROOT is missing." }
if (!(Test-Path $Sdk)) { Fail "Android SDK directory not found: $Sdk" }
$env:ANDROID_HOME = $Sdk
$env:ANDROID_SDK_ROOT = $Sdk

if (!(Test-Path "$Sdk\platforms\android-$Api")) { Fail "Android SDK platform android-$Api is missing." }
if (!(Test-Path "$Sdk\build-tools\$BuildTools")) { Fail "Android build-tools $BuildTools is missing." }
if (!(Test-Path "$Sdk\build-tools\$BuildTools\apksigner.bat")) { Fail "apksigner not found in build-tools $BuildTools." }
if (!(Test-Path "$Sdk\ndk\$Ndk")) { Fail "Android NDK $Ndk is missing." }

$KeyProperties = Join-Path $AndroidDir "key.properties"
if (!$env:ANDROID_KEYSTORE_FILE -and !(Test-Path $KeyProperties)) {
  Fail "Signing config is missing. Create android/key.properties or set ANDROID_KEYSTORE_FILE, ANDROID_KEYSTORE_PASSWORD, ANDROID_KEY_ALIAS, ANDROID_KEY_PASSWORD."
}

if (Test-Path $KeyProperties) {
  $KeyPropertiesText = Get-Content $KeyProperties -Raw
  if ($KeyPropertiesText -notmatch "(?m)^(storeFile|ANDROID_KEYSTORE_FILE)=") { Fail "Missing storeFile in android/key.properties." }
  if ($KeyPropertiesText -notmatch "(?m)^(storePassword|ANDROID_KEYSTORE_PASSWORD)=") { Fail "Missing storePassword in android/key.properties." }
  if ($KeyPropertiesText -notmatch "(?m)^(keyAlias|ANDROID_KEY_ALIAS)=") { Fail "Missing keyAlias in android/key.properties." }
  if ($KeyPropertiesText -notmatch "(?m)^(keyPassword|ANDROID_KEY_PASSWORD)=") { Fail "Missing keyPassword in android/key.properties." }
}

Push-Location $AndroidDir
.\gradlew.bat clean assembleRelease
Pop-Location

if (!(Test-Path $Apk)) { Fail "APK not found: $Apk" }
& "$Sdk\build-tools\$BuildTools\apksigner.bat" verify --verbose --print-certs $Apk

Write-Output $Apk
Write-Output "Install: adb install -r $Apk"
Write-Output "Logs: adb logcat -s ReactNative:V,AndroidRuntime:V '*:S'"
Write-Output "Package: adb shell dumpsys package $AppId"
