FROM centos:6

RUN yum install -y unzip

# Install Oracle JDK 7u79
RUN mkdir /opt/java && cd /tmp && \
    curl -L -O -H "Cookie: oraclelicense=accept-securebackup-cookie" -k "http://download.oracle.com/otn-pub/java/jdk/7u79-b15/jdk-7u79-linux-x64.tar.gz" && \
    tar xf jdk-7u79-linux-x64.tar.gz -C /opt/java && \
    rm -f jdk-7u79-linux-x64.tar.gz && \
    ln -s /opt/java/jdk* /opt/java/jdk && \
    ln -s /opt/java/jdk /opt/java/jvm

# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /opt/java/jdk

# Add /opt/java and jdk on PATH variable
ENV PATH ${PATH}:${JAVA_HOME}/bin:/opt/java

# Install JBoss
ENV JBOSS_VERSION 4.0.5.GA

RUN mkdir /root/jboss-${JBOSS_VERSION} && cd /tmp && \
    curl -L -O "https://sourceforge.net/projects/jboss/files/JBoss/JBoss-${JBOSS_VERSION}/jboss-${JBOSS_VERSION}.zip"

WORKDIR /tmp

RUN unzip jboss-${JBOSS_VERSION}.zip -d /root && \
    rm -f jboss-${JBOSS_VERSION}.zip && \
    chmod +x /root/jboss-${JBOSS_VERSION}/bin/*.sh

# Set the JBOSS_HOME env variable
ENV JBOSS_HOME /root/jboss-${JBOSS_VERSION}

# Add /root/jboss on PATH variable
ENV PATH ${PATH}:${JBOSS_HOME}/bin

# updated for ip bind
COPY start-jboss.sh ${JBOSS_HOME}/bin/
COPY cache /root/jboss-${JBOSS_VERSION}/server/cache/

EXPOSE 8080

CMD ["/bin/bash", "/root/jboss-4.0.5.GA/bin/start-jboss.sh"]