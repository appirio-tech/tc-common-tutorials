
## Prepare Codebase
Download the online-review codebase from https://github.com/topcoder-platform/tc-online-review.
I'm testing with dev branch with commit hash: 0131012a5493cb3162599fd27add81407d8116d1.

And then download the components from the contest forum, and extract to the root directory of online-review codebase. 

## Build Image
In the extracted submission directory, execute the command below to build the image
```
docker build -t appiriodevops/online-review:build local
```

## Defined Services
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
