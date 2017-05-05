#! /bin/bash
rm -rf /root/deployment/auto_pilot

cp -n /root/config/online_review/build.properties.docker /root/online_review/build.properties
cp -n /root/config/online_review/token.properties.docker /root/online_review/token.properties

cp -n /root/config/auto_pilot/build.properties.docker /root/online_review/scripts/auto_pilot/build.properties

cd /root/online_review/scripts/auto_pilot
ant clean dist deploy
