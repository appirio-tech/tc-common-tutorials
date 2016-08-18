FROM appiriodevops/online-review:env

ARG svn_username
ARG svn_password

RUN yum install -y svn
ADD . /root/
WORKDIR /root/

RUN ./deploy.sh $svn_username $svn_password

RUN mkdir /root/downloads

WORKDIR /root/auto_pilot

CMD ant test_ap
