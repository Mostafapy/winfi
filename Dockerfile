FROM node:11-alpine 

RUN mkdir -p /winfi/src

WORKDIR /winfi/src

COPY package.json /winfi/src

RUN npm install

COPY . /winfi/src

CMD [ "npm", "run", "start" ]
