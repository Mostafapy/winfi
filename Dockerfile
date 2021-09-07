FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    ${DEBIAN_FRONTEND} apt-get install curl -y && \
    ${DEBIAN_FRONTEND} apt-get install -y sudo && \
    cd ~ && \
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && \
    ${DEBIAN_FRONTEND} apt-get install -y nodejs && \
    node -v

RUN ${DEBIAN_FRONTEND} apt-get install cmake -y && \
    ${DEBIAN_FRONTEND} apt-get install make -y && \
    ${DEBIAN_FRONTEND} apt-get install build-essential -y

RUN ${DEBIAN_FRONTEND} -get update && \
    ${DEBIAN_FRONTEND} apt-get install openssh-server -y && \
    ${DEBIAN_FRONTEND} systemctl status ssh && \
    ${DEBIAN_FRONTEND} ufw allow ssh

RUN mkdir -p /winfi/src

WORKDIR /winfi/src

COPY package.json /winfi/src

RUN npm install

COPY . /winfi/src

EXPOSE 22

CMD ["npm", "run", "start"]