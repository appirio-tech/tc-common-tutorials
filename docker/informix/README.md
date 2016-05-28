# How to use Informix docker
We have created a informix docker for use locally, see https://hub.docker.com/r/appiriodevops/informix

So basically, can run it like 
```
docker run -p 2021:2021 -it appiriodevops/informix:1.2
```
then you can connect this informix server by using [ServerStudio](https://www.serverstudio.com/)
or other supported SQL client tool

For the 1.2 tag, it is not using the latest [scripts svn](https://coder.topcoder.com/internal/database/scripts/trunk), please check following to update to latest

## How to update the informix docker with latest scripts svn
1. run a container for the informix
```
docker run -it appiriodevops/informix:1.2 bash
```

2. cd trunk
3. svn update (you need to enter your svn username and password)
make necessory change if you want
4. oninit
5. ant reinstall_db
6. onmode -ky
7. Create a new tag for informix, so we can use it in docker compose.
```
docker commit -m 'use latest scripts commit' <<container id>> appiriodevops/informix:<<new tag>>
```
8. then you can run it single with `docker run -p 2021:2021 -it appiriodevops/informix:<<new tag>>`
9. Or use docker compose (be sure to update the tag for `appiriodevops/informix` in `docker-compose.yaml` file
