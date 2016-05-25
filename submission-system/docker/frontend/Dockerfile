FROM node
COPY topcoder-app /topcoder-app

WORKDIR topcoder-app

RUN npm i

COPY constants.coffee /topcoder-app/node_modules/appirio-tech-webpack-config/constants.coffee

CMD npm start

