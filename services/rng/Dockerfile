FROM node:alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./tsconfig.json ./
COPY ./src/ ./src/
RUN yarn build:prod

FROM node:alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /app/dist ./dist/
EXPOSE 8080
ENTRYPOINT [ "node", "./dist/index.js" ]