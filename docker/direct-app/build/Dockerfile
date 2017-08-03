FROM centos:6

# install tools
RUN yum install -y unzip java-1.7.0-openjdk-devel && yum clean all

WORKDIR /root

# install apache-ant
RUN curl -L -O -k http://archive.apache.org/dist/ant/binaries/apache-ant-1.7.1-bin.zip && \
        unzip apache-ant-1.7.1-bin.zip \
        && rm apache-ant-1.7.1-bin.zip

# set env variables
ENV JAVA_HOME /usr/lib/jvm/java-1.7.0-openjdk.x86_64
ENV ANT_HOME /root/apache-ant-1.7.1
ENV PATH $JAVA_HOME/bin:$ANT_HOME/bin:$PATH

# init apache-ant
COPY plugins/ant-libs.tgz /root/
RUN tar -xzvf /root/ant-libs.tgz -C ${ANT_HOME}/lib \
        && rm /root/ant-libs.tgz

# download jboss
RUN curl -L -o /root/jboss-4.2.3.zip -k "http://downloads.sourceforge.net/project/jboss/JBoss/JBoss-4.2.3.GA/jboss-4.2.3.GA.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fjboss%2Ffiles%2FJBoss%2FJBoss-4.2.3.GA"


ADD config /root/config
ADD scripts /root/scripts

RUN mkdir /root/temp_files
RUN mkdir -p /root/studiofiles/submissions

WORKDIR /root/jboss-4.2.3.GA/bin

# expose jboss ports
EXPOSE 8180 443 1198 1199 3973 5446
