FROM tc-website:base

RUN yum install -y gcc libtool httpd-devel-2.2.15 httpd-2.2.15 mod_ssl

WORKDIR /root

# install mod_jk
RUN wget http://apache.mirror.rafal.ca/tomcat/tomcat-connectors/jk/tomcat-connectors-1.2.42-src.tar.gz
RUN tar -xvzf tomcat-connectors-1.2.42-src.tar.gz
RUN cd tomcat-connectors-1.2.42-src/native; \
	./configure --with-apxs=/usr/sbin/apxs; \
	make; \
	libtool --finish /usr/lib64/httpd/modules; \
	make install

RUN rm tomcat-connectors-1.2.42-src.tar.gz
RUN rm -rf tomcat-connectors-1.2.42-src

COPY run.sh /root
RUN dos2unix /root/run.sh
RUN chmod +x /root/run.sh

COPY apache-conf /root/apache-conf
RUN cp -rf /root/apache-conf/* /etc/httpd/conf

# generate ssl cert
RUN openssl req -new -newkey rsa:2048 -days 36500 -nodes -x509 \
	-subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com" \
	-keyout /etc/httpd/conf/server.key -out /etc/httpd/conf/server.crt

ENV JAVA_OPTS '-Djavax.net.ssl.trustStore=TC.prod.ldap.keystore -Djavax.net.ssl.trustStorePassword=secret'

EXPOSE 80 443

ENTRYPOINT ["/root/run.sh"]
