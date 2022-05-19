FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 5000

CMD ["pm2-runtime", "index.js"]