/** @type {import('@expo/fingerprint').Config} */
const config = {
  ignorePaths: ["ios", "android"],
  // https://docs.expo.dev/eas-update/runtime-versions/#avoiding-crashes-with-incompatible-updates
  extraSources: [
    /**
     * The Podfile is a specification that describes the dependencies of the targets of one or more Xcode projects.
     *
     * https://guides.cocoapods.org/using/the-podfile.html
     */
    { type: "file", filePath: "ios/Podfile", reasons: [] },
    /**
     * This file is generated after the first run of pod install, and tracks the version of each Pod that was installed.
     *
     * https://guides.cocoapods.org/using/using-cocoapods.html
     */
    { type: "file", filePath: "ios/Podfile.lock", reasons: [] },
    /**
     * The Info.plist file contains configuration data for your app and for some features of iOS.
     *
     * https://developer.apple.com/documentation/bundleresources/information_property_list
     */
    {
      type: "file",
      filePath:
        "ios/app/Info.plist" /* NOTE change to the correct path for your app NOTE */,
      reasons: [],
    },
    /**
     * build.gradle file is used to define global configuration and settings for the entire project.
     *
     * https://developer.android.com/build#top-level
     */
    { type: "file", filePath: "android/build.gradle", reasons: [] },
    /**
     * The AndroidManifest file is the first point the Android system checks when an application is loaded and receives detailed information about the application being loaded.
     *
     * https://developer.android.com/guide/topics/manifest/manifest-intro
     */
    {
      type: "file",
      filePath: "android/app/src/main/AndroidManifest.xml",
      reasons: [],
    },
  ],
};

module.exports = config;
