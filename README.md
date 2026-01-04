
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

# Flash Alert Extensions on BuildContext

These extensions provide easy-to-use methods for showing floating error, success, and info alerts (toasts) using the [`flash`](https://pub.dev/packages/flash) package.

### Dependencies

Run this command:

```bash
flutter pub add flash
```

### Usage

```dart
// Show error
context.showErrorAlert('Something went wrong!');

// Show success
context.showSuccessAlert('Operation successful!');

// Show info
context.showInfoAlert('This is some useful information.');
```

### ContextAlertX Extension Code

```dart
import 'package:flash/flash.dart';
import 'package:flash/flash_helper.dart';
import 'package:flutter/material.dart';

extension ContextAlertX on BuildContext {
  /// to show error alert
  void showErrorAlert(String content, {Duration? duration}) => this.showFlash<void>(
    builder: (context, controller) {
      final errorColor = const Color(0xFFE57373);
      return FlashBar(
        controller: controller,
        position: FlashPosition.top,
        behavior: FlashBehavior.floating,
        content: Text(content, style: textTheme.bodyMedium?.copyWith(color: Colors.white)),
        backgroundColor: Colors.black,
        indicatorColor: errorColor,
        icon: Icon(Icons.error_outline, color: errorColor),
        shouldIconPulse: false,
        margin: EdgeInsets.symmetric(horizontal: 16),
        forwardAnimationCurve: Curves.bounceOut,
      );
    },
    duration: duration ?? const Duration(seconds: 3),
  );

  /// to show success alert
  void showSuccessAlert(String content, {Duration? duration}) => this.showFlash<void>(
    builder: (context, controller) {
      const successColor = Color(0xFF81C784);
      return FlashBar(
        controller: controller,
        position: FlashPosition.top,
        behavior: FlashBehavior.floating,
        content: Text(content, style: textTheme.bodyMedium?.copyWith(color: Colors.white)),
        backgroundColor: Colors.black,
        indicatorColor: successColor,
        icon: Icon(Icons.check_circle_outline, color: successColor),
        shouldIconPulse: false,
        margin: EdgeInsets.symmetric(horizontal: 16),
        forwardAnimationCurve: Curves.bounceOut,
      );
    },
    duration: duration ?? const Duration(seconds: 3),
  );

  /// to show info alert
  void showInfoAlert(String content) => this.showFlash<void>(
    builder: (context, controller) {
      const infoColor = Color(0xFF64B5F6);
      return FlashBar(
        controller: controller,
        position: FlashPosition.top,
        behavior: FlashBehavior.floating,
        content: Text(content, style: textTheme.bodyMedium?.copyWith(color: Colors.white)),
        backgroundColor: Colors.black,
        indicatorColor: infoColor,
        icon: Icon(Icons.info_outline, color: infoColor),
        shouldIconPulse: false,
        margin: EdgeInsets.symmetric(horizontal: 16),
        forwardAnimationCurve: Curves.bounceOut,
      );
    },
    duration: const Duration(seconds: 2),
  );
}
```

# Minimum Build Context Extensions

These extensions provide convenient access to common `BuildContext` properties like theme data, screen size, and padding, allowing for cleaner and more readable code.

### Usage

```dart
// Access theme data
final theme = context.theme;

// Check for dark mode
if (context.isDarkMode) {
  // ...
}

// Get screen size
final size = context.sizeOf;

// Access custom theme extensions
final appColors = context.appColors;
```

### BuildContextX Extension Code

```dart
import 'package:flutter/material.dart';

extension BuildContextX on BuildContext {
  /// Returns the current [ThemeData] from the [Theme] widget.
  ///
  /// Example:
  /// ```dart
  /// final theme = context.theme;
  /// ```
  ThemeData get theme => Theme.of(this);

  /// Returns the current [TextTheme] from the current theme.
  ///
  /// Example:
  /// ```dart
  /// final textStyle = context.textTheme.bodyLarge;
  /// ```
  TextTheme get textTheme => theme.textTheme;

  /// Returns the current [ColorScheme] from the current theme.
  ///
  /// Example:
  /// ```dart
  /// final primaryColor = context.colorScheme.primary;
  /// ```
  ColorScheme get colorScheme => theme.colorScheme;

  /// Returns the custom [AppColors] extension registered in the theme.
  ///
  /// Example:
  /// ```dart
  /// final background = context.appColors.background;
  /// ```
  AppColors get appColors => theme.extension<AppColors>()!;

  /// Returns the custom [AppTextColors] extension registered in the theme.
  ///
  /// Example:
  /// ```dart
  /// final titleColor = context.appTextColors.title;
  /// ```
  AppTextColors get appTextColors => theme.extension<AppTextColors>()!;

  /// Returns the [Size] of the screen using `MediaQuery.sizeOf`.
  ///
  /// Example:
  /// ```dart
  /// final screenSize = context.sizeOf;
  /// ```
  Size get sizeOf => MediaQuery.sizeOf(this);

  /// Returns the full screen width.
  ///
  /// Example:
  /// ```dart
  /// final screenWidth = context.width;
  /// ```
  double get width => sizeOf.width;

  /// Returns the full screen height.
  ///
  /// Example:
  /// ```dart
  /// final screenHeight = context.height;
  /// ```
  double get height => sizeOf.height;

  /// Returns true if the theme is dark mode.
  ///
  /// Example:
  /// ```dart
  /// final isDark = context.isDarkMode;
  /// ```
  bool get isDarkMode => theme.brightness == Brightness.dark;

  /// Returns the padding from [MediaQuery], such as notch, status bar, or navigation bar.
  ///
  /// Example:
  /// ```dart
  /// final safePadding = context.paddingOf.top;
  /// ```
  EdgeInsets get paddingOf => MediaQuery.paddingOf(this);

  /// Returns the view insets from [MediaQuery], such as the on-screen keyboard height.
  ///
  /// Example:
  /// ```dart
  /// final keyboardHeight = context.viewInsetsOf.bottom;
  /// ```
  EdgeInsets get viewInsetsOf => MediaQuery.viewInsetsOf(this);

  /// Returns the view padding from [MediaQuery], representing system UI padding.
  ///
  /// Example:
  /// ```dart
  /// final statusBarPadding = context.viewPaddingOf.top;
  /// ```
  EdgeInsets get viewPaddingOf => MediaQuery.viewPaddingOf(this);

  /// Returns the current device orientation, portrait or landscape.
  ///
  /// Example:
  /// ```dart
  /// if (context.orientation == Orientation.portrait) { ... }
  /// ```
  Orientation get orientation => MediaQuery.orientationOf(this);

  /// Unfocuses the current focused widget, typically used to dismiss the keyboard.
  ///
  /// Example:
  /// ```dart
  /// context.unFocus();
  /// ```
  void unFocus() => FocusScope.of(this).unfocus();
}
```

# AppColors Theme Extension

This class allows you to define and access custom color schemes for both light and dark themes, extending the built-in `ThemeExtension` mechanism. It is used in conjunction with the `BuildContextX` extension (`context.appColors`).

### Usage

1.  **Register the extension in your `ThemeData`:**

```dart
MaterialApp(
  theme: ThemeData(
    extensions: <ThemeExtension<dynamic>>[
      AppColors.light,
    ],
  ),
  darkTheme: ThemeData(
    brightness: Brightness.dark,
    extensions: <ThemeExtension<dynamic>>[
      AppColors.dark,
    ],
  ),
  // ...
)
```

2.  **Access colors in your widgets:**

```dart
final primary = context.appColors.primary;
```

### AppColors Class Code

```dart
import 'package:flutter/material.dart';

