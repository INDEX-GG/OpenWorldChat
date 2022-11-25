FROM node:17-alpine
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm i
EXPOSE 5902
CMD ["npm", "run", "start"]