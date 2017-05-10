FROM centos:6

# install tools
RUN yum install -y \
  unzip \
  wget \
  dos2unix

# install jdk7

RUN cd /opt/ \
       && wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/7u79-b15/jdk-7u79-linux-x64.tar.gz" \
       && tar xzf jdk-7u79-linux-x64.tar.gz \
       && rm -rf jdk-7u79-linux-x64.tar.gz

WORKDIR /root

# install apache-ant
RUN wget -O /root/apache-ant-1.7.1-bin.zip http://archive.apache.org/dist/ant/binaries/apache-ant-1.7.1-bin.zip \
        && unzip /root/apache-ant-1.7.1-bin.zip \
        && rm /root/apache-ant-1.7.1-bin.zip

# install grails
RUN wget -O /root/grails-1.3.7.zip http://dist.springframework.org.s3.amazonaws.com/release/GRAILS/grails-1.3.7.zip \
        && unzip /root/grails-1.3.7.zip \
        && rm /root/grails-1.3.7.zip

# set env variables
ENV JAVA_HOME=/opt/jdk1.7.0_79
ENV JRE_HOME=/opt/jdk1.7.0_79/jre

ENV GRAILS_HOME /root/grails-1.3.7
ENV ANT_HOME /root/apache-ant-1.7.1
ENV PATH $JAVA_HOME/bin:$GRAILS_HOME/bin:$ANT_HOME/bin:$PATH

# init apache-ant
COPY plugins/ant-libs.tgz /root/
RUN tar -xzvf /root/ant-libs.tgz -C ${ANT_HOME}/lib \
        && rm /root/ant-libs.tgz

# init grails
COPY plugins/json-rest-api-1.0.8.zip ${GRAILS_HOME}/plugins/grails-json-rest-api-1.0.8.zip

# download jboss
RUN wget -O /root/jboss-4.2.3.zip http://downloads.sourceforge.net/project/jboss/JBoss/JBoss-4.2.3.GA/jboss-4.2.3.GA.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fjboss%2Ffiles%2FJBoss%2FJBoss-4.2.3.GA


ADD config /root/config
ADD scripts /root/scripts

RUN dos2unix /root/config/run.conf
RUN chmod +x /root/scripts/*.sh
RUN dos2unix /root/scripts/*.sh

RUN mkdir /root/temp_files
RUN mkdir -p /root/studiofiles/submissions

WORKDIR /root/jboss-4.2.3.GA/bin

# expose jboss ports
EXPOSE 8180 443 1198 1199 3973 5446