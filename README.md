# Air Guitar Rig

A bullet time camera capture machine which takes photos over the course of a few seconds. Images are saved to S3, a new remote db record is created, and the Air Guitar companion web app will be notified.

## Environment Variables
* `DB_CONNECT` - The Full mongo connection string: `mongodb://{mongo_username}:{mongo_password}@{mongo_url}`
* `POST_HOOK_SECRET` - The secret used to make POST request to the companion web app.
* `S3_KEY` - Amazon S3 Key
* `S3_SECRET` - Amazon S3 Secret


## Compiling the C++ Applications
* First, [Install OpenCV](http://opencv.org/)

    g++ take-pic.cpp -o take-pic `pkg-config --cflags --libs opencv`
