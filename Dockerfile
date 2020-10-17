FROM node:12-alpine

ENV MONGO_CONN_STR=mongodb+srv://naeem:mzOEcgorEQUwiXyF@cluster0.yq4ag.azure.mongodb.net/concruise?retryWrites=true
ENV SERVER_PORT=3000

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# This step is very important as it allows docker to use cached layers on subsequent builds
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
# from current dir to workdir in container.
COPY . .

RUN npm run build

# open port 3000 in container
EXPOSE 3000

# Run server
CMD [ "node", "./dist/server.js" ]
