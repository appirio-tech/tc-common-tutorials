### Build and Start OR

```sh
$ docker-compose up tc-online-review
```

Update your hosts file with appropriate IP address
Linux
```
127.0.0.1 local.docker
```
For windows or mac, replace 127.0.0.1 with docker-machine ip address.

Now go to http://local.docker:8080/review/actions/ListProjects?scope=all to verify application


### Deploy Updated code
To deploy the code changes to jboss run below command in new terminal window
```
$ docker exec tc-online-review ant deploy
```
### Auto Pilot

```
$ docker-compose up tc-online-review-auto-pilot
```