/// A custom theme extension for app-specific colors.
///
/// This class allows you to define and access custom color schemes for both
/// light and dark themes, extending the built-in ThemeExtension mechanism.
@immutable
class AppColors extends ThemeExtension<AppColors> {
  /// Creates an [AppColors] theme extension.
  const AppColors({
    required this.primary,
    required this.secondary,
    required this.scaffoldBackground,
    required this.iconColor,
    required this.disableColor,
    required this.outlineColor,
    required this.error,
    required this.warning,
  });

  /// The primary color for the app.
  final Color primary;

  /// The secondary color for the app.
  final Color secondary;

  /// The scaffold color for the app.
  final Color scaffoldBackground;

  /// The icon color for the app.
  final Color iconColor;

  /// The disable color for the app.
  final Color disableColor;

  /// The outline color for the app.
  final Color outlineColor;

  /// The error color for the app.
  final Color error;

  /// The warning color for the app.
  final Color warning;

  /// The light color scheme instance.
  static const AppColors light = AppColors(
    primary: Color(0xFF24338C),
    secondary: Color(0xFF34AD44),
    scaffoldBackground: Color(0xFFF5F7FA),
    iconColor: Color(0xFF2D2D2D),
    disableColor: Color(0xFFE9E9E9),
    outlineColor: Color(0xFFE9E9E9),
    error: Color(0xFFBF1A1A),
    warning: Color(0xFFEBB402),
  );

  /// The dark color scheme instance.
  static const AppColors dark = AppColors(
    primary: Color(0xFF3A4DB0),
    // A lighter, less saturated blue-grey
    secondary: Color(0xFF53BC62),
    scaffoldBackground: Color(0xFF10121D),
    // Example: Very dark grey
    iconColor: Color(0xFFFFFFFF),
    // Example: White for dark theme
    disableColor: Color(0xFF3A3A3A),
    // A dark grey for disabled state in dark theme
    outlineColor: Color(0xFF333333),
    // A dark grey for outlines in dark theme
    error: Color(0xFFD94C4C),
    // Lighter error red for dark theme
    warning: Color(0xFFFFC107), // Lighter warning yellow for dark mode
  );

  @override
  AppColors copyWith({
    Color? primary,
    Color? secondary,
    Color? scaffoldBackground,
    Color? iconColor,
    Color? disableColor,
    Color? outlineColor,
    Color? error,
    Color? warning,
  }) {
    return AppColors(
      primary: primary ?? this.primary,
      secondary: secondary ?? this.secondary,
      scaffoldBackground: scaffoldBackground ?? this.scaffoldBackground,
      iconColor: iconColor ?? this.iconColor,
      disableColor: disableColor ?? this.disableColor,
      outlineColor: outlineColor ?? this.outlineColor,
      error: error ?? this.error,
      warning: warning ?? this.warning,
    );
  }

  @override
  AppColors lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) return this;
    return AppColors(
      primary: Color.lerp(primary, other.primary, t)!,
      secondary: Color.lerp(secondary, other.secondary, t)!,
      scaffoldBackground: Color.lerp(scaffoldBackground, other.scaffoldBackground, t)!,
      iconColor: Color.lerp(iconColor, other.iconColor, t)!,
      disableColor: Color.lerp(disableColor, other.disableColor, t)!,
      outlineColor: Color.lerp(outlineColor, other.outlineColor, t)!,
      error: Color.lerp(error, other.error, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
    );
  }
}
```

# AppTextColors Theme Extension

This class allows you to define and access custom text color schemes for both light and dark themes, extending the built-in `ThemeExtension` mechanism.

### Usage

1.  **Register the extension in your `ThemeData`:**

```dart
MaterialApp(
  theme: ThemeData(
    extensions: <ThemeExtension<dynamic>>[
      AppColors.light,
      AppTextColors.light,
    ],
  ),
  darkTheme: ThemeData(
    brightness: Brightness.dark,
    extensions: <ThemeExtension<dynamic>>[
      AppColors.dark,
      AppTextColors.dark,
    ],
  ),
  // ...
)
```

2.  **Access colors in your widgets:**

```dart
final titleColor = context.appTextColors.primary;
```

### AppTextColors Class Code

```dart
import 'package:flutter/material.dart';

/// A custom theme extension for app-specific text colors.
///
/// This class allows you to define and access custom text color schemes for both
/// light and dark themes, extending the built-in ThemeExtension mechanism.
@immutable
class AppTextColors extends ThemeExtension<AppTextColors> {
  /// Creates an [AppTextColors] theme extension.
  const AppTextColors({required this.primary, required this.secondary, required this.textHint});

  /// The primary text color for the app.
  final Color primary;

  /// The secondary/accent text color for the app (e.g., labels).
  final Color secondary;

  /// The text hint color for the app.
  final Color textHint;

  /// The light text color scheme instance.
  static const AppTextColors light = AppTextColors(
    primary: Color(0xFF2D2D2D), // #2D2D2D
    secondary: Color(0xFF818181), // #818181
    textHint: Color(0xFFC0C6CD), // #C0C6CD
  );

  /// The dark text color scheme instance.
  static const AppTextColors dark = AppTextColors(
    primary: Color(0xFFF8F9FB), // #F8F9FB
    secondary: Color(0xFFA3A3A3), // #A3A3A3 (dark variant of #818181)
    textHint: Color(0xFF6A7077), // #6A7077 (dark variant of #C0C6CD)
  );

  @override
  AppTextColors copyWith({Color? primary, Color? secondary, Color? textHint}) {
    return AppTextColors(
      primary: primary ?? this.primary,
      secondary: secondary ?? this.secondary,
      textHint: textHint ?? this.textHint,
    );
  }

  @override
  AppTextColors lerp(ThemeExtension<AppTextColors>? other, double t) {
    if (other is! AppTextColors) return this;
    return AppTextColors(
      primary: Color.lerp(primary, other.primary, t)!,
      secondary: Color.lerp(secondary, other.secondary, t)!,
      textHint: Color.lerp(textHint, other.textHint, t)!,
    );
  }
}
```

# DateTime Extension

This extension simplifies common date and time operations, formatting, and checks.

### Dependencies

This extension relies on the `intl` package. Run this command:

```bash
flutter pub add intl
```

### Usage

```dart
final now = DateTime.now();

// Formatting
print(now.hm24); // 14:30
print(now.hm12); // 2:30 PM
print(now.dMy);  // 24/06/2025

// Checks
if (now.isToday) { ... }
if (now.isWeekend) { ... }

