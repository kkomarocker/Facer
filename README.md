## Welcome to Facer
To use this app, please follow the instruction below.

* Create AWS account and obtain access key ID / secret access key. 
* Download AWS SDK (npm i --save aws-sdk).
* `touch secret.js` and copy / paste below code;

```sh
  export const creds = {
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY"
  };
```

* Import above creds to CameraComponent.js


##TODO
* Fix rendering issue when user accidentally presses log-in button without first name.
