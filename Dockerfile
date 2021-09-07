FROM ubuntu:20.04

RUN apt update && \
    apt install curl && \
    cd ~ && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && \
    apt-get install -y nodejs && \
    nodejs -v

RUN apt install build-essential && \
    apt install cmake && \
    apt install make

RUN apt update && \
    apt install openssh-server && \
    systemctl status ssh && \
    ufw allow ssh

RUN mkdir -p /winfi/src

WORKDIR /winfi/src

COPY package.json /winfi/src

RUN npm install

COPY . /winfi/src

EXPOSE 22

CMD ["npm", "run", "start"]