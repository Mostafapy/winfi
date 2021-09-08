FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install curl -y && \
    apt-get install -y sudo && \
    cd ~ && \
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && \
    apt-get install -y nodejs && \
    node -v

RUN apt-get install cmake -y && \
    apt-get install make -y && \
    apt-get install build-essential -y

RUN apt-get update && \
    apt-get install openssh-server -y && \
    service ssh start && \
    apt-get install ufw && \
    ufw allow ssh
    
RUN mkdir -p /winfi/src

WORKDIR /winfi/src

COPY package.json /winfi/src

RUN npm install

COPY . /winfi/src

EXPOSE 22

CMD ["npm", "run", "start"]