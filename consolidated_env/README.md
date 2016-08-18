### Deplopyment

Add the following entry to your host file:
<docker-box-ip> cockpit.cloud.topcoder.com tcs.cloud.topcoder.com

Where <docker-box-ip> is the ip address of your docker box. For example, 192.168.99.100 for mine on windows. 

Then go to the submission's directory and execute the command below:
```
docker-compose up
```

Wait until the JBoss in the `run-online-review` and `tc-direct` docker containers are ready. 
You should see the log messages as below when they are ready:
```
run-online-review  - INFO  [Server] JBoss (MX MicroKernel) [4.0.2 (build: CVSTag=JBoss_4_0_2 date=200505022023)] Started in 1m:36s:383ms
tc-direct - INFO  [Server] JBoss (MX MicroKernel) [4.2.3.GA (build: SVNTag=JBoss_4_2_3_GA date=200807181417)] Started in 3m:7s:528ms
```

Then you can access the direct website with: https://cockpit.cloud.topcoder.com/direct (please ignore the ssl warning and proceed). 
And access the online_review website with: http://tcs.cloud.topcoder.com/review

Note that the `run-online-review` and `tc-direct` above are the names of the docker containers for the corresponding docker images. 
Yours might be a bit different, and you can always get them by running the `docker ps` command. 

The same applies to the `tc-informix` and `run-online-review` docker container names in sections below. 

### Informix Database not Enough Connections Quickfix

Whenever you see an error in docker logs that the app cannot establish a new connection to the informix database. e.g. 
```
[java] Caused by: com.topcoder.db.connectionfactory.DBConnectionException: error occurs while creating the connection.
```
Try to restart the informix database server as below:
```
# log into the tc-informix docker container first
docker exec -it tc-informix bash

# restart the database server
onmode -ky
oninit
```


### run-online-review Docker Image Bug Fix

Please do the following steps to fix the bugs in run-online-review docker image. 
(If the copilot corrects this in the docker image later, it won't be necessary.)

1.Download the latest online_review codebase from svn: https://coder.topcoder.com/tcs/clients/cronos/applications/online_review/trunk

2.Execute the command below to copy the `conf` directory in online_review codebase to run-online-review container:
```
# go to online_review codebase directory first
docker cp conf run-online-review:/root/online_review
```

3.Log into the run-online-review docker container, and create a directory for submissions. 
```
docker exec -it run-online-review bash

# then create the directory for submissions uploading and downloading
mkdir /root/downloads
```
