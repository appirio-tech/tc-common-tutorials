FROM appiriodevops/direct-app:base

# copy the built jboss, not needed if it's already mounted
# COPY deploy/jboss-4.2.3.GA /root/jboss-4.2.3.GA

# create directories configured in properties file
RUN mkdir /root/temp_files
RUN mkdir -p /root/studiofiles/submissions

WORKDIR /root/jboss-4.2.3.GA/bin

VOLUME ["/root/jboss-4.2.3.GA"]

# start the jboss
ENTRYPOINT ["./start.sh"]

# expose jboss ports
EXPOSE 8180 443 1198 1199 3973
