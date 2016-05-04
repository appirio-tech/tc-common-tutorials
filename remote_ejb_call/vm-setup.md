By default, TC VM is configured to use internal domain name which cannot be resolved from the outside. So you need to change the host name to the public domain.


First of all, you need to know your public domain. By default, the format of public domain name is like `ec2-<VM IP>.compute-1.amazonaws.com`, where you replace <VM IP> to the public IP of your VM, using dash to separate the 4 numbers. For example, my VM’s IP is `50.16.55.96`, then its domain name is `ec2-50-16-55-96.compute-1.amazonaws.com`.

# Login to your VM as `root`, edit `/etc/sysconfig/network` file, and set `HOSTNAME` to your public domain name.
```
HOSTNAME=ec2-50-16-55-96.compute-1.amazonaws.com
```
Then you need to restart your VM, using `/sbin/shutdown -r now`.

After the VM is restarted, all the applications are not running because they do not start automatically. You need to manually start them. For this challenge, you only need to start Informix, direct, and apache.

# Start Apache Server
Login to your VM as `root` user. Run `/usr/local/apache/bin/apachectl start` to start apache.

#Start Informix
Login to your VM as `root`. 
switch to `informix` user - `su - informix`
start the informix server - `oninit`. You should see something similar to the below screenshot.
 
#Start JBoss for Direct
Login to your VM as `root`. 
swtich to `direct` - `su - direct`
go to jboss bin directory - `jbb`
start the jboss service - `./start.sh`
The JBoss should be starting. You can use “tn” to check the log. Wait until the application is running. It may take several minutes.

#Start JBoss for legacy website
Login to your VM as `root`. 
swtich to `tc` user - `su - tc`
go to jboss bin directory - `jbb`
start the jboss service - `./start.sh`
You can use “tn” to check the log. Wait until the application finishes starting. It may take several minutes.
 

