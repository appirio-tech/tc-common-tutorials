# Guide

Run the commands 
```
# download the image
docker pull ibmcom/informix-developer-database:latest

# run the informix image
docker run -it --name iif_developer_edition --privileged -p 9088:9088 -p 9089:9089 -p 27017:27017 -p 27018:27018 -p 27883:27883 -e LICENSE=accept ibmcom/informix-developer-database:latest
```

Copy the following files to the container:
* apache-ant-1.9.8-bin.tar.gz - download it from http://mirrors.cnnic.cn/apache//ant/binaries/apache-ant-1.9.8-bin.tar.gz
* files/ant-libs.tgz - it will extracted to apache-ant
* tc-database-scripts - download it from https://github.com/appirio-tech/tc-database-scripts
* files/build.properties - it will be copied to tc-database-scripts

You can use command like `docker cp {file} iif_developer_edition:/` to copy files to the root of the container, where {file} is the file or directory above.

Now log into the container with command `docker exec -it iif_developer_edition bash`, and execute the following commands in the container:
'''
# install jdk
sudo apt-get update
sudo apt-get install -y openjdk-7-jdk

# extract apache-ant to /opt
tar -xzvf apache-ant-1.9.8-bin.tar.gz -C /opt

# extract the ant-libs to apache-ant's lib directory
tar -xzvf /ant-libs.tgz -C /opt/apache-ant-1.9.8/lib

# create 4G datadbs dbspace
touch /home/informix/data/spaces/datadbs.000
chmod 660 /home/informix/data/spaces/datadbs.000
onspaces -c -d datadbs -p /home/informix/data/spaces/datadbs.000 -o 0 -s 4194304

# copy the build.properties to tc-database-scripts
cp /build.properties /tc-database-scripts

# copy the tc-database-scripts/connfile.sql.example as connfile.sql
cp /tc-database-scripts/connfile.sql.example /tc-database-scripts/connfile.sql

# go to tc-database-scripts directory and setup db
cd /tc-database-scripts
/opt/apache-ant-1.9.8/bin/ant setup_db
'''
