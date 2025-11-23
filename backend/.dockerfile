FROM node:20-alpine AS  builder
WORKDIR /app
COPY packege*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
RUN  pnpm prisma generate
RUN pnpm build
COPY . . 


FROM node:20-alpine AS  runner
WORKDIR /app
COPY --from=builder /app/node_modules  ./node_modules
COPY --from=builder /app/prisma  ./prisma
COPY --from=builder /app/dist  ./dist
EXPOSE 8000
ENV NODE_ENV=production
CMD [ "node", "dist/src/main.js" ]