#! /bin/bash

set -o pipefail

function get_property {
    grep "^$2=" "$1" | cut -d'=' -f2
}

cd /root/deployment/auto_pilot

tr -d '\r' < build.properties > build.properties.tmp && mv build.properties.tmp build.properties

export POLL_INTERVAL=$(get_property build.properties poll_interval)

TOUCH_TIME=$(date +"%m/%d/%Y %I:%M %p")

echo "Launching Auto Pilot job with following parameters:"
echo "    pollInterval: ${POLL_INTERVAL}"
echo "    startTime   : ${TOUCH_TIME}"

nohup mvn -B -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn exec:exec &
