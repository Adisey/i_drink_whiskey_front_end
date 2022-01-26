FROM node:14-alpine
WORKDIR /app
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install
ADD . .
ENV NODE_ENV production
RUN yarn build
#RUN npm prune --production
CMD ["yarn", "start"]
EXPOSE 3000