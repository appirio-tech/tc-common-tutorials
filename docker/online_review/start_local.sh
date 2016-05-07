#!/bin/bash

cd /root/online_review

cp build.properties.docker build.properties
cp token.properties.docker token.properties

ant first_deploy deploy
cd /root/jboss-4.0.2/bin
./run.sh -b 0.0.0.0
