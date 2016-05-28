FROM node:4.4.0

MAINTAINER  dimkk

COPY . /var/www
WORKDIR /var/www

ENV NODE_ENV=test
ENV PORT=8080

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]