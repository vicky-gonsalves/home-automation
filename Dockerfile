FROM node:12.15-alpine

RUN apk add g++ make python

RUN mkdir -p /usr/src/home-automation

WORKDIR /usr/src/home-automation

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --network-timeout 1000000

COPY . .

RUN yarn build

EXPOSE 3000
