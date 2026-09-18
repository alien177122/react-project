fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios info

```sh
[bundle exec] fastlane ios info
```

Показать метаданные iOS-проекта (демо, без сборки)

### ios sync

```sh
[bundle exec] fastlane ios sync
```

Синхронизировать web-сборку Vite → iOS (без pod install)

### ios build_debug

```sh
[bundle exec] fastlane ios build_debug
```

Собрать Debug без подписи (локальная проверка пайплайна)

----


## Android

### android info

```sh
[bundle exec] fastlane android info
```

Показать метаданные Android-проекта (демо)

### android build_debug

```sh
[bundle exec] fastlane android build_debug
```

Собрать debug APK через Gradle

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
