# Create Docker Compose Env for Running Direct App Local Deployment Guide

## 1. Docker Images
It contains three sub-directories and each corresponds to a docker image:
* `base` - it contains all necessary files to build the `base` image for the `build` and `run` images below
* `build` - it contains all necessary files to build the `build` image to build the direct app
* `run` - it contains all necessary files to build the `run` image to run the direct app

Note that on Windows, you can only mount directories in your home directory to the docker container. 
And if your username is `NA`, you home directory path is like `/c/Users/NA`.

## 2. Build Docker Images (Optional)
The following steps are optional, the images are already available in docker hub - https://hub.docker.com/r/appiriodevops/direct-app
You can build them if you need to make changes, if yes, please create a PR for merge.
### 2.1 Build `base` Docker Image
Go to the `base` sub-directory, and build the image as below:
```sh
docker build -t appiriodevops/direct-app:base  .
```

### 2.2 Build `build` Docker Image and Run it to Build Direct App
Go to the `build` sub-directory, and build the image as below:
```sh
docker build -t appiriodevops/direct-app:build .
```

Then execute the command below to build the direct app:
```sh
docker run -v <direct-app-path>:/root/direct -v <deployment-path>:/data --name build-direct-app appiriodevops/direct-app:build
```
* `<direct-app-path>` - it should be replaced with the path of the direct app source code directory
* `<deployment-path>` - it should be replaced with the path of the deployment directory, a `jboss-4.2.3.GA` directory will be generated in it after the command is completed, which is the jboss containing the direct app. 

On Windows, they can be values as below:
* `<direct-app-path>` - /c/Users/NA/direct
* `<deployment-path>` - /c/Users/NA/docker/direct-app/run/deploy

The `/c/Users/NA` is my home directory on Windows, the `direct` sub-directory contains the direct app source code. 

On Mac, they can be values as below:
* `<direct-app-path>` - /Users/NA/direct
* `<deployment-path>` - /Users/NA/docker/direct-app/run/deploy

Again, the `/Users/NA` is my home directory on Mac. 

#### 2.2.1 Rebuild Direct App
To rebuild the direct app, you can use commands as below:
```sh
# start the created docker container above
docker start build-direct-app

# check build log
docker logs -f build-direct-app
```

### 2.3 Build `run` Docker Image and Run it to Run Direct App
There are two options to run the direct app in this docker image:

1. Mount the generated `jboss-4.2.3.GA` directory above to the docker image
2. Copy the generated `jboss-4.2.3.GA` directory above to the docker image

If you choose option 2, you need to uncomment the following line in `run/Dockerfile` file:
```
COPY <<path to built jboss>> /root/jboss-4.2.3.GA
```
Note that you can set the `<<path to built jboss>>` in step 2.2 to point to the `${BUILT_DATA}/jboss-4.2.3.GA` directory (An absolute path should be specified for `<deployment-path>` like above), so that the `jboss-4.2.3.GA` will be generated in it directly.

And then comment out the `volumes` section in `docker-compose.yml`, and the following line in `run/Dockerfile` file:
```
VOLUME ["/root/jboss-4.2.3.GA"]
```

For option 1, please build the image as below:
```sh
docker build -t appiriodevops/direct-app:run-volume .  
```

For option 2, please build the image as below
```sh
docker build -t appiriodevops/direct-app:run .  
```

## Build and Run with Docker compose
If you choose option 1 (which is the default option as well). You need to edit the mapping in `env.sh` file

1. DIRECT_APP_SRC_ROOT - path to the git clone of https://github.com/appirio-tech/direct-app
2. BUILT_DATA - the root path for built pieces, better be an empty directory

Then go to the directory where the `docker-compose.yml` file is located, and execute the commands as below to run the direct app:

First, source the environment variables.
```sh
source env.sh
```

Then, Build the direct app
```
docker-compose up tc-direct-build
```

Third, run the direct app
```
docker-compose up tc-direct-with-volume
```

or 

```
docker-compose up tc-direct-without-volume
```

## Verificaition
Then add the following entry into hosts file:
```
<docker-box-ip> cockpit.cloud.topcoder.com
```

Where `<docker-box-ip>` is the ip address of your docker box. It's `192.168.99.100` for my Windows and Mac docker box, and it should be `127.0.0.1` for linux docker box. 

Wait until the direct app is ready, open `https://cockpit.cloud.topcoder.com/direct/` in your browser to test, please proceed regardless of the ssl certificate warning.
You can login with heffan/password. 
