FROM node:12.15-alpine

RUN mkdir -p /usr/src/home-automation

WORKDIR /usr/src/home-automation

COPY package.json yarn.lock ./

RUN sudo apt-get update

RUN sudo apt-get install python

RUN yarn install --pure-lockfile --network-timeout 1000000

COPY . .

RUN yarn build

EXPOSE 3000
