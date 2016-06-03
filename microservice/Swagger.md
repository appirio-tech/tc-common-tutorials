# How to use Swagger UI For Calling Services
1. make sure to have node.js installed, should be 0.10.* or greater
2. execute this in a terminal:
```
npm install -g http-server
git clone https://github.com/swagger-api/swagger-ui
cd swagger-ui/dist
http-server --cors -p 3000
```
3. Copy the `swagger.json` to swagger-ui/dist
4. Install and enable Allow-Control-Allow-Origin extension (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related) for Chrome
5. Open Chrome and visit http://localhost:3000/
6. Enter http://localhost:3000/swagger.yaml and click the Explore button
7. Click Auothorize button and enter the jwt token (example as following) to Authorize
```
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJhZG1pbmlzdHJhdG9yIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJ1c2VyIiwiZXhwIjoxNzY2Mjg5MjQ2LCJ1c2VySWQiOiIxMzI0NTgiLCJpYXQiOjE0NTA5MjkyNDYsImVtYWlsIjpudWxsLCJqdGkiOiIxMzY5YzYwMC1lMGExLTQ1MjUtYTdjNy01NmJlN2Q4MTNmNTEifQ.RkHVsnXobWg5WoH9CyVOm4w_0OKnGhzilsxdg5CzEXA
```
7. Then you can play with the APIs. 

## How to validate the swagger doc
If you would like to test the validator-badge run in a terminal:
```
git clone https://github.com/swagger-api/validator-badge.git
cd validator-badge
mvn package jetty:run
```
then, on the browser go to http://127.0.0.1:8002/debug?url=http://http://127.0.0.1:<port>/apiary.yaml

if it returns {} it means there are no errors