// Utils
print(now.relativeLabel); // "Today", "Yesterday", or "21 Jun 2025"
```

### DateTimeX Extension Code

```dart
import 'package:intl/intl.dart';

/// Extension on DateTime
extension DateTimeX on DateTime {
  // -----------------------------
  // 🕒 Time Formatting
  // -----------------------------

  /// Returns time in 24-hour format: `HH:mm`.
  ///
  /// Example:
  /// ```dart
  /// final time = DateTime.now().hm24; // e.g., "14:30"
  /// ```
  String get hm24 => DateFormat.Hm().format(this);

  /// Returns time in 12-hour format with AM/PM: `hh:mm a`.
  ///
  /// Example:
  /// ```dart
  /// final time = DateTime.now().hm12; // e.g., "2:30 PM"
  /// ```
  String get hm12 => DateFormat.jm().format(this);

  // -----------------------------
  // 📆 Date Checks
  // -----------------------------

  /// Returns `true` if this date is today.
  ///
  /// Example:
  /// ```dart
  /// if (date.isToday) print("Today");
  /// ```
  bool get isToday {
    final now = DateTime.now();
    return year == now.year && month == now.month && day == now.day;
  }

  /// Returns `true` if this date is yesterday.
  ///
  /// Example:
  /// ```dart
  /// if (date.isYesterday) print("Yesterday");
  /// ```
  bool get isYesterday {
    final yesterday = DateTime.now().subtract(const Duration(days: 1));
    return year == yesterday.year && month == yesterday.month && day == yesterday.day;
  }

  /// Returns `true` if this date is tomorrow.
  ///
  /// Example:
  /// ```dart
  /// if (date.isTomorrow) print("Tomorrow");
  /// ```
  bool get isTomorrow {
    final tomorrow = DateTime.now().add(const Duration(days: 1));
    return year == tomorrow.year && month == tomorrow.month && day == tomorrow.day;
  }

  /// Returns `true` if this date is in the past.
  ///
  /// Example:
  /// ```dart
  /// if (date.isPast) print("This is a past date");
  /// ```
  bool get isPast => isBefore(DateTime.now());

  /// Returns `true` if this date is in the future.
  ///
  /// Example:
  /// ```dart
  /// if (date.isFuture) print("This is a future date");
  /// ```
  bool get isFuture => isAfter(DateTime.now());

  /// Returns the date formatted as "dd/MM/yyyy".
  ///
  /// Example:
  /// ```dart
  /// final formatted = DateTime.now().dMy; // e.g., "24/06/2025"
  /// ```
  String get dMy => DateFormat('dd/MM/yyyy').format(this);

  /// Returns the date formatted using a custom format string.
  ///
  /// Example:
  /// ```dart
  /// final formatted = date.toFormat('yyyy-MM-dd');
  /// ```
  String toFormat(String format) => DateFormat(format).format(this);

  // -----------------------------
  // 🔁 Extras
  // -----------------------------
  /// Returns `true` if this date is the same as [other] (year, month, and day).
  bool isSameDay(DateTime other) => year == other.year && month == other.month && day == other.day;

  /// Returns the first day of the month.
  DateTime get startDateOfMonth => DateTime(year, month, 1);

  /// Returns the last day of the month.
  DateTime get endDateOfMonth => DateTime(year, month + 1, 0);

  /// Returns `true` if the date falls on Saturday or Sunday.
  bool get isWeekend => weekday == DateTime.saturday || weekday == DateTime.sunday;

  /// Returns a relative label such as "Today", "Yesterday", "Tomorrow",
  /// or formatted as "d MMM y" (e.g., 21 Jun 2025).
  String get relativeLabel {
    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';
    if (isTomorrow) return 'Tomorrow';
    return dMMMy;
  }

  /// Returns the date formatted as "d MMM y" (e.g., 21 Jun 2025).
  String get dMMMy => toFormat('d MMM y');

  /// Returns true if this date is in the given range (inclusive).
  ///
  /// Example:
  /// ```dart
  /// if (date.isInRange(start, end)) print("In range");
  /// ```
  bool isInRange(DateTime start, DateTime end) => !isBefore(start) && !isAfter(end);
}
```

# Int Extension

This extension provides convenient getters for `Duration` conversions, range checks, and ordinal formatting.

### Usage

```dart
// Duration conversions
await Future.delayed(2.seconds);

// Range check
if (5.isInRange(1, 10)) {
  print('In range');
}

// Ordinal format
print(21.ordinal); // "21st"
```

### IntX Extension Code

```dart
/// Extension On Int
extension IntX on int {
  // -----------------------
  // ⏱️ Duration conversions
  // -----------------------

  /// Converts the int to a [Duration] in seconds.
  ///
  /// Example:
  /// ```dart
  /// 5.seconds => Duration(seconds: 5)
  /// ```
  Duration get seconds => Duration(seconds: this);

  /// Converts the int to a [Duration] in minutes.
  ///
  /// Example:
  /// ```dart
  /// 2.minutes => Duration(minutes: 2)
  /// ```
  Duration get minutes => Duration(minutes: this);

  /// Converts the int to a [Duration] in hours.
  ///
  /// Example:
  /// ```dart
  /// 1.hours => Duration(hours: 1)
  /// ```
  Duration get hours => Duration(hours: this);

  /// Converts the int to a [Duration] in milliseconds.
  ///
  /// Example:
  /// ```dart
  /// 500.milliseconds => Duration(milliseconds: 500)
  /// ```
  Duration get milliseconds => Duration(milliseconds: this);

  /// Converts the int to a [Duration] in microseconds.
  ///
  /// Example:
  /// ```dart
  /// 100.microseconds => Duration(microseconds: 100)
  /// ```
  Duration get microseconds => Duration(microseconds: this);

  // -----------------------
  // ✅ Range validation
  // -----------------------

  /// Returns `true` if this int is between [min] and [max], inclusive.
  ///
  /// Example:
  /// ```dart
  /// 5.isInRange(1, 10); // true
  /// 15.isInRange(1, 10); // false
  /// ```
  bool isInRange(int min, int max) => this >= min && this <= max;

  // -----------------------
  // 🔁 Boolean conversion
  // -----------------------

  /// Returns `true` if the int is non-zero.
  ///
  /// Example:
  /// ```dart
  /// 1.asBool => true
  /// 0.asBool => false
  /// ```
  bool get asBool => this != 0;

  // -----------------------
  // 🔢 Ordinal formatter
  // -----------------------

