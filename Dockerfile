FROM node:14-alpine 

RUN apk add g++ make python

RUN apk update \
    && apk --no-cache --update add build-base 

RUN mkdir -p /winfi/src

WORKDIR /winfi/src

COPY package.json /winfi/src

RUN npm install

COPY . /winfi/src

CMD [ "npm", "run", "start" ]