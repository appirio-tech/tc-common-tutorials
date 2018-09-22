#! /bin/bash
echo 'build online-review'

rm -rf /root/deployment/jboss-4.0.2

cp -n /root/config/online_review/build.properties.docker /root/online_review/build.properties
cp -n /root/config/online_review/token.properties.docker /root/online_review/token.properties

cd /root/deployment
tar xzf /root/jboss-4.0.2.tar.gz

export JBOSS_HOME=/root/deployment/jboss-4.0.2

#cd ${JBOSS_HOME}/server
#rm -rf default
#cp -Rf /root/default .

cd /root/online_review

mvn -Dmaven.test.skip=true clean antrun:run@tokenize package
mvn -Dmaven.test.skip=true antrun:run@first-deploy antrun:run@deploy-locally

cp target/review.war ${JBOSS_HOME}/server/default/deploy

mkdir ${JBOSS_HOME}/online-review-conf
cp -rf /root/online_review/conf/* /root/deployment/jboss-4.0.2/online-review-conf

mkdir -p /nfs_shares/studiofiles
mkdir -p /nfs_shares/tcssubmissions
mkdir -p /nfs_shares/tcs-downloads
