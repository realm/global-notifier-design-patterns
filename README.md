# Global Notifier Design Patterns

The Realm Global Notifier is part of the Realm Mobile Platform __Enterprise__ featureset.
You'll need an __Enterprise__ access token to use these examples

__Requirements__
1. Node v6.10.3 or higher
2. A running instance of Realm Object Server 1.8 or higher
3. XCode 8.3.2 to run the iOS Example
4. Your Realm Mobile Platform Enterprise Access Token

This project comes with an iOS Client Application and a NodeJS backend application.

1. Run your local instance of Realm Object Server 
2. Obtain _both_ your Enterprise Access Token and your Admin Access Token.
  
  create a file called `backend/tokens.json`
  ```javascript
  {
      'ADMIN_TOKEN': 'youradmintokenhere',
      'ACCESS_TOKEN': 'yourenterpriseaccesstoken'
  }
  ```


3. Fill in your tokens in `backend/src/index.js`
4. Run the backend with: `node backend/src/index.js`
5. Then run the iOS Application in the __ios__ directory with `open ios/Director.xcworkspace` and then debug run with `Command+R`.

![analytics](https://ga-beacon.appspot.com/UA-50247013-2/global-notifier-design-patterns/README?pixel)
