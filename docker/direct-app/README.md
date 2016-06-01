## Create Docker Compose Env for Running Direct App Local Deployment Guide

### 1. Docker Images
It contains three sub-directories and each corresponds to a docker image:
* `base` - it contains all necessary files to build the `base` image for the `build` and `run` images below
* `build` - it contains all necessary files to build the `build` image to build the direct app
* `run` - it contains all necessary files to build the `run` image to run the direct app

Note that on Windows, you can mount directories in your home directory to the docker container. 
And if your username is `NA`, you home directory path is like `/c/Users/NA`.

### 2. Deployment
#### 2.1 Build `base` Docker Image
Go to the `base` sub-directory, and build the image as below:
```sh
docker build -t appiriodevops/direct-app:base  .
```

#### 2.2 Build `build` Docker Image and Run it to Build Direct App
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

##### 2.2.1 Rebuild Direct App
To rebuild the direct app, you can use commands as below:
```sh
# start the created docker container above
docker start build-direct-app

# check build log
docker logs -f build-direct-app
```

#### 2.3 Build `run` Docker Image and Run it to Run Direct App
There are two options to run the direct app in this docker image:
1. Mount the generated `jboss-4.2.3.GA` directory above to the docker image
2. Copy the generated `jboss-4.2.3.GA` directory above to the docker image

If you choose option 1 (which is the default option as well). You need to edit the mapping in `env.sh` file
```
export BUILT_JBOSS_DIR=./run/deploy/jboss-4.2.3.GA
```
The `BUILT_JBOSS_DIR` should point to the generated `jboss-4.2.3.GA` directory in step 2.2. 

If you choose option 2, you need to uncomment the following line in `run/Dockerfile` file:
```
COPY deploy/jboss-4.2.3.GA /root/jboss-4.2.3.GA
```
Note that you can set the `<deployment-path>` in step 2.2 to point to the `run/deploy` directory (An absolute path should be specified for `<deployment-path>` like above), so that the `jboss-4.2.3.GA` will be generated in it directly.

And then comment out the `volumes` section in `docker-compose.yml`, and the following line in `run/Dockerfile` file:
```
VOLUME ["/root/jboss-4.2.3.GA"]
```

After you made choice above, go to the `run` sub-directory, and build the image as below:
```sh
docker build -t appiriodevops/direct-app .  
```

Then go to the directory where the `docker-compose.yml` file is located, and execute the commands as below to run the direct app:
```sh
# if you want to use volume, execute the following command to set the environment variable first
source env.sh

# start the direct app
docker-compose up
```

Then add the following entry into hosts file:
```
<docker-box-ip> cockpit.cloud.topcoder.com
```

Where `<docker-box-ip>` is the ip address of your docker box. It's `192.168.99.100` for my Windows and Mac docker box, and it should be `127.0.0.1` for linux docker box. 

Wait until the direct app is ready, open `https://cockpit.cloud.topcoder.com/direct/` in your browser to test, please proceed regardless of the ssl certificate warning.
You can login with heffan/password. 
