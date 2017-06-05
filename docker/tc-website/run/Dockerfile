FROM appiriodevops/tc-website:base
 
WORKDIR /root/deployment/jboss-4.0.4.GA/bin
 
ENV JAVA_OPTS '-Djavax.net.ssl.trustStore=TC.prod.ldap.keystore -Djavax.net.ssl.trustStorePassword=secret -Djava.net.preferIPv4Stack=true'
 
EXPOSE 8080 8009
 
# start JBoss
CMD ./run.sh -c all -b 0.0.0.0
