FROM node:17-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm i
EXPOSE 5912
CMD ["npm", "run", "start"]