  /// Converts the integer to its ordinal representation.
  ///
  /// Example:
  /// ```dart
  /// 1.ordinal => '1st'
  /// 2.ordinal => '2nd'
  /// 3.ordinal => '3rd'
  /// 4.ordinal => '4th'
  /// 11.ordinal => '11th'
  /// 21.ordinal => '21st'
  /// ```
  String get ordinal {
    if ((this % 100 >= 11) && (this % 100 <= 13)) {
      return '${this}th';
    }
    switch (this % 10) {
      case 1:
        return '${this}st';
      case 2:
        return '${this}nd';
      case 3:
        return '${this}rd';
      default:
        return '${this}th';
  }
}
```

# Num Extension

This extension provides convenient formatting for numbers, including comma separation, percentage, compact notation, currency, and file size conversions.

### Usage

```dart
// Formatting
print(1234567.commaSeparated); // "1,234,567"
print(0.25.toPercentage);      // "25%"
print(1200.compact);           // "1.2K"

// Currency
print(1234.56.toCurrency());             // ₹1,234.56
print(1234.56.toCurrency(symbol: '\$')); // $1,234.56

// File Size
print(1024.toKB()); // 1.0
```

### NumX Extension Code

```dart
import 'package:intl/intl.dart';

/// Extension of Num
extension NumX on num {
  /// Returns the number formatted with commas as thousands separators.
  ///
  /// Example:
  /// ```dart
  /// 1234567.commaSeparated => '1,234,567'
  /// ```
  String get commaSeparated => NumberFormat.decimalPattern().format(this);

  /// Returns the number formatted as a percentage string (e.g., "25%").
  ///
  /// Example:
  /// ```dart
  /// 0.25.toPercentage => '25%'
  /// 0.789.toPercentage => '78.9%'
  /// ```
  String get toPercentage => NumberFormat.percentPattern().format(this);

  /// Returns the number in a compact form (e.g., 1.2K, 3.4M).
  ///
  /// Example:
  /// ```dart
  /// 1200.compact => '1.2K'
  /// 3400000.compact => '3.4M'
  /// ```
  String get compact => NumberFormat.compact().format(this);

  /// Returns the number formatted as currency.
  ///
  /// You can optionally specify a [symbol] (default: '₹') and [decimalDigits].
  ///
  /// Example:
  /// ```dart
  /// 1234.56.toCurrency();           // ₹1,234.56
  /// 1234.56.toCurrency(symbol: '\$'); // $1,234.56
  /// ```
  String toCurrency({String symbol = '₹', int decimalDigits = 2}) {
    return NumberFormat.currency(symbol: symbol, decimalDigits: decimalDigits).format(this);
  }

  // -----------------------
  // 📏 Size conversions
  // -----------------------

  /// Converts the int (bytes) to kilobytes as double.
  ///
  /// Example:
  /// ```dart
  /// 1024.toKB(); // 1.0
  /// ```
  double toKB() => this / 1024;

  /// Converts the int (bytes) to megabytes as double.
  ///
  /// Example:
  /// ```dart
  /// (1024 * 1024).toMB(); // 1.0
  /// ```
  double toMB() => this / (1024 * 1024);

  /// Converts the int (bytes) to gigabytes as double.
  ///
  /// Example:
  /// ```dart
  /// (1024 * 1024 * 1024).toGB(); // 1.0
  /// ```
  double toGB() => this / (1024 * 1024 * 1024);
}
```

# Object Nullable Extension

This extension provides a universal way to check if an object (String, List, Map, etc.) is null or empty.

### Usage

```dart
String? name = '';
print(name.isNullOrEmpty); // true

List? items = [1, 2];
print(items.isNotNullOrEmpty); // true
```

### ObjectNullableX Extension Code

```dart
/// Extension on Nullable Object
extension ObjectNullableX on Object? {
  /// Returns `true` if the object is `null` or considered "empty".
  ///
  /// - For `String`, `Iterable`, `Map`, etc., it checks `.isEmpty`.
  /// - For all other types, only checks for `null`.
  ///
  /// ### Example:
  /// ```dart
  /// String? name = '';
  /// print(name.isNullOrEmpty); // true
  ///
  /// List? items = null;
  /// print(items.isNullOrEmpty); // true
  ///
  /// var map = <String, dynamic>{};
  /// print(map.isNullOrEmpty); // true
  /// ```
  bool get isNullOrEmpty {
    if (this == null) return true;

    if (this is String) return (this as String).isEmpty;
    if (this is Iterable) return (this as Iterable).isEmpty;
    if (this is Map) return (this as Map).isEmpty;

    return false; // Not null and not a known "empty" type
  }

  /// Returns `true` if the object is not `null` and not empty.
  ///
  /// ### Example:
  /// ```dart
  /// String? name = 'hello';
  /// print(name.isNotNullOrEmpty); // true
  ///
  /// List numbers = [1, 2, 3];
  /// print(numbers.isNotNullOrEmpty); // true
  /// ```
  bool get isNotNullOrEmpty => !isNullOrEmpty;
}
```

# Input Formatters

A collection of custom `TextInputFormatter`s for common formatting tasks, including currency, credit/debit cards, preventing leading spaces, and robust number handling.

### 1. Currency Input Formatter (`CurrencyIF`)

Formats numeric input as currency with live comma insertion, optional custom symbol, decimal precision, and locale awareness.

#### Usage:

```dart
TextFormField(
  inputFormatters: [
    CurrencyIF.symbol(symbol: '₹', locale: 'en_IN'), // e.g., ₹1,23,456.00
  ],
)
```

#### Code:

```dart
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';

/// A custom [TextInputFormatter] for formatting currency input with commas, optional symbols,
/// decimal precision, and smart cursor position handling during user edits.
///
/// ### Example Usage:
/// ```dart
/// TextFormField(
///   inputFormatters: [
///     CurrencyIF.symbol(symbol: '₹',locale:'en_IN'),
///   ],
/// )
/// ```
class CurrencyIF extends TextInputFormatter {
  /// Currency symbol to prefix (e.g. ₹, $, €, etc.)
  final String symbol;

  /// Maximum allowed digits after the decimal point.
  final int maxDecimalDigits;

  /// Locale for currency formatting (e.g. 'en_IN', 'en_US', etc.)
  final String locale;

  CurrencyIF._({this.symbol = '\u20b9', this.maxDecimalDigits = 2, this.locale = 'en_IN'});

  /// Factory for custom symbol
  factory CurrencyIF.symbol({required String symbol, int maxDecimalDigits = 2, String locale = 'en_US'}) {
    return CurrencyIF._(symbol: symbol, maxDecimalDigits: maxDecimalDigits, locale: locale);
  }

  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    final newText = newValue.text;

    // Strip symbols and commas
    final rawNew = newText.replaceAll(RegExp('[^0-9.]'), '');

    if (rawNew.isEmpty) {
      return const TextEditingValue(text: '', selection: TextSelection.collapsed(offset: 0));
    }

    // Cursor logic: count digits before the original cursor
    final newCursorIndex = newValue.selection.baseOffset;
    final digitsBeforeCursor = _countDigitsBefore(newText, newCursorIndex);

    // Split integer and decimal
    final parts = rawNew.split('.');
    String integerPart = parts[0];
    String decimalPart = parts.length > 1 ? parts[1] : '';

    // Limit decimal digits
    if (decimalPart.length > maxDecimalDigits) {
      decimalPart = decimalPart.substring(0, maxDecimalDigits);
    }

    // Format only the integer part using NumberFormat.decimalPattern
    final intFormatter = NumberFormat.decimalPattern(locale);
    String formatted = intFormatter.format(int.tryParse(integerPart) ?? 0);

    // If user typed a decimal point
    bool hasDecimal = rawNew.contains('.');
    if (hasDecimal) {
      formatted += '.';
      // Add only as many decimal digits as user typed (no padding)
      formatted += decimalPart;
    }

