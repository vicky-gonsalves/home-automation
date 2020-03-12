FROM node:12.15-alpine

RUN mkdir -p /usr/src/home-automation

WORKDIR /usr/src/home-automation

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

RUN yarn build

EXPOSE 3000
