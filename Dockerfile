FROM ubuntu:latest

RUN apt-get update && apt-get install -y npm nodejs && npm i -g @nestjs/cli
RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app/

COPY . /usr/src/app/

RUN npm i

CMD [ "npm", "run", "start:dev"]
