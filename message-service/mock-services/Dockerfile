FROM node

WORKDIR /json-server

RUN npm install -g json-server

COPY services.json /json-server/

CMD ["json-server", "-p 3001", "services.json"]

EXPOSE 3001
