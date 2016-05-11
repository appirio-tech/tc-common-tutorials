/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * Contains all application routes
 */
'use strict';

const fs = require('mz/fs');
const Path = require('path');
const config = require('./config');
const validate = require('./validator').validate;

module.exports = {
  getPresignedUrlForUpload,
  getPresignedUrlForDownload,
  deleteFile,
  upload,
  download,
  members,
  getMemberChallenges,
  authorizations
};

const files = {};

/**
 * Encode s3 path to safe format for disk
 * @param  {String} filePath the file path to encode
 * @return {String}          encoded path
 */
function _encodePath(filePath) {
  return `S3_FAKE_FILE_${new Buffer(filePath).toString('base64')}`;
}

/**
 * Get file or throw error if not exists
 * @param  {String} filePath the file path
 * @return {Object}          the file
 */
function _getFile(filePath) {
  const file = files[filePath];
  if (!file) {
    const error = new Error('File not found');
    error.status = 404;
    throw error;
  }
  return file;
}

/**
 * Get Presigned URL for upload to S3
 */
function* getPresignedUrlForUpload() {
  validate(this.request.body, {
    param: {
      filePath: String,
      contentType: 'String?',
      isPublic: 'bool?'
    }
  });
  const data = this.request.body.param;
  const encoded = new Buffer(JSON.stringify(data)).toString('base64');
  const url = `${config.BASE_URL}/mock-upload?param=${encoded}`;
  const result = {
    filePath: data.filePath,
    preSignedURL: url,
    contentType: data.contentType,
    public: data.isPublic
  };
  this.mockSuccess(result);
}

/**
 * Get Presigned URL for download from S3
 */
function* getPresignedUrlForDownload() {
  validate(this.request.body, {
    param: {
      filePath: String,
      size: 'string?'
    }
  });
  const param = this.request.body.param;
  const data = _getFile(param.filePath);
  const url = `${config.BASE_URL}/mock-download?filePath=${encodeURIComponent(data.filePath)}`;
  const result = {
    filePath: data.filePath,
    preSignedURL: url,
    contentType: data.contentType,
    public: data.isPublic,
    size: param.size || ''
  };
  this.mockSuccess(result);
}

/**
 * Delete file from S3
 */
function* deleteFile() {
  validate(this.query, {
    filter: String
  });
  const split = this.query.filter.split('=');
  if (split.length !== 2 || split[0] !== 'filePath') {
    this.throw('Invalid filter', 400);
    return;
  }
  const filePath = split[1];
  const data = _getFile(filePath);
  const result = {
    filePath: data.filePath,
    preSignedURL: ''
  };
  const path = Path.join(config.UPLOAD_PATH, _encodePath(filePath));
  yield fs.unlink(path);
  delete files[filePath];
  this.mockSuccess(result);
}

/**
 * Upload file using a presigned url
 */
function* upload() {
  validate(this.query, {
    param: String
  });
  let data;
  try {
    data = JSON.parse(new Buffer(this.query.param, 'base64').toString('utf8'));
  } catch (e) {
    this.throw('Invalid param', 400);
    return;
  }
  if (!Number(this.request.header['content-length'])) {
    this.throw('Empty request body', 400);
    return;
  }
  yield new Promise((resolve, reject) => {
    const path = Path.join(config.UPLOAD_PATH, _encodePath(data.filePath));
    console.log('saving file to', path);
    const stream = fs.createWriteStream(path);
    this.req.pipe(stream);
    this.req.on('end', () => {
      files[data.filePath] = data;
      resolve();
    });
    this.req.on('error', reject);
  });
  this.body = 'fake s3 upload ok';
}

/**
 * Download file using a presigned url
 */
function* download() {
  validate(this.query, {
    filePath: String
  });
  const filePath = this.query.filePath;
  const data = _getFile(filePath);
  const path = Path.join(config.UPLOAD_PATH, _encodePath(filePath));
  const fileName = filePath.split('/').pop();
  yield fs.stat(path); // will throw if not exists
  this.set('Content-Type', data.contentType || 'application/octet-stream');
  this.set('Content-Disposition', `inline; filename=${encodeURIComponent(fileName)}`);
  this.body = fs.createReadStream(path);
}

function* members() {
  console.log(this);

  this.body = {"handle": this.params.handle};
}

