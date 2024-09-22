FROM node:18.20.3

ENV NODE_VERSION 18.20.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Define the command to run your application
CMD ["node", "./src/server.js"]
