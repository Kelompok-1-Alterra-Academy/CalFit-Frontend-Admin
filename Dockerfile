# Install dependencies
FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile
COPY . .

# Rebuild the source code
FROM node:14-alpine AS builder
WORKDIR /app
COPY --from=deps /app ./
RUN npm run build

# Production image, copy all the files and run next
FROM node:14-alpine AS production
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]