function* getMemberChallenges() {
  this.body = {
    "id": "-33b3bb18:1544d6226bd:-757a",
    "result": {
      "success": true,
      "status": 200,
      "metadata": {
        "fields": null,
        "totalCount": 1
      },
      "content": [{
        "updatedAt": "2016-02-01T23:29Z",
        "createdAt": "2016-02-02T02:51Z",
        "createdBy": "8547899",
        "updatedBy": "8547899",
        "technologies": "",
        "status": "ACTIVE",
        "track": "DESIGN",
        "subTrack": "DESIGN_FIRST_2_FINISH",
        "name": "Submission Test Challenge",
        "reviewType": "INTERNAL",
        "id": 30049551,
        "forumId": 593936,
        "numSubmissions": 7,
        "numRegistrants": 1,
        "registrationStartDate": "2016-02-01T23:23Z",
        "registrationEndDate": "2016-03-02T23:23Z",
        "checkpointSubmissionEndDate": null,
        "submissionEndDate": "2016-03-02T23:29Z",
        "platforms": "",
        "numberOfCheckpointPrizes": null,
        "totalCheckpointPrize": null,
        "totalPrize": 200.0,
        "isPrivate": false,
        "upcomingPhase": null,
        "projectId": 7377,
        "projectName": "TC - Web Based Arena",
        "currentPhases": [{
          "updatedAt": "2016-02-01T18:51Z",
          "createdAt": "2016-02-01T16:51Z",
          "createdBy": "8547899",
          "updatedBy": "22841596",
          "challengeId": 30049551,
          "id": 733709,
          "phaseType": "Registration",
          "phaseStatus": "Open",
          "scheduledStartTime": "2016-02-01T23:23Z",
          "scheduledEndTime": "2016-03-02T23:23Z",
          "actualStartTime": "2016-02-01T23:23Z",
          "actualEndTime": null,
          "fixedStartTime": "2016-02-01T14:00Z",
          "duration": 2592000000
        }, {
          "updatedAt": "2016-02-01T18:51Z",
          "createdAt": "2016-02-01T16:51Z",
          "createdBy": "8547899",
          "updatedBy": "22841596",
          "challengeId": 30049551,
          "id": 733710,
          "phaseType": "Review",
          "phaseStatus": "Open",
          "scheduledStartTime": "2016-02-01T23:51Z",
          "scheduledEndTime": "2016-03-02T23:51Z",
          "actualStartTime": "2016-02-01T23:51Z",
          "actualEndTime": null,
          "fixedStartTime": null,
          "duration": 2592000000
        }, {
          "updatedAt": "2016-02-01T18:51Z",
          "createdAt": "2016-02-01T16:51Z",
          "createdBy": "8547899",
          "updatedBy": "22841596",
          "challengeId": 30049551,
          "id": 11,
          "phaseType": "Submission",
          "phaseStatus": "Open",
          "scheduledStartTime": "2016-02-01T23:29Z",
          "scheduledEndTime": "2016-03-02T23:29Z",
          "actualStartTime": "2016-02-01T23:29Z",
          "actualEndTime": null,
          "fixedStartTime": null,
          "duration": 2592000000
        }],
        "submissionViewable": false,
        "userId": 22781893,
        "handle": "iamtong",
        "userDetails": {
          "roles": ["Submitter"],
          "hasUserSubmittedForReview": true,
          "submissionReviewScore": null,
          "winningPlacements": null,
          "submissions": [{
            "id": 202842,
            "submittedAt": "2016-02-02T04:51Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 202843,
            "submittedAt": "2016-02-02T04:57Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 202844,
            "submittedAt": "2016-02-02T04:58Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 202845,
            "submittedAt": "2016-02-02T04:59Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 202846,
            "submittedAt": "2016-02-02T05:10Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 202847,
            "submittedAt": "2016-02-02T05:22Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 202851,
            "submittedAt": "2016-02-02T00:38Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203080,
            "submittedAt": "2016-03-10T23:17Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203090,
            "submittedAt": "2016-03-12T02:44Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203100,
            "submittedAt": "2016-03-12T10:01Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203101,
            "submittedAt": "2016-03-12T10:05Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203140,
            "submittedAt": "2016-03-16T02:15Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203240,
            "submittedAt": "2016-03-17T04:49Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203372,
            "submittedAt": "2016-03-29T06:45Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203373,
            "submittedAt": "2016-03-29T06:44Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203374,
            "submittedAt": "2016-03-29T06:46Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203375,
            "submittedAt": "2016-03-29T06:47Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203376,
            "submittedAt": "2016-03-29T06:49Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203377,
            "submittedAt": "2016-03-29T06:49Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203378,
            "submittedAt": "2016-03-29T06:49Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203379,
            "submittedAt": "2016-03-29T07:05Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203380,
            "submittedAt": "2016-03-29T07:05Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203381,
            "submittedAt": "2016-03-29T07:05Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203430,
            "submittedAt": "2016-03-29T21:18Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203492,
            "submittedAt": "2016-03-31T16:26Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203590,
            "submittedAt": "2016-04-04T22:25Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203600,
            "submittedAt": "2016-04-04T22:25Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203602,
            "submittedAt": "2016-04-04T23:46Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203604,
            "submittedAt": "2016-04-04T22:25Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203611,
            "submittedAt": "2016-04-04T22:25Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203620,
            "submittedAt": "2016-04-05T00:10Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203644,
            "submittedAt": "2016-04-05T20:03Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203760,
            "submittedAt": "2016-04-06T02:12Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203941,
            "submittedAt": "2016-04-06T20:22Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203942,
            "submittedAt": "2016-04-06T20:24Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203950,
            "submittedAt": "2016-04-06T20:38Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 203960,
            "submittedAt": "2016-04-06T20:52Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 204080,
            "submittedAt": "2016-04-06T20:10Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 204273,
            "submittedAt": "2016-04-12T15:24Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }, {
            "id": 204274,
            "submittedAt": "2016-04-14T15:06Z",
            "status": "Active",
            "score": null,
            "placement": null,
            "challengeId": 30049551,
            "type": "Contest Submission",
            "submissionImage": null
          }]
        }
      }]
    },
    "version": "v3"
  }
}


function* authorizations() {
  this.body = {
    "result" : {
      "content": {
        "token": "FAKE-TOKEN"
      }
    }
  }
}