FROM node:23-alpine
LABEL authors="Filipe Figueiredo"

ARG PORT
ENV PORT=${PORT:-3000}

WORKDIR /app

RUN mkdir -p /app/src /app/prisma /app/logs

COPY package*.json ./
COPY ./src ./src
COPY tsconfig.json ./
COPY tsoa.json ./
COPY ./prisma ./prisma

RUN npm install && npx prisma generate && npm run build

EXPOSE $PORT

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start" ]
#CMD ["tail", "-f", "/dev/null" ]