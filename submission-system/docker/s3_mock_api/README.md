## Dependencies
- docker https://www.docker.com/
- nodejs (local development)  https://nodejs.org/en/ (v4 or v5)
- postman chrome extension for verification https://www.getpostman.com/

## Configuration
Following env variables can be configured:
- `PORT` the port to listen, default `8080`
- `UPLOAD_PATH` the disk path where files are saved, default `/tmp`
- `BASE_URL` the base url for upload and download link, default `http://localhost:8080`


## Local development
```
npm i
npm run
```
lint check
```
npm run lint
```

## Docker development
Build image:  
`docker build -t s3_mock .`  
Run image:  
`docker run -p 8080:8080 -i -t  s3_mock`  
Or if you are using docker-machine, you must override `BASE_URL`  
Run `docker-machine env default`  
Copy ip from `DOCKER_HOST`  
Run image:  
`docker run -p 8080:8080 -i -t -e "BASE_URL=http://192.168.99.100:8080"  s3_mock`

Alternatively you can replace `-i -t` options to `-d` and app will be ran as daemon.


## Verification
Import postman_collectiom from `postman` directory  
create new environment and set variable `URL` to your `BASE_URL` (See for more details https://www.getpostman.com/docs/environments)  
Video https://youtu.be/vTZW0uSjtjo
