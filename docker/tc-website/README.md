# Topcoder Website Local Deployment Using Docker

## Docker Images for tc-website
The following docker images are defined:
* base - located in base sub-directory, used as the base image forall images below. 
* build - located in build sub-directory, used to create the jboss and tc website wars ready for deployment. 
* run - located in run sub-directory used to run the jboss created by the build image to run the tc website. 
* httpd - located in httpd sub-directory used to create and run apache httpd server

You need to run the following commands to build these images first:
```
# Go to the directory *docker/tc-website* extracting this submission

docker build -t tc-website:base base
docker build -t tc-website:build build
docker build -t tc-website:run run
docker build -t tc-website:httpd httpd
```

## Prepare tc-website Codebase
Pull following repos into a directory (e.g. tc-platform):
- https://github.com/topcoder-platform/tc-website   (with commit hash: f5e9ec2e9e7d99f012e308b530947ab034948ad6 branch: svn2git)
- https://github.com/topcoder-platform/tc-website-external-artifacts  (with commit hash: 33100ff8b102ee8a386c4200d571b6c31c33fad1 branch: svn2git)
- https://github.com/topcoder-platform/tc-website-glue  (with commit hash: 61849f3601a25efc40390a59eedd8d1dc92eb4ef branch: svn2git)
- https://github.com/topcoder-platform/tc-website-shared (with commit hash: fbbc0e49893bf972e46d7c73192a5592e39dab3b branch: svn2git)
- https://github.com/topcoder-platform/tc-website-static (with commit hash: fc26666a6ee3a323cdd8de9e849a2e576352a656)
- https://github.com/appirio-tech/temp-maven-repo (with commit hash:
ae8fe01f5b2f1aec9baa52dcff6d7bf02c5d93bf)

## Checkout tc-website and all other repo
```
mkdir -p $HOME/tc-platform
cd $HOME/tc-platform
git clone https://github.com/topcoder-platform/tc-website tc-website
git clone https://github.com/topcoder-platform/tc-website-external-artifacts external-artifacts
git clone https://github.com/topcoder-platform/tc-website-glue glue
git clone https://github.com/topcoder-platform/tc-website-shared shared
git clone https://github.com/topcoder-platform/tc-website-static
git clone https://github.com/appirio-tech/temp-maven-repo
```

## Applying Patch
```
cd to tc-website
git apply <submission>/tc-website/tc-website.diff

cd to glue
git apply <submission>/glue/glue.diff

cd to temp-maven-repo
git apply <submission>/temp-maven-repo/temp-maven-repo.diff
```

## Deployment
Update the configuration values in env.sh file from the submission:
* TC_PLATFORM_SRC_ROOT - the root directory of the tc-platform codebase, point to the tc-platform directory above
* DEPLOYMENT_DIR - the directory to put the jboss and the created wars.

Run `source env.sh` to create the environment variables. 

Then run `docker-compose up build-tc-website` to build the code and create jboss and tc-website wars. 

Finally run `docker-compose up -d tc-httpd` to run the all required services. To view jboss log run 
`docker-compose logs -f run-tc-website`


## Setup circleci
Grant circleci access to repo tc-website. If there are any specific configuration related to circleci put it under ```.deploy/circleci```. All files under that directory will be copied to tc-website root before testinf being executed.

Any push action will trigger circleci build process.

## Verification
see ```Verification.pdf```
