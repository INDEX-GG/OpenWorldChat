FROM node:18
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm i
CMD ["npm", "run", "start"]
