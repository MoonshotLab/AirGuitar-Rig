# Air Guitar Rig

A bullet time camera capture machine which takes photos over the course of a few seconds. Images are saved to S3, a new remote db record is created, and the Air Guitar companion web app will be notified.

## Environment Variables
* `DB_CONNECT` - The Full mongo connection string: `mongodb://{mongo_username}:{mongo_password}@{mongo_url}
* `POST_HOOK_SECRET` - The secret used to make POST request to the companion web app.
