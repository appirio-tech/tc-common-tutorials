/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * The application entry point
 */

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const routerUpload = require('koa-router')();
const routes = require('./routes');
const config = require('./config');
//const cors = require('koa-cors');

const app = koa();

//app.use(cors());

app.use(function *(next) {
  const id = `mock-${new Date().getTime()}`;
  // mock succesfull response with fake request id
  this.mockSuccess = (content) => {
    this.body = {
      id,
      result: {
        success: true,
        status: 200,
        metadata: null,
        content
      },
      version: 'v3'
    };
  };
  try {
    yield next;
  } catch (e) {
    console.error(e.stack || e);
    const status = e.status || 500;
    this.body = {
      id,
      result: {
        success: false,
        status,
        metadata: null,
        message: e.message
      },
      version: 'v3'
    };
    this.status = status;
  }
});

router.use(bodyParser());
// File service routes
router.post('/v3/files/uploadurl', routes.getPresignedUrlForUpload);
router.post('/v3/files/downloadurl', routes.getPresignedUrlForDownload);
router.del('/v3/files', routes.deleteFile);
router.get('/mock-download', routes.download);

// Challenge routes
router.get("/v4/projects/:id", routes.getProject);

// Challenge routes
router.get("/v3/members/:handle/challenges", routes.getMemberChallenges);

// Member routes
router.get("/v3/members/:handle", routes.members);

// Identity routes
router.post("/v3/authorizations", routes.authorizations);

// routerUpload doesn't have a middleware for json parsing
// so uploaded file is not stored in the memory
routerUpload.put('/mock-upload', routes.upload);

app.use(router.routes());
app.use(routerUpload.routes());

app.listen(config.PORT, () => {
  console.log('App listening on port %d', config.PORT);
});
