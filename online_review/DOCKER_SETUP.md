### ENVIRONMENT SETUP

Below command will create docker image with below softwares installed 

1. JDK 1.7 
2. Jboss 4.0.2
3. Ant 1.7.0

Update Properties files

```sh
$ cp build.properties.docker build.properties
$ cp token.properties.docker token.properties
$ cp scripts/auto_pilot/build.properties.docker scripts/auto_pilot/build.properties
```

Build Docker Environment

```
$ cd docker/docker_env
$ docker build -t your-docker-handle/or .
```

### Build OR
```sh
$ cd ../
$ docker build -t your-docker-handle/or_build .
$ docker run --name informix -p 2021:2021 -d appiriodevops/informix:1.1
$ cd ../
$ docker run -d --name or -p 8080:8080 -v "$PWD":/root/online_review --link informix:db your-docker-handle/or_build
$ docker exec or ant first_deploy deploy start_jboss
```

Update your hosts file with appropriate IP address
Linux
```
127.0.0.1 local.docker
```
For windows or mac, replace 127.0.0.1 with docker-machine ip address.

Now go to http://local.docker:8080/review/actions/ListProjects?scope=all to verify your application

### Deploy Updated code
To deploy the code changes to jboss run below command   
```
$ docker exec or ant deploy
```
### Auto Pilot
Make sure you have replaced build.properties file inside scripts/auto_pilot directory with scripts/auto_pilot/build.properties.docker

```
$ docker exec -it or bash
$ cd /root/online_review/scripts/auto_pilot
$ ant clean dist deploy
$ cd /root/auto_pilot
$ ant start_ap
$ ant stop_ap
$ ant test_ap
```
