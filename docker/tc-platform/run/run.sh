#!/bin/bash

echo '127.0.0.1 local.tc.cloud.topcoder.com local.studio.cloud.topcoder.com local.tcs.cloud.topcoder.com' >> /etc/hosts

# start apache2
apachectl start

# copy static files to httpd
cp -rf /root/tc-platform/tc-website-static/* /var/www/html

# run jboss
cd /root/deployment/jboss-4.0.4.GA/bin
./run.sh -c all -b 0.0.0.0 -Dbind.address=127.0.0.1
