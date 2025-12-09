FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY shared ./shared
COPY be ./be

RUN npm install --workspace=be --workspace=shared

WORKDIR /app/be

EXPOSE 3001

CMD ["npm", "run", "dev"]
