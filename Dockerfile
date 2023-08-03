# Stage 1
FROM node:14 AS builder
WORKDIR /usr/src/app
COPY package*.json ./

# Install Python and bcrypt
RUN apt-get update && apt-get install -y python
RUN npm install bcrypt@5.1.0

# Install other dependencies and build
RUN npm install
RUN npm rebuild bcrypt
COPY . .
RUN npm run build


###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install Python and bcrypt in the alpine image
RUN apk add --no-cache python3 make g++
RUN npm install bcrypt@5.1.0

# Remove node_modules and reinstall
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm install
RUN npm rebuild bcrypt

# Install app dependencies using the `npm ci` command instead of `npm install`
# RUN npm ci

# Bundle app source
COPY  --from=builder --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]