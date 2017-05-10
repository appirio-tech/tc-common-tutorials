#!/bin/bash

echo 'Prepare environment'
# remove the jboss in mounted data volume
rm -rf /data/jboss-4.2.3.GA

# unzip the fresh jboss to mounted data volume
unzip /root/jboss-4.2.3.zip -d /data


# init jboss
cp -f /root/config/jboss-service.xml /data/jboss-4.2.3.GA/server/default/conf/
cp -f /root/config/myserver.keystore /data/jboss-4.2.3.GA/server/default/conf/
cp -f /root/config/server.xml /data/jboss-4.2.3.GA/server/default/deploy/jboss-web.deployer/
cp -f /root/config/run.conf /data/jboss-4.2.3.GA/bin/
cp -f /root/scripts/start.sh /data/jboss-4.2.3.GA/bin/

# copy properties files to mounted direct volume (/root/direct)
cp -f /root/config/token.properties /root/direct/token.properties
cp -f /root/config/topcoder_global.properties /root/direct/topcoder_global.properties

# build and deploy
echo 'Build and deploy direct'
cd /root/direct
ant first_deploy

# cleanup
rm /root/direct/token.properties
rm /root/direct/topcoder_global.properties
