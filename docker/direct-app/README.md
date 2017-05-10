# Create Docker Compose Env for Running Direct App Local Deployment Guide

## Build Docker Image (Optional)
The following steps are optional, the images are already available in docker hub - https://hub.docker.com/r/appiriodevops/direct-app
You can build them if you need to make changes, if yes, please create a PR for merge.

Go to the `build` sub-directory, and build the image as below:
```sh
docker build -t appiriodevops/direct-app:build  .
```

## Build and Run with Docker compose
Update the variables in `env.sh` file
1. DIRECT_APP_SRC_ROOT - path to the git clone of https://github.com/appirio-tech/direct-app
2. BUILT_DATA - the root path for built pieces, better be an empty directory

Then go to the directory where the `docker-compose.yml` file is located, and execute the commands as below to run the direct app:

First, source the environment variables.
```sh
source env.sh
```

Then, Build the direct app from the source code
```
docker-compose up tc-direct-build
```

Third, run the direct app from the deployment files generated above
```
docker-compose up tc-direct-with-volume
```

or run the direct app from pre-built image:

```
docker-compose up tc-direct
```

## Verificaition
Then add the following entry into hosts file:
```
<docker-box-ip> cockpit.cloud.topcoder.com
```

Where `<docker-box-ip>` is the ip address of your docker box. It's `192.168.99.100` for my Windows and Mac docker box, and it should be `127.0.0.1` for linux docker box. 

Wait until the direct app is ready, open `https://cockpit.cloud.topcoder.com/direct/` in your browser to test, please proceed regardless of the ssl certificate warning.
You can login with heffan/password. 