    // --- Improved Cursor Handling ---
    int newFormattedCursor;
    // If the cursor is just before the decimal in the raw input, place it just before the decimal in the formatted output
    int rawDecimalIndex = newText.indexOf('.');
    if (hasDecimal && newCursorIndex == rawDecimalIndex) {
      // Find the index of the decimal in the formatted string
      int formattedDecimalIndex = formatted.indexOf('.');
      newFormattedCursor = formattedDecimalIndex;
    } else {
      newFormattedCursor = _indexOfNthDigit(formatted, digitsBeforeCursor);
    }
    // --- End Improved Cursor Handling ---

    return TextEditingValue(
      text: formatted,
      selection: TextSelection.collapsed(offset: newFormattedCursor),
    );
  }

  /// Returns the number of digits before the cursor in the original input.
  int _countDigitsBefore(String text, int cursor) {
    return text.substring(0, cursor).replaceAll(RegExp(r'[^0-9]'), '').length;
  }

  /// Finds the index of the nth digit in formatted text (used to restore cursor).
  int _indexOfNthDigit(String text, int digitPosition) {
    int count = 0;
    for (int i = 0; i < text.length; i++) {
      if (RegExp(r'[0-9]').hasMatch(text[i])) {
        if (count == digitPosition) {
          return i;
        }
        count++;
      }
    }
    return text.length;
  }
}
```

### 2. Credit/Debit Card Formatter (`DebitIF`)

Automatically inserts a space every 4 digits for readability.

#### Usage:

```dart
// Default: 16 digits
TextField(
  inputFormatters: [DebitIF()],
)

// Custom: 19 digits
TextField(
  inputFormatters: [DebitIF(maxLength: 19)],
)
```

#### Code:

```dart
import 'package:flutter/services.dart';

/// {@template card_input_formatter}
/// A [TextInputFormatter] for credit/debit card number input.
///
/// - Automatically inserts a space every 4 digits (e.g., '1234 5678 9012 3456').
/// - Supports flexible editing and robust cursor mapping.
/// - Only allows digits and spaces in the formatted output.
/// - The [maxLength] parameter controls the maximum number of digits (default: 16).
///
/// ## Usage Example
///
/// ```dart
/// // Default: 16 digits
/// TextField(
///   inputFormatters: [CardInputFormatter()],
/// )
///
/// // Custom: 19 digits (for some card types)
/// TextField(
///   inputFormatters: [CardInputFormatter(maxLength: 19)],
/// )
/// ```
/// {@endtemplate}
class DebitIF extends TextInputFormatter {
  /// The maximum number of digits allowed in the card number.
  final int maxLength;

  /// Creates a [DebitIF] with an optional [maxLength] (default: 16).
  DebitIF({this.maxLength = 16});

  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    final rawText = newValue.text;
    final selectionIndex = newValue.selection.baseOffset;

    // Remove all non-digit characters
    final digitsOnly = rawText.replaceAll(RegExp(r'[^0-9]'), '');
    final clampedDigits = digitsOnly.substring(0, digitsOnly.length.clamp(0, maxLength));

    // Format: insert a space every 4 digits
    final buffer = StringBuffer();
    List<int> rawToFormatted = [];
    int rawDigitIndex = 0;
    int formattedIndex = 0;
    for (; rawDigitIndex < clampedDigits.length; rawDigitIndex++) {
      if (rawDigitIndex > 0 && rawDigitIndex % 4 == 0) {
        buffer.write(' ');
        formattedIndex++;
      }
      buffer.write(clampedDigits[rawDigitIndex]);
      rawToFormatted.add(formattedIndex);
      formattedIndex++;
    }
    final formattedText = buffer.toString();

    // Calculate new cursor position
    int rawDigitsBeforeCursor = 0;
    for (int i = 0; i < selectionIndex && i < rawText.length; i++) {
      if (RegExp(r'[0-9]').hasMatch(rawText[i])) {
        rawDigitsBeforeCursor++;
      }
    }
    int adjustedCursorPosition;
    if (rawDigitsBeforeCursor == 0) {
      adjustedCursorPosition = 0;
    } else if (rawDigitsBeforeCursor <= rawToFormatted.length) {
      adjustedCursorPosition = rawToFormatted[rawDigitsBeforeCursor - 1] + 1;
    } else {
      adjustedCursorPosition = formattedText.length;
    }

    return TextEditingValue(
      text: formattedText,
      selection: TextSelection.collapsed(offset: adjustedCursorPosition.clamp(0, formattedText.length)),
    );
  }
}
```

### 3. No Leading Space Formatter (`NoLeadingSpaceIF`)

Prevents the user from starting the input with a space.

#### Usage:

```dart
TextField(
  inputFormatters: [NoLeadingSpaceIF()],
)
```

#### Code:

```dart
import 'package:flutter/services.dart';

/// {@template no_leading_space_input_formatter}
/// A [TextInputFormatter] that prevents the user from entering a leading space.
/// {@endtemplate}
class NoLeadingSpaceIF extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    // If the new text starts with a space, remove it
    if (newValue.text.startsWith(' ')) {
      final trimmed = newValue.text.replaceFirst(RegExp(r'^ +'), '');
      final diff = newValue.text.length - trimmed.length;
      return TextEditingValue(
        text: trimmed,
        selection: newValue.selection.copyWith(
          baseOffset: (newValue.selection.baseOffset - diff).clamp(0, trimmed.length),
          extentOffset: (newValue.selection.extentOffset - diff).clamp(0, trimmed.length),
        ),
      );
    }
    return newValue;
  }
}

```

### 4. Numeric Only Formatter (`NumberOnlyIF`)

A highly configurable formatter for restricting input to numbers, with options for decimals and negative values.

#### Usage:

```dart
// Integer only
TextField(inputFormatters: [NumberOnlyIF.integer()])

// Decimal allowed, max 2 digits
TextField(inputFormatters: [NumberOnlyIF.decimal(decimalLimit: 2)])

// Allow negative values
TextField(inputFormatters: [NumberOnlyIF.decimal(allowNegative: true)])
```

#### Code:

```dart
import 'package:flutter/services.dart';

/// A [TextInputFormatter] that allows only numbers, with optional decimal and negative support.
class NumberOnlyIF extends TextInputFormatter {
  /// If true, allows a decimal point ('.') and numbers can start with 0.
  /// If false, only integers are allowed and cannot start with 0 (unless '0').
  final bool decimalAllowed;

  /// The maximum number of digits allowed after the decimal point (if decimalAllowed is true).
  final int? decimalLimit;

  /// If true, allows a single leading '-' for negative numbers.
  final bool allowNegative;

  NumberOnlyIF._({this.decimalAllowed = false, this.decimalLimit, this.allowNegative = false});

  /// Creates a [NumberOnlyIF] for decimal numbers, with an optional [decimalLimit] and [allowNegative].
  factory NumberOnlyIF.decimal({int? decimalLimit, bool allowNegative = false}) =>
      NumberOnlyIF._(decimalAllowed: true, decimalLimit: decimalLimit, allowNegative: allowNegative);

