FROM node:14-alpine 

RUN mkdir -p /winfi

WORKDIR /winfi

COPY package.json /winfi

RUN npm install

COPY . /winfi

CMD [ "npm", "run", "start" ]