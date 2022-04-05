# ----- Base -----
FROM node:16
WORKDIR /usr/app

# ----- Install & Build -----
COPY ["package.json", "package-lock.json", "babel.config.json", "./"]
RUN npm install
COPY . .
RUN npm run build
