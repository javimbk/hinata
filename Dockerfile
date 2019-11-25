FROM node:12.13.0

WORKDIR /usr/src/hinata

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "-r", "esm", "lib/index.js"]
