FROM appiriodevops/direct-app:base

WORKDIR /root

# download jboss
RUN wget -O /root/jboss-4.2.3.zip http://downloads.sourceforge.net/project/jboss/JBoss/JBoss-4.2.3.GA/jboss-4.2.3.GA.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fjboss%2Ffiles%2FJBoss%2FJBoss-4.2.3.GA


# init jboss
COPY jboss-service.xml /root/jboss-4.2.3.GA/server/default/conf/
COPY myserver.keystore /root/jboss-4.2.3.GA/server/default/conf/
COPY server.xml /root/jboss-4.2.3.GA/server/default/deploy/jboss-web.deployer/
COPY run.conf /root/jboss-4.2.3.GA/bin/

# copy properties files
COPY token.properties /root/token.properties
COPY topcoder_global.properties /root/topcoder_global.properties

# copy deploy script
COPY deploy.sh /root/
RUN dos2unix /root/deploy.sh

VOLUME ["/root/direct", "/data"]

ENTRYPOINT ["/root/deploy.sh"]
