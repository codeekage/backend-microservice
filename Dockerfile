#Get offical Node.js Image
FROM node:carbon

#Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Run NPM
RUN npm install


# Bundle app source
COPY . .

# Expose app default port
EXPOSE 5000

# Start app

CMD [ "npm", "start"]


