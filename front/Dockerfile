FROM node:18
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run build
RUN npm i -g serve
CMD ["serve", "-s", "build", "-n"]
