# Prepare Codebase and Environemnt
## Install Docker and Docker Compose
## Get the Source Code Ready
Please send request to support@topcoder.com to grant you access to online review repository and related components
* svn co https://coder.topcoder.com/tcs/clients/cronos/applications/online_review/trunk
* ant checkout-components (you need to update *build.properties* to include your svn username and password)

## Merge Docker Build Related Files
Copy the docker related files (all files in https://github.com/appirio-tech/tc-common-tutorials/tree/master/docker/online_review) into online_review folder

# Prepare the base image for build and running
```
docker pull appiriodevops/online-review:env
```
*OR*
```
docker build -f docker/env/Dockerfile -t appiriodevops/online-review:env .
```

# Prepare the image for autopilot without source code
```
docker build -f docker/autopilot/Dockerfile -t appiriodevops/online-review:autopilot .
```

# Prepare the image for online review without source code
```
docker build -f docker/online_review/Dockerfile -t appiriodevops/online-review .
```
# Use Docker Compose to Run different services
## Run the online review
### Build and Run From Source Code
```
docker-compose up tc-online-review
```
### Run without Source Code
```
docker-compose up run-online-review
```
## Run AutoPilot
### Build and Run From Source Code
```
docker-compose up tc-online-review-auto-pilot
```
### Run Without Source Code
```
docker-compose up run-auto-pilot
```

## Shutdown 
```
docker-compose down
```

# Verification
Update your hosts file with appropriate IP address
* Linux
```
127.0.0.1 local.topcoder.com
```
* For Windows or Mac, replace 127.0.0.1 with docker-machine ip address.

Now go to http://local.topcoder.com:8080/review to verify application
