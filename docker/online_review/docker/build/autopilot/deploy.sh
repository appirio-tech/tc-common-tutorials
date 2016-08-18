#! /bin/bash
set -e

SVN_USERNAME=$1
SVN_PASSWORD=$2
svn co --non-interactive --no-auth-cache --username $SVN_USERNAME --password $SVN_PASSWORD https://coder.topcoder.com/tcs/clients/cronos/applications/online_review/trunk /root/online_review
mv build.properties /root/online_review/
mv token.properties /root/online_review/
mv build.properties.autopilot /root/online_review/scripts/auto_pilot/
#add svn user name and password to build.properies
echo "build.svn.username=$SVN_USERNAME" >> /root/online_review/build.properties
echo "build.svn.password=$SVN_PASSWORD" >> /root/online_review/build.properties
cd /root/online_review
ant checkout-components 
cd /root/online_review/scripts/auto_pilot
ant clean dist deploy
cp -R /root/online_review/conf /root/
rm -rf /root/online_review/*
mv /root/conf /root/online_review
