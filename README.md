# Air Guitar Rig
A slowmo camera rig which allows a user to select a song from a library and then captures a few seconds of video. Videos are saved to S3, a new remote db record is created, and the [Air Guitar companion web app](https://github.com/joelongstreet/AirGuitar-Web) will be notified.

To start the app you'll need to have the following:
1. The correct wifi and ethernet connections
1. A connected GoPro with the proper settings
1. A running phidget web server
1. A phidget with the correct wiring
1. The correct environment variables to connect to S3, a remote MongoDB, GoPro, and a post hook secret.


## Setting up the GoPro
The easiest (and possibly only) way to communicate with the GoPro is via it's web api. To do so, you'll need to join it's broadcasted wifi channel. Unfortunately, setting up multiple wifi consumers on osx is difficult. The best method to talk to both the internet and the camera is to plug in via ethernet and consume the GoPro's wifi. More cords, but whatever, it works.

### Settings:
* Wireless Controls - WiFi RC, Current
* Res: WVGA
* FPS: 240
* FOV: Wide

Make sure to put the camera into video mode before starting the app. The app will then be able to just start recording.


## Setting up the Phidget
You'll need to download the [phidget gui](http://www.phidgets.com/docs/OS_-_OS_X) for this app to work. Follow the wiki to start the phidget web server before starting the node application.

### Wiring
The wiring config is located within the pinMapping object in the phidget lib - `libs/phidget.js`. Currently, the following are hooked up:
* 2 relays to control a couple fans and some lights
* 3 indicator lights to broadcast the state of the app (recording, uploading, ready...)
* 2 buttons which power the web interface. 'Next' and 'Select Song' button.


## Environment Variables
* `DB_CONNECT` - The Full mongo connection string: `mongodb://{mongo_username}:{mongo_password}@{mongo_url}`
* `POST_HOOK_SECRET` - The secret used to make POST request to the companion web app.
* `S3_KEY` - Amazon S3 Key
* `S3_SECRET` - Amazon S3 Secret
* `GOPRO_PASS` - Password to the gopro wifi server
