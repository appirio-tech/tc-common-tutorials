#! /bin/bash
echo 'build auto-pilot'
rm -rf /root/deployment/auto_pilot

cp -n /root/config/online_review/build.properties.docker /root/online_review/build.properties
cp -n /root/config/online_review/token.properties.docker /root/online_review/token.properties

cp -n /root/config/auto_pilot/build.properties.docker /root/auto_pilot/build.properties

cd /root/auto_pilot
mvn -B -Dmaven.test.skip=true clean antrun:run@tokenize package assembly:single

cp -r target/auto_pilot_app /root/deployment/auto_pilot
