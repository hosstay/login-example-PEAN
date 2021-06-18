  # use latest version of nodejs
  FROM node:lts-alpine
  # as build-stage
  
  # install aurelia-cli to build the app & http-server to serve static contents
  # RUN npm i -g http-server
  # RUN npm i -g aurelia-cli
  RUN npm i -g nodemon
  
  # set working directory to code
  # henceforth all commands will run inside this folder
  WORKDIR /code
  
  # copy package.json related files first and install all required dependencies
  COPY package*.json ./
  RUN npm install
  
  # copy the rest of files and folders & install dependencies
  COPY . ./
  # RUN npm run build
  
  # use nginx as the http server to serve contents
  # FROM nginx:alpine as production-stage
  # WORKDIR /usr/share/nginx/html
  # copy files from previous container/stage into the new one
  # from /app/dist to working directory
  # COPY --from=build-stage /app/dist ./
  EXPOSE 3000
  CMD ["nodemon", "server"]
  