  /// Creates a [NumberOnlyIF] for integers only, with optional [allowNegative].
  factory NumberOnlyIF.integer({bool allowNegative = false}) =>
      NumberOnlyIF._(decimalAllowed: false, allowNegative: allowNegative);

  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    String text = newValue.text;
    int selectionIndex = newValue.selection.baseOffset;

    // Remove all non-digit and (optionally) non-decimal/non-negative characters
    String filtered = '';
    int decimalCount = 0;
    int decimalIndex = -1;
    bool hasNegative = false;
    for (int i = 0; i < text.length; i++) {
      final char = text[i];
      if (allowNegative && char == '-' && filtered.isEmpty && !hasNegative) {
        filtered += char;
        hasNegative = true;
        if (i < selectionIndex) selectionIndex++;
      } else if (RegExp(r'[0-9]').hasMatch(char)) {
        // If decimalLimit is set, check if we're after the decimal
        if (decimalAllowed &&
            decimalLimit != null &&
            decimalIndex != -1 &&
            filtered.length - (hasNegative ? 1 : 0) > decimalIndex) {
          int afterDecimal = filtered.length - decimalIndex - 1 - (hasNegative ? 1 : 0);
          if (afterDecimal >= decimalLimit!) {
            if (i < selectionIndex) selectionIndex--;
            continue;
          }
        }
        filtered += char;
      } else if (decimalAllowed && char == '.') {
        if (decimalCount == 0) {
          filtered += char;
          decimalCount++;
          decimalIndex = filtered.length - 1 - (hasNegative ? 1 : 0);
        } else {
          // skip extra decimals
          if (i < selectionIndex) selectionIndex--;
        }
      } else {
        if (i < selectionIndex) selectionIndex--;
      }
    }

    // Integer only: cannot start with 0 (unless '0' or '-0')
    if (!decimalAllowed) {
      if (filtered.length > 1 && filtered.startsWith('0')) {
        filtered = filtered.replaceFirst(RegExp(r'^0+'), '');
        if (filtered.isEmpty) filtered = '0';
        selectionIndex = filtered.length;
      } else if (filtered.length > 2 && filtered.startsWith('-0')) {
        filtered = '-${filtered.substring(2).replaceFirst(RegExp(r'^0+'), '')}';
        if (filtered == '-') filtered = '-0';
        selectionIndex = filtered.length;
      }
    }

    // If decimal allowed, allow leading 0 and allow typing '.'
    // But do not allow more than one '.'
    if (decimalAllowed) {
      // Prevent multiple leading zeros before decimal (e.g., 00.12 -> 0.12)
      if (filtered.startsWith('00')) {
        filtered = filtered.replaceFirst(RegExp(r'^0+'), '0');
        selectionIndex = filtered.length;
      } else if (filtered.startsWith('-00')) {
        filtered = '-${filtered.substring(1).replaceFirst(RegExp(r'^0+'), '0')}';
        selectionIndex = filtered.length;
      }
      // Prevent starting with '.' (force to '0.')
      if (filtered.startsWith('.')) {
        filtered = '0$filtered';
        selectionIndex++;
      } else if (filtered.startsWith('-.')) {
        filtered = '-0.${filtered.substring(2)}';
        selectionIndex++;
      }
    }

    // --- Cursor fix for deleting just before the dot ---
    if (decimalAllowed && oldValue.text.contains('.') && filtered.contains('.')) {
      final oldDot = oldValue.text.indexOf('.');
      final newDot = filtered.indexOf('.');
      // If the user deleted the char just before the dot
      if (oldValue.selection.baseOffset == oldDot && newValue.selection.baseOffset == oldDot) {
        // Place cursor just before the dot
        selectionIndex = newDot;
      }
    }
    // --- End cursor fix ---

    return TextEditingValue(
      text: filtered,
      selection: TextSelection.collapsed(offset: selectionIndex.clamp(0, filtered.length)),
    );
  }
}
```

# App Theme Setup

This section outlines the setup for defining light and dark themes, including text themes and global `ThemeData` configurations. This setup leverages the `AppColors` and `AppTextColors` extensions defined earlier.

### 1. App Text Theme (`app_text_theme.dart`)

Defines responsive text styles for both light and dark modes, defaulting to the 'Roboto' font (configurable).

```dart
import 'package:flutter/material.dart';

// Ensure you import your AppColors/AppTextColors definition here
// import 'package:your_app/app_colors.dart'; 

/// Helper to generate text styles with responsive size and color.
/// If color is not provided, uses the theme's primary text color.
TextStyle appTextStyle(double size, FontWeight weight, {Color? color, bool isDark = false}) => TextStyle(
  fontSize: size,
  fontWeight: weight,
  height: 1.1,
  color: color ?? (isDark ? AppTextColors.dark.primary : AppTextColors.light.primary),
);
String? _fontFamily;

String get fontFamily => _fontFamily ??= 'Roboto';

set fontFamily(String name) => _fontFamily = name;

/// Custom Material 3 text theme for light mode.
final TextTheme appTextThemeLight = TextTheme(
  displayLarge: appTextStyle(57, FontWeight.w400),
  displayMedium: appTextStyle(45, FontWeight.w400),
  displaySmall: appTextStyle(36, FontWeight.w400),
  headlineLarge: appTextStyle(32, FontWeight.w400),
  headlineMedium: appTextStyle(28, FontWeight.w400),
  headlineSmall: appTextStyle(24, FontWeight.w400),
  titleLarge: appTextStyle(22, FontWeight.w400),
  titleMedium: appTextStyle(16, FontWeight.w500),
  titleSmall: appTextStyle(14, FontWeight.w500),
  bodyLarge: appTextStyle(16, FontWeight.w400),
  bodyMedium: appTextStyle(14, FontWeight.w400),
  bodySmall: appTextStyle(12, FontWeight.w400),
  labelLarge: appTextStyle(14, FontWeight.w500),
  labelMedium: appTextStyle(12, FontWeight.w500),
  labelSmall: appTextStyle(11, FontWeight.w500),
).apply(fontFamily: fontFamily);

