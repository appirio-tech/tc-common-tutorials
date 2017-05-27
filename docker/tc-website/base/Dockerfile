FROM centos:6.8

# install tools
RUN yum update -y && yum install -y unzip wget dos2unix

WORKDIR /root

# install jdk7
RUN wget -O /root/jdk-7u79-linux-x64.rpm --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/7u79-b15/jdk-7u79-linux-x64.rpm"
RUN rpm -ivh jdk-7u79-linux-x64.rpm

# install apache-ant
RUN wget -O /root/apache-ant-1.7.1-bin.zip http://archive.apache.org/dist/ant/binaries/apache-ant-1.7.1-bin.zip
RUN unzip /root/apache-ant-1.7.1-bin.zip

RUN wget https://nchc.dl.sourceforge.net/project/ant-contrib/ant-contrib/ant-contrib-1.0b2/ant-contrib-1.0b2-bin.tar.gz
RUN tar xzf ant-contrib-1.0b2-bin.tar.gz
RUN cp ant-contrib/lib/ant-contrib.jar /root/apache-ant-1.7.1/lib/

# set env variables
ENV JAVA_HOME /usr/java/jdk1.7.0_79
ENV ANT_HOME /root/apache-ant-1.7.1
ENV PATH $JAVA_HOME/bin:$GRAILS_HOME/bin:$ANT_HOME/bin:$PATH

RUN chmod 701 /root

# remove useless files
RUN rm /root/jdk-7u79-linux-x64.rpm
RUN rm /root/apache-ant-1.7.1-bin.zip
RUN rm /root/ant-contrib-1.0b2-bin.tar.gz
RUN rm -rf /root/ant-contrib
