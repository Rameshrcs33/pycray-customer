## Driver booking application
## Install/run and build steps:
npm install
cd android && ./gradlew assembleDebug
APKs will be in android/app/build/outputs/apk/debug/.
## Notification setup
New project created with firebase console
App register with firebase project with package name, sha1 sha256 key
copied neccessary dependencey from firebase console and setup with android project level .build gradlew file 
and app level .build gradle file
copied json file from firebase and pasted with android/app directory

### Firebase plugin installed for notification
npm install @react-native-firebase/app
npm install @react-native-firebase/messaging

### State management libray
Redux toolkit

### How to test:
Install both APKs → open both apps once to register tokens
Customer sends request → Driver receives push
Driver Accept/Reject → Customer receives push
