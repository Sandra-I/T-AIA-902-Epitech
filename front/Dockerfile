FROM node:latest

RUN mkdir -p .

WORKDIR .

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3006

CMD ["npm", "start"]
