FROM node:16
WORKDIR /usr/src/app
COPY . .
RUN npm i -g nodemon
RUN npm i 
RUN apt update && apt install -y netcat
RUN ["chmod", "+x", "./wait-for.sh"]
CMD ["nodemon", "index.js"]