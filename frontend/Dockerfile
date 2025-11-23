FROM node:18-alpine 
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
RUN pnpm build
COPY . .
EXPOSE 3000
CMD [ "pnpm" , "start" ]