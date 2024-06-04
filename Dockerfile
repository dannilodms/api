FROM node:18 AS build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

ENTRYPOINT ["node", "dist/server.js"]
