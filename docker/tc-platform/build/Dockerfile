FROM tc-website:base

WORKDIR /root

# download jboss 4.0.4
RUN wget -O /root/jboss-4.0.4.GA.zip https://downloads.sourceforge.net/project/jboss/JBoss/JBoss-4.0.4.GA/jboss-4.0.4.GA.zip?r=https%3A%2F%2Fsourceforge.net%2Fprojects%2Fjboss%2Ffiles%2FJBoss%2FJBoss-4.0.4.GA

# copy files
COPY files /root/files

# copy build script
COPY build.sh /root

# make it executable
RUN dos2unix /root/build.sh
RUN chmod +x /root/build.sh

ENV JBOSS_HOME /root/deployment/jboss-4.0.4.GA

ENTRYPOINT ["/root/build.sh"]