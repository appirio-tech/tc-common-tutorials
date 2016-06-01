FROM centos:6

# install tools
RUN yum install -y \
  unzip \
  wget \
  dos2unix

WORKDIR /root

# install jdk7

RUN wget -O /root/jdk-7u79-linux-x64.rpm --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/7u79-b15/jdk-7u79-linux-x64.rpm"
RUN rpm -ivh jdk-7u79-linux-x64.rpm

# install apache-ant
RUN wget -O /root/apache-ant-1.7.1-bin.zip http://archive.apache.org/dist/ant/binaries/apache-ant-1.7.1-bin.zip
RUN unzip /root/apache-ant-1.7.1-bin.zip

# install grails
RUN wget -O /root/grails-1.3.7.zip http://dist.springframework.org.s3.amazonaws.com/release/GRAILS/grails-1.3.7.zip
RUN unzip /root/grails-1.3.7.zip

# set env variables
ENV JAVA_HOME /usr/java/jdk1.7.0_79
ENV GRAILS_HOME /root/grails-1.3.7
ENV ANT_HOME /root/apache-ant-1.7.1
ENV PATH $JAVA_HOME/bin:$GRAILS_HOME/bin:$ANT_HOME/bin:$PATH

# init apache-ant
COPY ant-libs.tgz /root/
RUN tar -xzvf /root/ant-libs.tgz -C ${ANT_HOME}/lib

# init grails
COPY json-rest-api-1.0.8.zip ${GRAILS_HOME}/plugins/grails-json-rest-api-1.0.8.zip

# remove useless files
RUN rm /root/jdk-7u79-linux-x64.rpm
RUN rm /root/apache-ant-1.7.1-bin.zip
RUN rm /root/grails-1.3.7.zip
RUN rm /root/ant-libs.tgz
