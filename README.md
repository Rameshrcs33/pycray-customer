## Driver booking application
## Install/run and build steps:
npm install
cd android && ./gradlew assembleDebug
APKs will be in android/app/build/outputs/apk/debug/.
How you set up two-way push (token storage, who sends what to whom).
### How to test:
Install both APKs → open both apps once to register tokens
Customer sends request → Driver receives push
Driver Accept/Reject → Customer receives push
Any assumptions/limitations
