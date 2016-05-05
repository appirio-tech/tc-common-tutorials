# Purpose of this Document

The purpose of this document is to describe how to setup your development environment and run the submission system locally.

# Overview

The submission system uses multiple AWS services and Topcoder APIs to handle member submissions, we have a solution to execute all those services using mocks and fake versions of the service locally.

We will be using Docker and docker-compose to run or mock up the following services:

1. File microservice and S3: Used to upload and download submission files;
2. DynamoDB: Main submission datastore;
3. Informix: Legacy datastore, data is update in Informix to allow legacy applications to work with the submissions;
4. NFS: legacy file storage;
5. Challenge microservice: api to interact with challenge information;
6. Member microservice: api to interact with member information;
7. SQS: queueing service used to send and receive submission process requests;
8. Kafka: queueing service used to send process failure notifications;
9. Submissions UI: web page used to upload submissions;

We will execute the following services directly, from an IDE or from your command line, since these are the services we will be modifying:

1. Submission microservice: API used by the UI to initiate and finalize submissions;
2. Submission processor: processes the submissions, which includes validating files, generating watermarked images, resizing images, generating consolidated zip files for download, updating Informix, and more.

# Pre-requisites

To prepare your environment to run the submission system, please start by installing these pre-requisites:

* Docker: https://docs.docker.com/engine/installation/
* Docker-compose: https://docs.docker.com/compose/install/
* Windows/Mac OS X:
 * Docker Toolbox: https://www.docker.com/products/docker-toolbox
* Java 1.8;
* Your favorite IDE (our team uses Eclipse and Intellij);
* The submission-system.zip file, unzipped to a local folder. Henceforth in this document, we will call this folder submission-system.
* (Optional but recommended) aws cli: http://docs.aws.amazon.com/cli/latest/userguide/installing.html
 * This will allow you to view data in the mongodb database, messages in sqs, etc.

# Local Configuration

## Hosts

Update your localhost entry in your hosts file (/etc/hosts) to map local.topcoder-dev.com:

    127.0.0.1	localhost local.topcoder-dev.com

Windows:  
C:\Windows\System32\drivers\etc\hosts

    192.168.99.100	 localhost local.topcoder-dev.com

Mac OS X:  
/etc/hosts

    192.168.99.100	 localhost local.topcoder-dev.com

## AWS credentials

We will use fake AWS credentials to access the services, they will be loaded from your local AWS credentials folder, (~/.aws/). These credentials need to be consistent.

If you already have a ~/.aws folder, please make a backup of the contents so you can restore your system to the previous configuration once you are done working on the submissions system.

Create a ~/.aws folder, and in this folder create the following files:

~/.aws/config with the following content:

    [default]
    output = json
    region = us-east-1

~/.aws/credentials with the following content

    [default]
    aws_access_key_id = key
    aws_secret_access_key = secret

## Environment Configs

Inside the submission-system folder, you will find a env.sh file. This file contains local environment configurations, open it and edit the configurations in there according to your environment:

    # The IP address of the computer running the submission system
    export IP=192.168.1.65

Windows/Mac OS X:

    # The IP address of the computer running the submission system
    export IP=192.168.99.100

# Starting the Local Services

Export the env file configurations by issuing the following command inside the submission-system folder:

    source env.sh

Inside the submission-system folder, issue the following command:

    docker-compose up submissions

The first time you execute this command will cause all the required docker images to be downloaded to your local environment, this is a large download and it could take some time. Subsequent executions will be much faster.

Once you see the following message, all services are up:

    submissions_1 | webpack: bundle is now VALID.

At this point you should be able to connect to:

* DynamoDB on localhost:7777;
* Informix on localhost:2021;
 * User: informix
 * Password: 1nf0rm1x
 * Server: informixoltp_tcp
 * Jdbc url: jdbc:informix-sqli://localhost:2021/tcs_catalog:INFORMIXSERVER=informixoltp_tcp;
* SQS on localhost:4568;
* Kafka on localhost:9092
* Zookeeper on localhost:2181;
* Frontend on http://local.topcoder-dev.com:3000/

To stop the local services:

    docker-compose down

Note that when shutting down the containers will be deleted, the next time you start the services you will start with a clean slate, i.e. all the data will be reset to the initial state, and any submissions that you did while testing will be lost.

# Building the Submission System

At this point you could use your favorite IDE to do the next tasks. We will take a command line based approach here, which should provide all details and parameters necessary to do the same through an IDE.

## Build ap-supply-library

Common classes for all member facing services

Unzip it the ap-supply-library folder, cd into it and:

    mvn clean compile install

## Build ap-submission-library

Common classes for the submissions system, such as models, service clients, utilities, etc.

Unzip it the ap-submission-library folder, cd into it and:

    mvn clean compile install

## Build ap-submission-microservice

Submission API

Unzip it the ap-submission-microservice/service folder, cd into it and:

    mvn clean compile package

## Build ap-submission-processor

Processor of submissions.

Unzip it the ap-submission-processor/service folder, cd into it and:

    mvn clean compile package

# Executing the Submission Service

