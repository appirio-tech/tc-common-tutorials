
## Prepare Codebase
* Clone the source code https://github.com/topcoder-platform/tc-online-review.
* Be sure to switch to the right branch to develop and deploy.
* Initialise all submodules and update.
```
cd tc-online-review
git submodule update --init
```

## Build Image - Optional

If you want to revise the build process, you can go to `build` directory, make necessary changes, and rebuild the image like 
```
docker build -t appiriodevops/online-review:build .
```

## Configure the Services for Local enviroment.
The `env.sh` file in the submission defined the following variables:
* ONLINE_REVIEW_SOURCE_ROOT - the root directory of the online-review codebase
* ONLINE_REVIEW_DEPLOYMENT_DIR - the deployment directory that will contain the build the results
* DISABLE_ONLINE_REVIEW - disable online review or not. 1 - disabled, 0 - enabled.
* DISABLE_AUTO_PILOT - disable auto pilot or not. 1 - disabled, 0 - enabled.
* DISABLE_LATE_DELIVERABLES_TRACKER - disable the late deliverables tracker or not. 1 - disabled, 0 - enabled.
* DISABLE_REVIEW_ASSIGNMENT - disable review assignment or not. 1 - disabled, 0 - enabled.

The `docker-compose.yml` file in the submission defined the following services:
* tc-informix - the topcoder informix database server
* build-online-review - it will build services depending upon the DISABBLE_XXX flags
* run-online-review - it will run services depending upon the DISABBLE_XXX flags

You need to update the variables' values in `env.sh` files, and then execute `source env.sh`. 
Then execute the following commands: 
* `docker-compose up build-online-review` to build various services
* `docker-compose up run-online-review` to run various services

## Verification
Update your hosts file with appropriate IP address
* On Linux
```
127.0.0.1 local.topcoder.com
```
* For Windows or Mac, replace 127.0.0.1 with docker-machine ip address.

Now go to http://local.topcoder.com:8080/review to go to the login page: http://take.ms/JhO4p
Login with heffan/password, and the page will be like this: http://take.ms/NFkBI
Click a contest to open it: http://take.ms/o48Kha
Edit this contest to turn on auto-pilot and set registration start date to a value in near future: http://take.ms/y6GIG and http://take.ms/jLCZT
Save the changes, and if the auto-pilot is running, after a while, you will see the registration and submission phase are open: http://take.ms/H9gdn

For late deliverables tracker and review assignment tool, you can login into the running container, and check their processes are running. 


