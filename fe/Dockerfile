FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY shared ./shared
COPY fe ./fe

RUN npm install --workspace=fe --workspace=shared

WORKDIR /app/fe

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
