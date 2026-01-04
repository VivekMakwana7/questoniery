
# Flutter Get Started

Ready to build beautiful, multiplatform apps from a single codebase? Choose from the following options to get started setting up your Flutter development environment.

## 1. Quick start (Recommended)
Use VS Code or another Code OSS-based editor to quickly install, set up, and try out Flutter development!
[Quick Start Guide](https://docs.flutter.dev/get-started/quick)

## 2. Custom setup
Install the Flutter SDK, set up any initial target platform, and get started learning and developing with Flutter!
[Custom Setup Guide](https://docs.flutter.dev/get-started/custom)

## Note for users in China
If you want to use Flutter in China, check out [using Flutter in China](https://docs.flutter.dev/community/china).

# Flutter Widget Catalog

Explore Flutter's comprehensive collection of widgets for building beautiful apps.

## Design Systems
Flutter ships with two main design systems:
- **Material Design**: Visual, behavioral, and motion-rich widgets implementing Material 3. [Explore Material Widgets](https://docs.flutter.dev/ui/widgets/material)
- **Cupertino**: Beautiful and high-fidelity widgets for iOS and macOS. [Explore Cupertino Widgets](https://docs.flutter.dev/ui/widgets/cupertino)

## Base Widgets Categories
Common rendering options and base functionalities:
- **Basics**: Widgets to know before building your first app.
- **Layout**: Arrange widgets in columns, rows, grids, etc.
- **Text**: Display and style text.
- **Input**: Take user input.
- **Assets, Images, and Icons**: Manage and display assets.
- **Animation and Motion**: Add animations.
- **Interaction Models**: Respond to touch events.
- **Styling**: Manage themes and responsiveness.
- **Scrolling**: Scrollable lists and views.
- **Async**: Async pattern support.
- **Painting and Effects**: Visual effects.
- **Accessibility**: Make your app accessible.

[View Full Widget Index](https://docs.flutter.dev/reference/widgets)

# Common Flutter .gitignore
Below is a standard `.gitignore` file for Flutter projects to exclude generated files and local configurations from version control.

```gitignore
# Miscellaneous
*.class
*.log
*.pyc
*.swp
.DS_Store
.atom/
.build/
.buildlog/
.history
.svn/
.swiftpm/
migrate_working_dir/

# IntelliJ related
*.iml
*.ipr
*.iws
.idea/

# The .vscode folder contains launch configuration and tasks you configure in
# VS Code which you may wish to be included in version control, so this line
# is commented out by default.
#.vscode/

# Flutter/Dart/Pub related
**/doc/api/
**/ios/Flutter/.last_build_id
.dart_tool/
.flutter-plugins
.flutter-plugins-dependencies
.pub-cache/
.pub/
/build/

# Symbolication related
app.*.symbols

# Obfuscation related
app.*.map.json

# Android Studio will place build artifacts here
/android/app/debug
/android/app/profile
/android/app/release

*.freezed.dart
*.g.dart
!lib/hive/hive_registrar.g.dart

.env*

.idea/*

# Visual Studio Code related
.classpath
.project
.settings/
.vscode/*

# packages file containing multi-root paths
.packages.generated

build/
flutter_*.png
linked_*.ds
unlinked.ds
unlinked_spec.ds
.fvm/

# Android related
**/android/**/gradle-wrapper.jar
**/android/.gradle
**/android/captures/
**/android/local.properties
**/android/**/GeneratedPluginRegistrant.java
**/android/key.properties
**/android/.idea/
**/android/app/debug
**/android/app/profile
**/android/app/release
*.jks

# iOS/XCode related
**/ios/**/*.mode1v3
**/ios/**/*.mode2v3
**/ios/**/*.moved-aside
**/ios/**/*.pbxuser
**/ios/**/*.perspectivev3
**/ios/**/*sync/
**/ios/**/.sconsign.dblite
**/ios/**/.tags*
**/ios/**/.vagrant/
**/ios/**/DerivedData/
**/ios/**/Icon?
**/ios/**/Pods/
**/ios/**/.symlinks/
**/ios/**/profile
**/ios/**/xcuserdata
**/ios/.generated/
**/ios/Flutter/App.framework
**/ios/Flutter/Flutter.framework
**/ios/Flutter/Flutter.podspec
**/ios/Flutter/Generated.xcconfig
**/ios/Flutter/app.flx
**/ios/Flutter/app.zip
**/ios/Flutter/flutter_assets/
**/ios/Flutter/flutter_export_environment.sh
**/ios/ServiceDefinitions.json
**/ios/Runner/GeneratedPluginRegistrant.*

# Coverage
coverage/

# Submodules
packages/**/pubspec.lock

# Web related
lib/generated_plugin_registrant.dart

# Exceptions to the above rules.
!**/ios/**/default.mode1v3
!**/ios/**/default.mode2v3
!**/ios/**/default.pbxuser
!**/ios/**/default.perspectivev3
!/packages/flutter_tools/test/data/dart_dependencies_test/**/.packages
!/dev/ci/**/Gemfile.lock
!.vscode/extensions.json
!.vscode/launch.json
!.idea/codeStyles/
!.idea/dictionaries/
!.idea/runConfigurations/

/lib/firebase_options*.dart
/lib/gen/
```