cd into the ap-submission-service/service, you will find a run.sh file in there containing all environment variables and the startup command to run the service locally:

    export AUTH_DOMAIN=topcoder-dev.com
    export DYNAMODB_ENDPOINT=http://localhost:7777
    export FILE_SERVICE_ENDPOINT=http://localhost/v3/
    export CHALLENGE_SERVICE_ENDPOINT=http://localhost/v3/
    export IDENTITY_SERVICE_ENDPOINT=http://localhost/v3/
    export SQS_URL=http://localhost:4568/submissions
    java -Ddw.server.applicationConnectors[0].port=8180 -Ddw.server.adminConnectors[0].port=8181 -jar target/submission-service-1.0.1-SNAPSHOT.jar server src/main/resources/config.yml

To execute the service:

    sh run.sh

# Executing the Submission Processor

cd into the ap-submission-processor/service folder, in there you will find a run.sh file which contains all environment variables and the startup command to run the processor:

    SQS_URL=http://localhost:4568/submissions
    API_URL=http://localhost/v3
    DYNAMODB_URL=http://localhost:7777
    ZOOKEEPER_HOSTS_LIST=localhost:2181
    java -Ddw.server.applicationConnectors[0].port=8280 -Ddw.server.adminConnectors[0].port=8281 -jar target/ap-submission-processor-1.0-SNAPSHOT.jar server src/main/resources/config.yml

# Accessing the Submission UI

Once the system is up and running, we can access the submission user interface to do a submission, however the system requires authentication, and we’ll have to fake it by setting some cookies and local storage values.

Open your browser and navigate to: http://local.topcoder-dev.com:3000

You should see a login screen. Open the browser’s javascript console, paste and execute the the following code:

    document.cookie="tcsso=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJhZG1pbmlzdHJhdG9yIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJoZWZmYW4iLCJleHAiOjE3NjYyODkyNDYsInVzZXJJZCI6IjEzMjQ1NiIsImlhdCI6MTQ1MDkyOTI0NiwiZW1haWwiOm51bGwsImp0aSI6IjEzNjljNjAwLWUwYTEtNDUyNS1hN2M3LTU2YmU3ZDgxM2Y1MSJ9.hp5peSoj-fh3KFkskvBpfUFIcJNtsv4zIMFV-D8F3JA";
    document.cookie="tcjwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJhZG1pbmlzdHJhdG9yIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJoZWZmYW4iLCJleHAiOjE3NjYyODkyNDYsInVzZXJJZCI6IjEzMjQ1NiIsImlhdCI6MTQ1MDkyOTI0NiwiZW1haWwiOm51bGwsImp0aSI6IjEzNjljNjAwLWUwYTEtNDUyNS1hN2M3LTU2YmU3ZDgxM2Y1MSJ9.hp5peSoj-fh3KFkskvBpfUFIcJNtsv4zIMFV-D8F3JA";
    localStorage.setItem("appiriojwt", '"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJhZG1pbmlzdHJhdG9yIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJoZWZmYW4iLCJleHAiOjE3NjYyODkyNDYsInVzZXJJZCI6IjEzMjQ1NiIsImlhdCI6MTQ1MDkyOTI0NiwiZW1haWwiOm51bGwsImp0aSI6IjEzNjljNjAwLWUwYTEtNDUyNS1hN2M3LTU2YmU3ZDgxM2Y1MSJ9.hp5peSoj-fh3KFkskvBpfUFIcJNtsv4zIMFV-D8F3JA"');

This browser now has the fake authentication, and we can go to the submission UI: http://local.topcoder-dev.com:3000/challenges/11/submit/file/  
Note the challenge id there is 11, that is the only challenge that is setup in Informix to allow submissions, if you would like to use other challenges you will have to create resource and phase records in Informix, however, using challenge 11 should be sufficient for our purposes.

You should now see a series of fields that can be populated by the submitter, the only required fields are the files at the top, and the “I UNDERSTAND AND AGREE” checkbox at the bottom:

![Files submission preview](submission_preview.png)

The submission zip is the representation of a design submission, it should be a simple zip file containing images. Any valid png, jpg, gif, or bpm files are allowed. You can download some images, take a few screenshots and create a submission zip file containing those images. The folder structure inside this submission zip doesn’t matter. This file needs to have valid images because those are processed, resized, watermarked, etc. Non image files in the submission.zip should be ignored.

The source zip file contains the source files for the submission, such as a photoshop project. The contents of this file doesn’t impact the process, you could simply have a zip file with just one file inside, or even use the submission zip itself, it doesn’t matter, as long as it is a valid zip.

The preview image is a cover image for the submission, any valid png or jpg file can be  submitted as the preview.

Select your 3 files, scroll to the bottom, check the “AGREE” box, and click the submit button, you should see the upload happening, and the process logs flowing in the submission processor console.

If you see a message in the console saying “SUCCESSFUL NOTIFICATION SENT”, it means the processor finished successfully, otherwise you would see the exceptions in the log.

# Known Issues

* Local SQS sometimes stops working, messages don’t get delivered from the submission service to the submission processor. The best way to fix this issue is just to restart the local services with docker-compose down / docker-compose up submissions;

# Happy coding :)