/// Custom Material 3 text theme for dark mode.
final TextTheme appTextThemeDark = TextTheme(
  displayLarge: appTextStyle(57, FontWeight.w400, isDark: true),
  displayMedium: appTextStyle(45, FontWeight.w400, isDark: true),
  displaySmall: appTextStyle(36, FontWeight.w400, isDark: true),
  headlineLarge: appTextStyle(32, FontWeight.w400, isDark: true),
  headlineMedium: appTextStyle(28, FontWeight.w400, isDark: true),
  headlineSmall: appTextStyle(24, FontWeight.w400, isDark: true),
  titleLarge: appTextStyle(22, FontWeight.w400, isDark: true),
  titleMedium: appTextStyle(16, FontWeight.w500, isDark: true),
  titleSmall: appTextStyle(14, FontWeight.w500, isDark: true),
  bodyLarge: appTextStyle(16, FontWeight.w400, isDark: true),
  bodyMedium: appTextStyle(14, FontWeight.w400, isDark: true),
  bodySmall: appTextStyle(12, FontWeight.w400, isDark: true),
  labelLarge: appTextStyle(14, FontWeight.w500, isDark: true),
  labelMedium: appTextStyle(12, FontWeight.w500, isDark: true),
  labelSmall: appTextStyle(11, FontWeight.w500, isDark: true),
).apply(fontFamily: fontFamily);
```

### 2. App Light Theme (`app_light_theme.dart`)

Configures the standard `ThemeData` for light mode.

```dart
/// Provides the light theme for the app.
final ThemeData appThemeLight = ThemeData.light(useMaterial3: true).copyWith(
  colorScheme: ColorScheme.light(
    primary: AppColors.light.primary,
    secondary: AppColors.light.secondary,
    onSecondary: Colors.white,
    outline: AppColors.light.outlineColor,
    error: AppColors.light.error,
  ),
  disabledColor: AppColors.light.disableColor,
  scaffoldBackgroundColor: AppColors.light.scaffoldBackground,
  appBarTheme: AppBarTheme(
    centerTitle: false,
    foregroundColor: AppTextColors.light.primary,
    elevation: 0,
    titleTextStyle: appTextThemeLight.titleMedium,
    scrolledUnderElevation: 0,
  ),
  textTheme: appTextThemeLight,
  extensions: const <ThemeExtension<dynamic>>[AppColors.light, AppTextColors.light],
  dividerTheme: DividerThemeData(color: AppColors.light.outlineColor),
);
```

### 3. App Dark Theme (`app_dark_theme.dart`)

Configures the standard `ThemeData` for dark mode.

```dart
/// Provides the dark theme for the app.
final ThemeData appThemeDark = ThemeData.dark(useMaterial3: true).copyWith(
  colorScheme: ColorScheme.dark(
    primary: AppColors.dark.primary,
    secondary: AppColors.dark.secondary,
    outline: AppColors.dark.outlineColor,
    error: AppColors.dark.error,
  ),
  scaffoldBackgroundColor: AppColors.dark.scaffoldBackground,
  disabledColor: AppColors.dark.disableColor,
  appBarTheme: AppBarTheme(
    centerTitle: false,
    foregroundColor: AppTextColors.dark.primary,
    elevation: 0,
    titleTextStyle: appTextThemeDark.titleMedium,
    scrolledUnderElevation: 0,
  ),
  textTheme: appTextThemeDark,
  extensions: const <ThemeExtension<dynamic>>[AppColors.dark, AppTextColors.dark],
  dividerTheme: DividerThemeData(color: AppColors.dark.outlineColor),
);
```

### Usage

To use these themes, simply pass them to your `MaterialApp`:

```dart
MaterialApp(
  theme: appThemeLight,
  darkTheme: appThemeDark,
  themeMode: ThemeMode.system, // or ThemeMode.light / ThemeMode.dark
  home: const MyHomePage(),
);
```

# Debouncer Utility

A utility class that helps to debounce function calls. This is particularly useful for filtering search inputs or preventing rapid-fire API calls during user interaction.

The `Debouncer` will postpone the execution of a callback until a specified duration has passed since the last time it was invoked.

### Usage

1.  **Initialize the Debouncer:**
    You can specify delay in seconds or as a `Duration` object.

```dart
// 500ms delay
final searchDebouncer = Debouncer(duration: Duration(milliseconds: 500));

// 1 second delay
final apiDebouncer = Debouncer(seconds: 1);
```

2.  **Run an Action:**
    Call `.run()` with your callback. Each call resets the timer.

```dart
TextField(
  onChanged: (value) {
    searchDebouncer.run(() {
      print('Searching for: $value');
      // performSearch(value);
    });
  },
);
```

3.  **Dispose:**
    Always cancel the timer when the widget or controller is disposed.

```dart
@override
void dispose() {
  searchDebouncer.dispose();
  super.dispose();
}
```

### Debouncer Class Code

```dart
import 'dart:async';

import 'package:flutter/foundation.dart';

/// A utility class that helps to debounce function calls.
///
/// The [Debouncer] will postpone the execution of a callback until a specified duration
/// has passed since the last time it was invoked. This is useful for scenarios such as
/// search-as-you-type, where you want to wait for the user to stop typing before making
/// a network request.
///
/// You can specify the debounce duration either by [seconds] or by providing a custom [duration].
/// At least one of them must be non-null.
///
/// Example usage:
/// ```dart
/// final debouncer = Debouncer(seconds: 1);
///
/// // In your event handler:
/// debouncer.run(() {
///   // Your debounced code here
/// });
///
/// // Don't forget to dispose when done
/// debouncer.dispose();
/// ```
class Debouncer {
  /// Creates a [Debouncer] that will delay execution by [seconds] or a custom [duration].
  ///
  /// At least one of [seconds] or [duration] must be non-null.
  Debouncer({this.seconds, this.duration})
    : assert(seconds != null || duration != null, 'Either seconds or duration must be provided.');

  /// The debounce time in seconds. Optional if [duration] is provided.
  final int? seconds;

  /// The custom debounce [Duration]. Optional if [seconds] is provided.
  final Duration? duration;

  /// Internal timer used to track the debounce period.
  Timer? _timer;

  /// Runs the provided [action] after the debounce period.
  ///
  /// If called again before the debounce period ends, the previous timer is cancelled.
  void run(VoidCallback action) {
    _timer?.cancel();
    _timer = Timer(duration ?? Duration(seconds: seconds ?? 0), action);
  }

  /// Cancels any active timer and cleans up resources.
  void dispose() {
    _timer?.cancel();
  }
}
```

### Logger Utils Class

A utility class for logging messages with different severity levels (info, warning, error).

#### Usage
```dart
'Hello World'.logD;
```

```dart
import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';

final _logger = Logger(filter: _LogFilter());

/// logger extension
extension LoggerEx on Object? {
  /// to print message with debug level
  void get logD => _logger.d(this);

  /// to print message with info level
  void get logI => _logger.i(this);

  /// to print message with verbose level
  void get logV => _logger.t(this);

  /// to print message with error level
  void get logE => _logger.e(this);

  /// to print message with warning level
  void get logW => _logger.w(this);

  /// to print message with timestamp
  void get logTime => _logger.d('${DateTime.now().toIso8601String()} $this');

  /// to print message with wtf level
  void get logFatal => _logger.f(this);
}

class _LogFilter extends LogFilter {
  @override
  bool shouldLog(LogEvent event) {
    return switch (event.level) {
      Level.debug || Level.info || Level.trace || Level.warning || Level.error => kDebugMode,
      Level.fatal => true,
      _ => false,
    };
  }
}

```

### Text Form field Validator Utils class

A utility class for common form field validations. Provide static methods to generate [FieldValidator]s for various validation scenarios such as required fields, email, minimum/maximum length, regex, and more.

#### Usage

```dart
TextFormField(
  validator: Validator.required('This field is required'),
)
```

```dart
import 'package:intl/intl.dart';
import 'package:pkg_ui/pkg_ui.dart';

