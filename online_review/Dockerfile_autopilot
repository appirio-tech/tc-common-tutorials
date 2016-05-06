FROM appiriodevops/online-review:env

ADD ./ /root/online_review

WORKDIR /root/online_review
RUN cp build.properties.docker build.properties
RUN cp token.properties.docker token.properties

WORKDIR /root/online_review/scripts/auto_pilot
RUN cp build.properties.docker build.properties
RUN ant clean dist deploy

RUN rm -rf /root/online_review

WORKDIR /root/auto_pilot

CMD ant test_ap
