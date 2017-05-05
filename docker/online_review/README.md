
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

The `docker-compose.yml` file in the submission defined the following services:
* tc-informix - the topcoder informix database server
* build-online-review - it will build the online-review and create a `jboss-4.0.2` directory containing the jboss and online-review deployment files in the configured deployment directory 
* build-auto-pilot - it will build the auto-pilot and create a `auto_pilot` directory containing the auto-pilot deployment files in the configured deployment directory 
* build-online-review-auto-pilot - it will build both online-review and auto-pilot as the `build-online-review` and `build-auto-pilot` services above.
* run-online-review - it will run the online-review
* run-auto-pilot - it will run auto-pilot
* run-online-review-auto-pilot - it will run both the online-review and auto-pilot.

You need to update the variables' values in `env.sh` files, and then execute `source env.sh`. 
Then execute the following commands: 
* `docker-compose up build-online-review` to build online review
* `docker-compose up build-auto-pilot` to build auto pilot
* `docker-compose up build-online-review-auto-pilot` to build both online review and auto pilot

After they are built successfully, execute the following commands:
* `docker-compose up run-online-review` to run online review (the online review must built first)
* `docker-compose up run-auto-pilot` to run auto pilot (the auto pilot must be built first)
* `docker-compose up run-online-review-auto-pilot` to run both online review and auto pilot (the online review and auto pilot must be built first)

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
