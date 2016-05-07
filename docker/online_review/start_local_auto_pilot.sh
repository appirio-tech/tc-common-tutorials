#!/bin/bash

cd /root/online_review

cp build.properties.docker build.properties
cp token.properties.docker token.properties

cd /root/online_review/scripts/auto_pilot
cp build.properties.docker build.properties
ant clean dist deploy
cd /root/auto_pilot
ant start_ap
tail -f /dev/null


