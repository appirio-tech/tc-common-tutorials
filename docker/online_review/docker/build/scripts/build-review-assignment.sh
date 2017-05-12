#! /bin/bash
echo 'build review assignment'
rm -rf /root/deployment/review_assignment

cp -n /root/config/online_review/build.properties.docker /root/online_review/build.properties
cp -n /root/config/online_review/token.properties.docker /root/online_review/token.properties

cp -n /root/config/review_assignment/build.properties.docker /root/online_review/scripts/review_assignment/build.properties

cd /root/online_review/scripts/review_assignment
ant clean dist deploy
