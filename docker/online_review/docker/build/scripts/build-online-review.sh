#! /bin/bash
rm -rf /root/deployment/jboss-4.0.2

cp -f /root/config/online_review/build.properties.docker /root/online_review/build.properties
cp -f /root/config/online_review/token.properties.docker /root/online_review/token.properties

cd /root/deployment
tar xzf /root/jboss-4.0.2.tar.gz

cd /root/online_review
ant first_deploy deploy

mkdir /root/deployment/jboss-4.0.2/online-review-conf
cp -rf /root/online_review/conf/* /root/deployment/jboss-4.0.2/online-review-conf
