FROM appiriodevops/tc-website:base

RUN yum install -y gcc libtool httpd-devel-2.2.15 httpd-2.2.15 mod_ssl

WORKDIR /root

# install mod_jk
RUN wget http://mirror.bit.edu.cn/apache/tomcat/tomcat-connectors/jk/tomcat-connectors-1.2.46-src.tar.gz
RUN tar -xvzf tomcat-connectors-1.2.46-src.tar.gz
RUN cd tomcat-connectors-1.2.46-src/native; \
	./configure --with-apxs=/usr/sbin/apxs; \
	make; \
	libtool --finish /usr/lib64/httpd/modules; \
	make install

RUN rm tomcat-connectors-1.2.46-src.tar.gz
RUN rm -rf tomcat-connectors-1.2.46-src

COPY apache-conf /etc/httpd/conf

# generate ssl cert
RUN openssl req -new -newkey rsa:2048 -days 36500 -nodes -x509 \
	-subj "/C=US/ST=Connecticut/L=Hartford/O=Cloud/CN=local.tc.cloud.topcoder.com" \
	-keyout /etc/httpd/conf/server.key -out /etc/httpd/conf/server.crt

EXPOSE 80 443

RUN chown 701 /root
RUN ln -s /root/tc-platform/tc-website-static /var/www/tc-website-static

# start Apache
CMD apachectl -k start -DFOREGROUND
