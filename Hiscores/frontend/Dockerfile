FROM node:latest

ARG PUBLIC_HOST_URL
ARG PUBLIC_API_URL

ENV PUBLIC_HOST_URL $PUBLIC_HOST_URL
ENV PUBLIC_API_URL $PUBLIC_API_URL

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run-script build

EXPOSE 5173

CMD [ "npm", "run-script", "dev" ]