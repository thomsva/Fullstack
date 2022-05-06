FROM node:16
WORKDIR /usr/src/app
COPY . .
RUN npm i -g nodemon
RUN npm i 
ENV DEBUG=playground:*
CMD ["nodemon", "./bin/www"]


