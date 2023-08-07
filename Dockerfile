FROM node:18-alpine

WORKDIR /usr/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY ./. ./

RUN yarn prisma generate

EXPOSE ${API_PORT}

CMD ["yarn","start:dev"]