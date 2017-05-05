#! /bin/bash
rm -rf /root/deployment/auto_pilot

cp -f /root/config/online_review/build.properties.docker /root/online_review/build.properties
cp -f /root/config/online_review/token.properties.docker /root/online_review/token.properties

cp -f /root/config/auto_pilot/build.properties.docker /root/online_review/scripts/auto_pilot/build.properties

cd /root/online_review/scripts/auto_pilot
ant clean dist deploy
