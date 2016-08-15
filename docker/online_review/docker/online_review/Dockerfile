FROM appiriodevops/online-review:env

RUN mkdir /root/online_review
RUN mkdir /root/downloads

#Copy online_review code files to local disk
ADD ./ /root/online_review

WORKDIR /root/online_review

COPY build.properties.docker /root/online_review/build.properties
COPY token.properties.docker /root/online_review/token.properties

#Deploy online review app to jboss
RUN ant first_deploy deploy

CMD ["/root/jboss-4.0.2/bin/run.sh","-DFOREGROUND"]
