#! /bin/bash
echo 'build late deliverables tracker'
rm -rf /root/deployment/late_deliverables_tracker

cp -n /root/config/online_review/build.properties.docker /root/online_review/build.properties
cp -n /root/config/online_review/token.properties.docker /root/online_review/token.properties

cp -n /root/config/late_deliverables_tracker/build.properties.docker /root/online_review/scripts/late_deliverables_tracker/build.properties

cd /root/online_review/scripts/late_deliverables_tracker
ant clean dist deploy