/// A utility class for common form field validations.
///
/// Provides static methods to generate [FieldValidator]s for various validation scenarios
/// such as required fields, email, minimum/maximum length, regex, and more.
///
/// Example usage:
/// ```dart
/// TextFormField(
///   validator: Validator.required('This field is required'),
/// )
/// ```
class Validator {
  static const String _emailPattern =
      r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

  static const String _letterPattern = r'[a-zA-Z]';
  static const String _numberPattern = r'[0-9]';
  static const String _specialCharPattern = r'[!@#\$%^&*(),.?":{}|<>]';
  static const String _upperCasePattern = r'[A-Z]';
  static const String _lowerCasePattern = r'[a-z]';

  /// Returns a validator that checks if the field is not empty or not null.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.required('This field is required')
  /// ```
  static FieldValidator required(String msg) =>
      (value) => !isValidRequired(value) ? msg : null;

  /// Returns a validator that checks if the field contains a valid email address.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.email('Enter a valid email')
  /// ```
  static FieldValidator email(String msg) =>
      (value) => !isValidEmail(value) ? msg : null;

  /// Returns a validator that checks if the field contains at least one letter.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasLetter('Must contain a letter')
  /// ```
  static FieldValidator hasLetter(String msg) =>
      (value) => !isHasLetter(value) ? msg : null;

  /// Returns a validator that checks if the field contains at least one number.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasNumber('Must contain a number')
  /// ```
  static FieldValidator hasNumber(String msg) =>
      (value) => !isHasNumber(value) ? msg : null;

  /// Returns a validator that checks if the field contains at least one special character.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasSpecialChar('Must contain a special character')
  /// ```
  static FieldValidator hasSpecialChar(String msg) =>
      (value) => !isHasSpecialChar(value) ? msg : null;

  /// Returns a validator that checks if the field contains at least one uppercase letter.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasUpperCase('Must contain an uppercase letter')
  /// ```
  static FieldValidator hasUpperCase(String msg) =>
      (value) => !isHasUpperCase(value) ? msg : null;

  /// Returns a validator that checks if the field contains at least one lowercase letter.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasLowerCase('Must contain a lowercase letter')
  /// ```
  static FieldValidator hasLowerCase(String msg) =>
      (value) => !isHasLowerCase(value) ? msg : null;

  /// Returns a validator that checks if the field has at least [min] characters.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasMinLength(8, 'Minimum 8 characters required')
  /// ```
  static FieldValidator hasMinLength(int min, String msg) =>
      (value) => !isHasMinLength(value, min) ? msg : null;

  /// Returns a validator that checks if the field has at most [max] characters.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasMaxLength(16, 'Maximum 16 characters allowed')
  /// ```
  static FieldValidator hasMaxLength(int max, String msg) =>
      (value) => !isHasMaxLength(value, max) ? msg : null;

  /// Returns a validator that checks if the field matches the given [regex] pattern.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasRegex(r'^\d{4}', 'Minimum a 4-digit')
  /// ```
  static FieldValidator hasRegex(String regex, String msg) =>
      (value) => !isHasRegex(value, regex) ? msg : null;

  /// Combines multiple [validators] into a single validator.
  /// Returns the first error message encountered, or null if all pass.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.combine([
  ///   Validator.required('Required'),
  ///   Validator.email('Invalid email'),
  /// ])
  /// ```
  static FieldValidator combine(List<FieldValidator> validators) {
    return (value) {
      for (var validator in validators) {
        final err = validator(value);
        if (err != null) return err;
      }
      return null;
    };
  }

  /// Returns a validator that checks if the field is a valid date and within optional boundaries.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.date('Enter a valid date', startDate: DateTime(2020, 1, 1), endDate: DateTime(2030, 12, 31))
  /// ```
  static FieldValidator date(String msg, {DateTime? startDate, DateTime? endDate, String format = 'dd/MM/yyyy'}) =>
      (value) => !isValidDate(value, format: format, startDate: startDate, endDate: endDate) ? msg : null;

  /// Checks if [value] matches the [regex] pattern.
  static bool _isValid(String regex, String? value) {
    if (value.isNullOrEmpty) return true;
    return RegExp(regex).hasMatch(value!);
  }

  /// Returns true if [value] is not null or empty.
  static bool isValidRequired(String? value) => value.isNotNullOrEmpty;

  /// Returns true if [value] is a valid email address.
  static bool isValidEmail(String? value) => _isValid(_emailPattern, value);

  /// Returns true if [value] contains at least one letter.
  static bool isHasLetter(String? value) => _isValid(_letterPattern, value);

  /// Returns true if [value] contains at least one number.
  static bool isHasNumber(String? value) => _isValid(_numberPattern, value);

  /// Returns true if [value] contains at least one special character.
  static bool isHasSpecialChar(String? value) => _isValid(_specialCharPattern, value);

  /// Returns true if [value] contains at least one uppercase letter.
  static bool isHasUpperCase(String? value) => _isValid(_upperCasePattern, value);

  /// Returns true if [value] contains at least one lowercase letter.
  static bool isHasLowerCase(String? value) => _isValid(_lowerCasePattern, value);

  /// Returns true if [value] has at least [min] characters.
  static bool isHasMinLength(String? value, int min) => value.isNullOrEmpty ? true : value!.trim().length >= min;

  /// Returns true if [value] has at most [max] characters.
  static bool isHasMaxLength(String? value, int max) => value.isNullOrEmpty ? true : value!.trim().length <= max;

  /// Returns true if [value] matches the given [regex] pattern.
  static bool isHasRegex(String? value, String regex) => _isValid(regex, value);

  /// Returns true if [value] is a valid date according to the given [format] and within optional boundaries, using Intl's DateFormat.
  /// Example:
  /// ```dart
  /// Validator.isValidDate('31/12/2023', format: 'dd/MM/yyyy', startDate: DateTime(2020, 1, 1), endDate: DateTime(2030, 12, 31));
  /// ```
  static bool isValidDate(String? value, {String format = 'dd/MM/yyyy', DateTime? startDate, DateTime? endDate}) {
    if (value.isNullOrEmpty) return true;
    try {
      final date = DateFormat(format).parseStrict(value!);
      if (startDate != null && date.isBefore(startDate)) return false;
      if (endDate != null && date.isAfter(endDate)) return false;
      return true;
    } catch (_) {
      return false;
    }
  }

  /// Returns a validator that checks if the field matches the [other] value.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.match('password', 'Passwords do not match')
  /// ```
  static FieldValidator match(String other, String msg) =>
      (value) => !isValidMatch(value, other) ? msg : null;

  /// Returns true if [value] matches the [other] value.
  ///
  /// Example:
  /// ```dart
  /// Validator.isValidMatch('password', 'password');
  /// ```
  static bool isValidMatch(String? value, String other) => value?.trim() == other.trim();

  /// Returns a validator that checks if the field contains only white space.
  ///
  /// Example:
  /// ```dart
  /// validator: Validator.hasOnlyWhiteSpace('Must not contain white space')
  /// ```
  static FieldValidator hasOnlyWhiteSpace(String msg) =>
      (value) => value.isNotNullOrEmpty && value!.trim().isEmpty ? msg : null;
}

```