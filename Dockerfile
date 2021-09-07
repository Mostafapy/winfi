FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get install curl -y && \
    cd ~ && \
    curl -sL https://deb.nodesource.com/setup_lts.x | -E bash - && \
    apt-get install -y nodejs && \
    nodejs -v

RUN apt-get install cmake -y && \
    apt-get install make -y && \
    apt-get install build-essential -y

RUN apt-get update && \
    apt-get install openssh-server -y && \
    systemctl status ssh && \
    ufw allow ssh

RUN mkdir -p /winfi/src

WORKDIR /winfi/src

COPY package.json /winfi/src

RUN npm install

COPY . /winfi/src

EXPOSE 22

CMD ["npm", "run", "start"]