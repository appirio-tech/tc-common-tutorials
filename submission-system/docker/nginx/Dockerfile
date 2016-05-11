FROM danday74/nginx-lua

COPY default.conf /nginx/conf/nginx.conf
COPY cors-include.conf /data/cors-include.conf

CMD nginx && tail -f /nginx/logs/error.log
