FROM appiriodevops/informix:1.2

WORKDIR /home/informix/trunk
RUN oninit && ant drop_db
RUN cp build.properties ../
WORKDIR /home/informix/
RUN rm -rf trunk/*
RUN rm -rf trunk/.svn
