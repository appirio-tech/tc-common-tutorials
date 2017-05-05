#! /bin/bash
cd /root/deployment/auto_pilot
ant test_ap &

cd /root/deployment/jboss-4.0.2
bin/run.sh -b 0.0.0.0 &

tail -f /dev/null & wait ${!}
