### Welcome to Facer

##This simple log-in application will validate user based on captured facial image and stored image comparison.

To use this app, please follow the instruction below.

- Create AWS account and obtain access key ID / secret access key.
- Download AWS SDK (npm i --save aws-sdk).
- `touch secret.js` and copy / paste below code;

```sh
  export const creds = {
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY"
  };
```

- Import above creds to CameraComponent.js

##Few things to note...

- Please take picture with plenty of light.
- This app will work perfectly with full-frontal facial image only.
- Smile.
