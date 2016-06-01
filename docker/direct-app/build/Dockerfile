FROM appiriodevops/direct-app:base

WORKDIR /root

# download jboss
RUN wget -O /root/jboss-4.2.3.zip http://downloads.sourceforge.net/project/jboss/JBoss/JBoss-4.2.3.GA/jboss-4.2.3.GA.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fjboss%2Ffiles%2FJBoss%2FJBoss-4.2.3.GA

# copy setup files
COPY jboss-service.xml /root/
COPY myserver.keystore /root/
COPY server.xml /root/
COPY run.conf /root/
COPY start.sh /root/

# copy properties files
COPY token.properties /root/token.properties
COPY topcoder_global.properties /root/topcoder_global.properties

# copy deploy script
COPY deploy.sh /root/

# make it executable
RUN dos2unix /root/start.sh
RUN chmod 777 /root/start.sh
RUN dos2unix /root/deploy.sh
RUN chmod 777 /root/deploy.sh

VOLUME ["/root/direct", "/data"]

ENTRYPOINT ["/root/deploy.sh"]
