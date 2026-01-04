
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

# Image Cropping & Profile Image Picking

This package uses [`image_cropper`](https://pub.dev/packages/image_cropper) to provide cropping functionality for images, including circle cropping for profile pictures. The cropping UI is native on Android, iOS, and Web, and supports custom aspect ratios, crop styles, and more.

### Pick and crop a profile image (circle crop)
```dart
PickerUtils.pickProfileImage(
  onSuccess: (result) {
    // result.file is the cropped File
  },
  onError: (error) {
    // Handle error
  },
);
```

### Pick and crop any image (rectangle or custom aspect)
```dart
PickerUtils.singleImage(
  cropperOptions: CropperOptions(
    crop: true,
    cropStyle: CropStyle.rectangle, // or CropStyle.circle
    aspectRatio: CropAspectRatio(ratioX: 1, ratioY: 1), // 1:1 for square/circle
    aspectRatioPresets: [CropAspectRatioPreset.square],
  ),
  onSuccess: (result) {
    // result.file is the cropped File
  },
  onError: (error) {
    // Handle error
  },
);
```

### Native Configuration Required

#### Android
1. **Add UCropActivity to your `AndroidManifest.xml`:**
   ```xml
   <activity
     android:name="com.yalantis.ucrop.UCropActivity"
     android:screenOrientation="portrait"
     android:theme="@style/Theme.AppCompat.Light.NoActionBar"/>
   ```
2. **Android 15+ Edge-to-Edge Fix:**
   If targeting Android 15 or above, add the following to your `android/app/src/main/res/values/styles.xml`:
   ```xml
   <resources>
     ...
     <style name="Ucrop.CropTheme" parent="Theme.AppCompat.Light.NoActionBar"/>
   </resources>
   ```
   And create `android/app/src/main/res/values-v35/styles.xml`:
   ```xml
   <resources>
     <style name="Ucrop.CropTheme" parent="Theme.AppCompat.Light.NoActionBar">
         <item name="android:windowOptOutEdgeToEdgeEnforcement">true</item>
     </style>
   </resources>
   ```
   Then update your manifest:
   ```xml
   <activity
     android:name="com.yalantis.ucrop.UCropActivity"
     android:screenOrientation="portrait"
     android:theme="@style/Ucrop.CropTheme"/>
   ```

#### iOS
- No special configuration required.

#### Web
1. **Add Cropper.js to your `web/index.html` `<head>`:**
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.css" />
   <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js"></script>
   ```

### Picker Utils Class Code

```dart
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:image_picker/image_picker.dart';
import 'package:pkg_ui/pkg_ui.dart';

/// The type of media to pick.
///
/// - [image]: Only images (JPG, PNG, etc.)
/// - [video]: Only videos
/// - [media]: Either image or video (single or multiple, depending on [multi])
enum PickerMediaType { image, video, media }

/// The result of a pick operation.
///
/// Use [PickerSuccess] for a single file, [PickerMultiSuccess] for multiple files,
/// or [PickerError] for errors or user cancellation.
sealed class PickerResult {
  const PickerResult();
}

/// Success result for a single picked file.
class PickerSuccess extends PickerResult {
  /// The picked file (image or video).
  final File file;

  /// The type of media picked.
  final PickerMediaType type;

  const PickerSuccess({required this.file, required this.type});
}

/// Success result for multiple picked files.
class PickerMultiSuccess extends PickerResult {
  /// The list of picked files (images/videos).
  final List<PickerSuccess> files;

  const PickerMultiSuccess({required this.files});
}

/// Error result for a pick operation.
class PickerError extends PickerResult {
  /// The error message or reason for failure/cancellation.
  final String message;

  const PickerError(this.message);
}

/// Options for picking images, videos, or media.
class ImagePickerOptions {
  /// Source for picking (gallery or camera).
  final ImageSource source;

  /// Preferred camera device (if using camera).
  final CameraDevice preferredCameraDevice;

  /// Whether to request full metadata (may require extra permissions).
  final bool requestFullMetadata;

  /// Whether to allow multiple selection (if supported).
  final bool multi;

  /// Limit for multi-pick (if supported).
  final int? multiLimit;

  /// Image quality (0-100) for picked images.
  final int? imageQuality;

  /// Max width for picked images.
  final double? maxWidth;

  /// Max height for picked images.
  final double? maxHeight;

  const ImagePickerOptions({
    this.source = ImageSource.gallery,
    this.preferredCameraDevice = CameraDevice.rear,
    this.requestFullMetadata = true,
    this.multi = false,
    this.multiLimit,
    this.imageQuality,
    this.maxWidth,
    this.maxHeight,
  });
}

/// Options for cropping images.
class CropperOptions {
  /// Whether to enable cropping.
  final bool crop;

  /// Custom cropper UI settings (platform-specific).
  final List<PlatformUiSettings>? uiSettings;

  /// Max width for cropped image.
  final double? maxWidth;

  /// Max height for cropped image.
  final double? maxHeight;

  /// Fixed aspect ratio for cropping (null = freeform).
  final CropAspectRatio? aspectRatio;

  /// List of aspect ratio presets for cropper UI.
  final List<CropAspectRatioPreset>? aspectRatioPresets;

  /// Rectangle or circle crop style.
  final CropStyle cropStyle;

  /// Output format for cropped image.
  final ImageCompressFormat compressFormat;

  /// Output quality (0-100) for cropped image.
  final int compressQuality;

  const CropperOptions({
    this.crop = true,
    this.uiSettings,
    this.maxWidth,
    this.maxHeight,
    this.aspectRatio,
    this.aspectRatioPresets,
    this.cropStyle = CropStyle.rectangle,
    this.compressFormat = ImageCompressFormat.jpg,
    this.compressQuality = 90,
  });
}

/// PickerUtils is a callback-based utility for picking images, videos, or media with optional cropping.
class PickerUtils {
  PickerUtils._(); // Private constructor, but not used

  /// Factory: Pick a single image with optional cropping.
  static void singleImage({
    ImagePickerOptions pickerOptions = const ImagePickerOptions(),
    CropperOptions cropperOptions = const CropperOptions(),
    void Function(PickerSuccess result)? onSuccess,
    void Function(PickerError error)? onError,
  }) {
    _pick(
      type: PickerMediaType.image,
      pickerOptions: pickerOptions,
      cropperOptions: cropperOptions,
      context: null,
    ).then((result) {
      if (result is PickerSuccess) {
        onSuccess?.call(result);
      } else if (result is PickerError) {
        onError?.call(result);
      } else {
        onError?.call(PickerError('Unexpected result type'));
      }
    });
  }

  /// Factory: Pick multiple images (cropping not supported).
  static void multiImage({
    ImagePickerOptions pickerOptions = const ImagePickerOptions(multi: true),
    void Function(PickerMultiSuccess result)? onSuccess,
    void Function(PickerError error)? onError,
  }) {
    _pick(
      type: PickerMediaType.image,
      pickerOptions: pickerOptions,
      cropperOptions: const CropperOptions(crop: false),
      context: null,
    ).then((result) {
      if (result is PickerMultiSuccess) {
        onSuccess?.call(result);
      } else if (result is PickerError) {
        onError?.call(result);
      } else {
        onError?.call(PickerError('Unexpected result type'));
      }
    });
  }

  /// Factory: Pick a single video (cropping not supported).
  static void singleVideo({
    ImagePickerOptions pickerOptions = const ImagePickerOptions(),
    void Function(PickerSuccess result)? onSuccess,
    void Function(PickerError error)? onError,
  }) {
    _pick(
      type: PickerMediaType.video,
      pickerOptions: pickerOptions,
      cropperOptions: const CropperOptions(crop: false),
      context: null,
    ).then((result) {
      if (result is PickerSuccess) {
        onSuccess?.call(result);
      } else if (result is PickerError) {
        onError?.call(result);
      } else {
        onError?.call(PickerError('Unexpected result type'));
      }
    });
  }

  /// Factory: Pick a single image or video (media) (cropping not supported).
  static void singleMedia({
    ImagePickerOptions pickerOptions = const ImagePickerOptions(),
    void Function(PickerSuccess result)? onSuccess,
    void Function(PickerError error)? onError,
  }) {
    _pick(
      type: PickerMediaType.media,
      pickerOptions: pickerOptions,
      cropperOptions: const CropperOptions(crop: false),
      context: null,
    ).then((result) {
      if (result is PickerSuccess) {
        onSuccess?.call(result);
      } else if (result is PickerError) {
        onError?.call(result);
      } else {
        onError?.call(PickerError('Unexpected result type'));
      }
    });
  }

  /// Factory: Pick multiple images or videos (media) (cropping not supported).
  static void multiMedia({
    ImagePickerOptions pickerOptions = const ImagePickerOptions(multi: true),
    void Function(PickerMultiSuccess result)? onSuccess,
    void Function(PickerError error)? onError,
  }) {
    _pick(
      type: PickerMediaType.media,
      pickerOptions: pickerOptions,
      cropperOptions: const CropperOptions(crop: false),
      context: null,
    ).then((result) {
      if (result is PickerMultiSuccess) {
        onSuccess?.call(result);
      } else if (result is PickerError) {
        onError?.call(result);
      } else {
        onError?.call(PickerError('Unexpected result type'));
      }
    });
  }

  /// Lets the developer pick an image and crop it in a circle (for profile pictures).
  static void profileImage({
    ImageSource source = ImageSource.gallery,
    void Function(PickerSuccess result)? onSuccess,
    void Function(PickerError error)? onError,
  }) {
    PickerUtils.singleImage(
      pickerOptions: ImagePickerOptions(source: source),
      cropperOptions: CropperOptions(
        crop: true,
        cropStyle: CropStyle.circle,
        aspectRatio: const CropAspectRatio(ratioX: 1, ratioY: 1),
        aspectRatioPresets: [CropAspectRatioPreset.square],
      ),
      onSuccess: onSuccess,
      onError: onError,
    );
  }

  // Internal: main pick logic (same as previous static method, but now private)
  static Future<PickerResult> _pick({
    required PickerMediaType type,
    required ImagePickerOptions pickerOptions,
    required CropperOptions cropperOptions,
    BuildContext? context,
  }) async {
    try {
      final ImagePicker picker = ImagePicker();
      if (pickerOptions.multi) {
        final picked = switch (type) {
          PickerMediaType.image => await picker.pickMultiImage(
            maxWidth: pickerOptions.maxWidth,
            maxHeight: pickerOptions.maxHeight,
            imageQuality: pickerOptions.imageQuality,
            limit: pickerOptions.multiLimit,
            requestFullMetadata: pickerOptions.requestFullMetadata,
          ),
          PickerMediaType.media => await picker.pickMultipleMedia(
            maxWidth: pickerOptions.maxWidth,
            maxHeight: pickerOptions.maxHeight,
            imageQuality: pickerOptions.imageQuality,
            limit: pickerOptions.multiLimit,
            requestFullMetadata: pickerOptions.requestFullMetadata,
          ),
          PickerMediaType.video => [
            if (await picker.pickVideo(
                  source: pickerOptions.source,
                  preferredCameraDevice: pickerOptions.preferredCameraDevice,
                )
                case final XFile video?)
              video,
          ],
        };
        if (picked.isEmpty) return const PickerError('User cancelled picking.');
        // CropperOptions are ignored for multi-pick and non-image picks.
        return PickerMultiSuccess(
          files: [for (final x in picked) PickerSuccess(file: File(x.path), type: type)],
        );
      } else {
        final picked = switch (type) {
          PickerMediaType.image => await picker.pickImage(
            source: pickerOptions.source,
            preferredCameraDevice: pickerOptions.preferredCameraDevice,
            maxWidth: pickerOptions.maxWidth,
            maxHeight: pickerOptions.maxHeight,
            imageQuality: pickerOptions.imageQuality,
            requestFullMetadata: pickerOptions.requestFullMetadata,
          ),
          PickerMediaType.video => await picker.pickVideo(
            source: pickerOptions.source,
            preferredCameraDevice: pickerOptions.preferredCameraDevice,
          ),
          PickerMediaType.media => await picker.pickMedia(
            maxWidth: pickerOptions.maxWidth,
            maxHeight: pickerOptions.maxHeight,
            imageQuality: pickerOptions.imageQuality,
            requestFullMetadata: pickerOptions.requestFullMetadata,
          ),
        };
        if (picked == null) return const PickerError('User cancelled picking.');
        if (type == PickerMediaType.image && cropperOptions.crop) {
          final cropped = await ImageCropper().cropImage(
            sourcePath: picked.path,
            maxWidth: cropperOptions.maxWidth?.toInt(),
            maxHeight: cropperOptions.maxHeight?.toInt(),
            aspectRatio: cropperOptions.aspectRatio,
            compressFormat: cropperOptions.compressFormat,
            compressQuality: cropperOptions.compressQuality,
            uiSettings:
                cropperOptions.uiSettings ??
                [
                  AndroidUiSettings(
                    toolbarTitle: '',
                    toolbarColor: Colors.black,
                    toolbarWidgetColor: Colors.white,
                    initAspectRatio: CropAspectRatioPreset.original,
                    hideBottomControls: true,
                    lockAspectRatio: false,
                    cropStyle: cropperOptions.cropStyle,
                  ),
                  IOSUiSettings(
                    title: '',
                    hidesNavigationBar: true,
                    rotateButtonsHidden: true,
                    aspectRatioPickerButtonHidden: true,
                    rotateClockwiseButtonHidden: true,
                  ),
                ],
          );
          if (cropped == null) {
            final file = File(picked.path);
            if (file.existsSync()) file.deleteSync();
            return const PickerError('User cancelled cropping.');
          }
          return PickerSuccess(file: File(cropped.path), type: type);
        } else {
          return PickerSuccess(file: File(picked.path), type: type);
        }
      }
    } catch (e) {
      return PickerError(e.toString());
    }
  }
}
```