## Build LDAP Image
Use an existing docker file on [GitHub](https://github.com/appirio-tech/tc-common-tutorials/tree/master/docker) (use commit hash cfc5b80ead7f83a7d592e406ef3bd160889683c1). 
The README contains instructions on how to build the docker image.

The image is referenced in the provided docker-compose.yml file. 

## Docker Images for tc-website
The following docker images are defined:
* base - located in base sub-directory, used as the base image for build and run images below. 
* build - located in build sub-directory, used to create the jboss and tc website wars ready for deployment. 
* run - located in run sub-directory used to run the jboss created by the build image to run the tc website. 

You need to run the following commands to build these images first:
```
# Go to the directory extracting this submission

docker build -t tc-website:base base
docker build -t tc-website:build build
docker build -t tc-website:run run
```

## Prepare tc-website Codebase
Pull following repos into a directory (e.g. tc-platform):
https://github.com/topcoder-platform/tc-website   (with commit hash: f5e9ec2e9e7d99f012e308b530947ab034948ad6)
https://github.com/topcoder-platform/tc-website-external-artifacts  (with commit hash: 33100ff8b102ee8a386c4200d571b6c31c33fad1)
https://github.com/topcoder-platform/tc-website-glue  (with commit hash: 61849f3601a25efc40390a59eedd8d1dc92eb4ef)
https://github.com/topcoder-platform/tc-website-shared (with commit hash: fbbc0e49893bf972e46d7c73192a5592e39dab3b)
https://github.com/topcoder-platform/tc-website-static (with commit hash: fc26666a6ee3a323cdd8de9e849a2e576352a656)

Then rename the folders in tc-platform as below:
tc-platform
- tc-website - corresponding to tc-website repo (no renaming needed)
- external-artifacts - corresponding to tc-website-external-artifacts repo
- glue - corresponding to tc-website-glue repo
- shared - corresponding to tc-website-shared repo
- static - corresponding to tc-website-static repo

## Deployment
Update the configuration values in env.sh file from the submission:
* TC_PLATFORM_SRC_ROOT - the root directory of the tc-platform codebase, point to the tc-platform directory above
* DEPLOYMENT_DIR - the directory to put the jboss and the created wars.

Run `source env.sh` to create the environment variables. 

Then run `docker-compose up build-tc-website` to build the code and create jboss and tc-website wars. 
Finally run `docker-compose up run-tc-website` to run the jboss created above and setup apache. 

The console is like this: http://take.ms/wPZwi when it's ready to access the tc-website. 

## Verification
Add the following entries to your hosts file: 
docker-ip	local.tc.cloud.topcoder.com

Where docker-ip is the ip address of your docker box. It should be 127.0.0.1 on Linux. 

Open: https://local.tc.cloud.topcoder.com/tc, the page is like: http://take.ms/r5A9U
Open: https://local.tc.cloud.topcoder.com/tc?module=Login, the page is like http://take.ms/uxt4K

Login with: heffan/password, and after logged-in successfully, it will redirect user to page like: http://take.ms/O3AaE
and finally to the official topcoder.com page.

You can now try the following pages:
TC WAR: 
* Open https://local.tc.cloud.topcoder.com/tc?module=MyHome, the page is like: http://take.ms/TYP9F
* Open https://local.tc.cloud.topcoder.com/tc?module=EditTheme, change to use old theme, the page is like: http://take.ms/efKBr
* Open https://local.tc.cloud.topcoder.com/tc?module=ActiveContests&pt=39 (code active contests), the page is like: http://take.ms/RxSWZ

Note that the links like https://local.tc.cloud.topcoder.com/challenges/design/active won't work. 

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