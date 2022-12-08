#FROM node:18
#WORKDIR /app
#COPY package.json .
#COPY package-lock.json .
#RUN npm i
#RUN npm i -g serve
#COPY . .
#RUN npm run build
#CMD ["serve", "-s", "-n", "-l", "3000"]

FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm i
COPY . /app
RUN npm run build

FROM nginx:1.17.0-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
