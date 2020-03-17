FROM nginx:1.17.3

MAINTAINER gsxhnd <gsxhnd@gmail.com>

ADD dist/ /usr/share/nginx/html
EXPOSE 80
