# How to use Informix docker
We have created a informix docker for use locally, see https://hub.docker.com/r/appiriodevops/informix

So basically, can run it like 
```
docker run -p 2021:2021 -it appiriodevops/informix:1b3d4ef
```
then you can connect this informix server by using [ServerStudio](https://www.serverstudio.com/)
or other supported SQL client tool

1b3d4ef tag is the latest version by https://github.com/appirio-tech/tc-database-scripts, if there are new changes, please do as following

## How to update the informix docker with latest scripts svn
1. run a container for the informix
```
docker run -it appiriodevops/informix:1b3d4ef bash
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
