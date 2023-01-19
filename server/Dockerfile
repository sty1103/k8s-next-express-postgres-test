From node:alpine
 
WORKDIR /usr/app
COPY ./ /usr/app

RUN apk update && apk add bash
RUN npm install
 
CMD ["node", "index.js"]