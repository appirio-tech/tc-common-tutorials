#!/bin/bash

echo 'Prepare environment'
# remove the jboss in mounted data volume
rm -rf /data/jboss-4.2.3.GA

# unzip the fresh jboss to mounted data volume
unzip /root/jboss-4.2.3.zip -d /data

# copy properties files to mounted direct volume (/root/direct)
cp -f /root/token.properties /root/direct/token.properties
cp -f /root/topcoder_global.properties /root/direct/topcoder_global.properties

# build and deploy
echo 'Build and deploy direct'
cd /root/direct
ant first_deploy

# cleanup
rm /root/direct/token.properties
rm /root/direct/topcoder_global.properties
