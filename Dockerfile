FROM node:14-alpine 

RUN apk add g++ make python cmake

RUN apk update \
    apk add --update alpine-sdk && \
    apk add libffi-dev openssl-dev && \
    apk --no-cache --update add build-base && \
    apk --no-cache add curl && \
    apk add --update --no-cache openssh && \
    apk add --update --no-cache openssh-server && \
    apk add openrc 

RUN mkdir -p /winfi/src

WORKDIR /winfi/src

COPY package.json /winfi/src

RUN npm install

COPY . /winfi/src

RUN echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config

RUN ssh-keygen -A 

RUN echo "root:node" | chpasswd

EXPOSE 22

CMD ["npm run start"]