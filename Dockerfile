FROM node:12

RUN mkdir /usr/src/cache

WORKDIR /usr/src/cache

COPY package*.json ./

RUN npm install

WORKDIR /usr/src/app/front

RUN mkdir ./node_modules

EXPOSE 3000
