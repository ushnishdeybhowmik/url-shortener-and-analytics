# Base Dependencies
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# For development
FROM base AS development
RUN npm install
COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD sh -c "npm run db:migrate && npm run dev"