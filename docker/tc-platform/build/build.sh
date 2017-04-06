#!/bin/bash

# remove old jboss
rm -rf /root/deployment/jboss-4.0.4.GA

# unzip a clean jboss
unzip /root/jboss-4.0.4.GA.zip -d /root/deployment

# init jboss
cp -f /root/files/jboss/jboss-service.xml $JBOSS_HOME/server/all/deploy/jbossweb-tomcat55.sar/META-INF
cp -f /root/files/jboss/web.xml $JBOSS_HOME/server/all/deploy/jbossweb-tomcat55.sar/conf

cp -f /root/files/tc_informix-ds.xml $JBOSS_HOME/server/all/deploy
cp -f /root/files/lib/ldap_sdk_interface.jar $JBOSS_HOME/server/all/lib
cp -f /root/files/TC.prod.ldap.keystore $JBOSS_HOME/bin
cp -f /root/files/resources/paymentRanges.xml $JBOSS_HOME/server/all/conf

# init code
cp -f /root/files/resources/ApplicationServer.properties /root/tc-platform/tc-website/resources
cp -f /root/files/resources/cache.properties /root/tc-platform/tc-website/resources
cp -f /root/files/resources/LDAP.properties /root/tc-platform/tc-website/resources
cp -f /root/files/distui/jboss-web.xml /root/tc-platform/tc-website/resources/distui
cp -f /root/files/build_distui.xml /root/tc-platform/tc-website
cp -f /root/files/build_tc.xml /root/tc-platform/tc-website

# deploy
cd /root/tc-platform/tc-website
ant -f build_tc.xml clean deploy
ant -f build_distui.xml clean deploy
