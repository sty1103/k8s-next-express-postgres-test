From node:alpine
 
WORKDIR /usr/app
COPY ./ /usr/app

RUN chown node:node /var/www/uploads
RUN apk update && apk add bash
RUN npm install
 
CMD ["node", "index.js"]