FROM node:18.17.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3800
EXPOSE 3800
CMD ["node", "index.js"]