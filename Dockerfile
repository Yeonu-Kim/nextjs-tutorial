# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
# Install dependencies only, for better layer caching
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN node .yarn/releases/yarn-*.cjs install --immutable

# Stage 2: Build the Next.js application
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node .yarn/releases/yarn-*.cjs build

# Stage 3: Production container
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
# Start the app
CMD ["node", "server.js"]