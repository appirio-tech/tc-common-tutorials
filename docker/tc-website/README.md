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

docker build -t appiriodevops/tc-website:base base
docker build -t appiriodevops/tc-website:build build
docker build -t appiriodevops/tc-website:run run
docker build -t appiriodevops/tc-website:httpd httpd
```

## Prepare tc-website Codebase
Pull following repos into a directory (e.g. tc-platform):
- https://github.com/topcoder-platform/tc-website
- https://github.com/topcoder-platform/tc-website-external-artifacts
- https://github.com/topcoder-platform/tc-website-glue
- https://github.com/topcoder-platform/tc-website-shared
- https://github.com/topcoder-platform/tc-website-static
- https://github.com/appirio-tech/temp-maven-repo

## Checkout tc-website and all other repo
```
TC_WEBSITE_HOME=/home/tc/tc-platform
mkdir -p $TC_WEBSITE_HOME
cd $TC_WEBSITE_HOME
git clone https://github.com/topcoder-platform/tc-website tc-website
git clone https://github.com/topcoder-platform/tc-website-external-artifacts external-artifacts
git clone https://github.com/topcoder-platform/tc-website-glue glue
git clone https://github.com/topcoder-platform/tc-website-shared shared
git clone https://github.com/topcoder-platform/tc-website-static
git clone https://github.com/appirio-tech/temp-maven-repo
```

## Deployment
Update the configuration values in env.sh file from the submission:
* TC_WEBSITE_HOME - the root directory of the tc-website codebase and all its required repos, point to the $TC_WEBSITE_HOME directory above
* JBOSS_DEPLOYMENT_DIR - the directory to put the jboss and the created wars.

Run `source env.sh` to create the environment variables. 

Then run `docker-compose up build-tc-website` to build the code and create jboss and tc-website wars. 

Finally run `docker-compose up -d tc-httpd` to run the all required services. To view jboss log run 
`docker-compose logs -f run-tc-website`

> NOTE: docker-compose will create custom network with ip network is configurable on *networks* section on ```docker-compose.yml``` file
> If you change this (subnet or gateway), make sure host ```env.topcoder.com``` on service ```run-tc-website``` point to ip address of gateway

## Setup circleci
Grant circleci access to repo tc-website. If there are any specific configuration related to circleci put it under ```.deploy/circleci```. All files under that directory will be copied to tc-website root before testinf being executed.

Any push action will trigger circleci build process.

## Verification
Add the following entry to your hosts file:
`<docker-ip>    local.tc.cloud.topcoder.com`

Where `<docker-ip>` is the ip address of your docker box. It should be set to `127.0.0.1` on Linux or `192.168.99.100` on Windows/macOS if you are using Docker Toolbox.

## Test Data

Insert some test data into informix database. Also currently the database misses *user_sso_login* table, it needs be created:

```shell
docker cp test_files/mm_test_data.sql iif_innovator_c:/tmp
docker cp test_files/user_sso_login.sql iif_innovator_c:/tmp
docker exec -it iif_innovator_c bash
dbaccess informixoltp /tmp/mm_test_data.sql
dbaccess common_oltp /tmp/user_sso_login.sql
exit
```

### Authentication

1. Visit https://local.tc.cloud.topcoder.com/tc - accept the self-signed SSL certificate. See http://take.ms/r5A9U
2. Now visit https://local.tc.cloud.topcoder.com/tc?&module=Login - login with `heffan/password`. See http://take.ms/uxt4K
3. You will be redirected to an interstitial page then the main site (https://www.topcoder.com/my-dashboard/). See http://take.ms/O3AaE
4. Now visit https://local.tc.cloud.topcoder.com/tc?module=MyHome - to switch from the main site back to docker.

You can now try the following pages:
TC WAR:
* Open https://local.tc.cloud.topcoder.com/tc?module=MyHome, the page is like: http://take.ms/TYP9F
* Open https://local.tc.cloud.topcoder.com/tc?module=EditTheme, change to use old theme, the page is like: http://take.ms/efKBr

Note that the links like https://local.tc.cloud.topcoder.com/challenges/design/active won't work.

Marathon Match WAR:

- Open https://local.tc.cloud.topcoder.com/longcontest/?module=ViewActiveContests, the page is like: http://take.ms/18mww

- Open https://local.tc.cloud.topcoder.com/longcontest/?module=ViewStandings&rd=13673, the page is like: http://take.ms/2TSYJ

- Open https://local.tc.cloud.topcoder.com/longcontest/?module=ViewSubmissionHistory&cr=124834&rd=13673&compid=2020, the page is like: http://take.ms/Wp8cC

- Open https://local.tc.cloud.topcoder.com/longcontest/?module=ViewExampleHistory&cr=124834&rd=13673&compid=2020, the page is like: http://take.ms/HjZES

- Open https://local.tc.cloud.topcoder.com/longcontest/?module=ViewProblemStatement&compid=2020&rd=13673, the page is like: http://take.ms/JKUfg

- Open https://local.tc.cloud.topcoder.com/longcontest/?module=ViewReg&rd=13673, the page is like: http://take.ms/2iCRu

- Open https://local.tc.cloud.topcoder.com/longcontest/?module=ViewRegistrants&rd=13673, the page is like: http://take.ms/F9jit

Query WAR:
* Open https://local.tc.cloud.topcoder.com/query/query, the page is like: http://take.ms/UvcrU

Admin WAR:
* Open https://local.tc.cloud.topcoder.com/admin/, the page is like: http://take.ms/nygny
* Open https://local.tc.cloud.topcoder.com/admin/?module=TermsList, the page is like: http://take.ms/P061N

CORP WAR:
* Open https://local.tc.cloud.topcoder.com/corp/, the page is like: http://take.ms/d6tMF

Email WAR:
* Open https://local.tc.cloud.topcoder.com/email/, the page is like: http://take.ms/BNbd5

Reg WAR:
* Open https://local.tc.cloud.topcoder.com/reg/, the page is like: http://take.ms/jkbVm

EP WAR:
* Open https://local.tc.cloud.topcoder.com/ep, the page is like: http://take.ms/Nw1bV

Private Label WAR:
* Open https://local.tc.cloud.topcoder.com/pl/, the page is like: http://take.ms/x3pr5

Note that you may receive HTTPS certificate warnings, just ignore it and proceed.
And you can click around to try the other pages.
