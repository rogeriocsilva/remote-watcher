FROM node:15.13.0-alpine3.11

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . .
RUN yarn global add sequelize-cli
RUN yarn install


EXPOSE 4000
