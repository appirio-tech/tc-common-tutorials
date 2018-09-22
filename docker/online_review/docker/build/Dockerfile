FROM centos:6.8

RUN yum -y install wget dos2unix

RUN cd /opt/ \
       && wget --no-cookies --no-check-certificate http://monalisa.cern.ch/MONALISA/download/java/jdk-7u80-linux-x64.tar.gz \
       && tar xzf jdk-7u80-linux-x64.tar.gz \
       && rm -rf jdk-7u80-linux-x64.tar.gz

ENV JAVA_HOME=/opt/jdk1.7.0_80
ENV JRE_HOME=/opt/jdk1.7.0_80/jre
ENV PATH=$PATH:/opt/jdk1.7.0_80/bin:/opt/jdk1.7.0_80/jre/bin

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
