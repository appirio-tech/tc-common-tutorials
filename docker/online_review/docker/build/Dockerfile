FROM centos:6.8

RUN yum -y install wget dos2unix

RUN cd /opt/ \
       && wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/7u79-b15/jdk-7u79-linux-x64.tar.gz" \
       && tar xzf jdk-7u79-linux-x64.tar.gz \
       && rm -rf jdk-7u79-linux-x64.tar.gz

ENV JAVA_HOME=/opt/jdk1.7.0_79
ENV JRE_HOME=/opt/jdk1.7.0_79/jre
ENV PATH=$PATH:/opt/jdk1.7.0_79/bin:/opt/jdk1.7.0_79/jre/bin

RUN cd /opt/ \
       && wget https://archive.apache.org/dist/ant/binaries/apache-ant-1.7.0-bin.tar.gz \
       && tar xzf apache-ant-1.7.0-bin.tar.gz \ 
       && rm -rf apache-ant-1.7.0-bin.tar.gz 

ENV ANT_HOME=/opt/apache-ant-1.7.0 
ENV PATH=$PATH:/opt/apache-ant-1.7.0/bin

RUN cd /root/ \
       && wget http://downloads.sourceforge.net/project/jboss/JBoss/JBoss-4.0.2/jboss-4.0.2.tar.gz

ADD config /root/config
ADD scripts /root/scripts
RUN chmod +x /root/scripts/*.sh
RUN dos2unix /root/scripts/*.sh

RUN mkdir /root/downloads && mkdir /root/deployment

EXPOSE 8080 443
