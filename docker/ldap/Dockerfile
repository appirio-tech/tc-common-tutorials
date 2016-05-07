FROM centos:6
MAINTAINER "TCCODER" <TCCODER@email.here>

EXPOSE 389

# Install packages
RUN yum clean all
RUN yum install -y \
  curl initscripts java-1.7.0-openjdk \
  openldap openldap-servers openldap-clients

# -- Configure LDAP server, and start --
COPY openldap-config /etc/openldap/
RUN service slapd start
# certs
WORKDIR /etc/openldap/
RUN chown -R ldap:ldap *.pem
RUN keytool -import -trustcacerts -alias topcoder_prod -file TC_PROD_CA_X509.pem -keystore TC.prod.ldap.keystore -noprompt -storepass secret
# config file
RUN cp /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
RUN rm -rf /etc/openldap/slapd.d/*
#
USER ldap
RUN slaptest -f /etc/openldap/slapd.conf -F /etc/openldap/slapd.d
#
USER root
RUN chown -R ldap:ldap /etc/openldap/slapd.d
RUN chown -R ldap:ldap /var/lib/ldap/*
RUN chmod 600 /var/lib/ldap/*

# Import data
RUN service slapd restart && \
ldapadd -Z -x -D "cn=Manager,dc=topcoder,dc=com" -w secret -f /etc/openldap/tc.ldif && \
service slapd stop

# TEST COMMANDS:
#ldapsearch -x
#ldapsearch -x -Z
#ldapsearch -x -Z -b "dc=topcoder,dc=com" -D "cn=Manager,dc=topcoder,dc=com" -w secret

# start LDAP server, and KEEP PROCESS RUNNING
CMD service slapd start && bash
