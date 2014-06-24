# Issue Man ![Build Status](https://travis-ci.org/rebornix/IssueMan.svg?branch=master) ![Dependence](https://david-dm.org/rebornix/IssueMan.png)
Github Issue Manager helps you control all issues that created by you. Check out a simple [demo](http://issueman.azurewebsites.net) which is good enough for me.

# Get involved in development
## Setup env
- install *git* and clone the appropriate branch
 - ```git clone --branch master https://github.com/rebornix/IssueMan.git issueman```
- install *node*
- launch terminal and install the following packages in the global space: *grunt-cli*, *bower*
 - `npm install -g grunt-cli`
 - `npm install -g bower`
- inside the local folder of source repositry run *npm* to install everything we need
 - `npm install`
- You can run grunt tasks and do development as usual.

### Grunt task
- `grunt dev`
 - Build the source code using development settings and start the HTTP server for debugging.
 - You can access http://localhost:9000 and enjoy your debugging.
- `grunt prod`
 - Build the source code using production settings and generate bits for deployment
 - All css and js files are merged and minified
- `grunt deploy` This task only works for azure websites.
 - First you need create a config file named as `DeployConfig.json`
 - Then initialize this file like below
```
    {
      "site_url": {
        "master": [
          "https://yoursite"
        ]
      },
    
      "git_url": {
        "master": [
          "https://username:password@yoursite/issueman.git"
        ]
      }
    }
```
 - Finally you can deploy your bits by running `grunt deploy --branchName=master`


# Credit
- [oauth.io](https://oauth.io)
- The whole grunt world
