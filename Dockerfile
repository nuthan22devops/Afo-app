FROM --platform=linux/arm64 node:22-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY backend/ .

# Copy frontend into the image
COPY frontend ./frontend

EXPOSE 3000

CMD ["node", "server.js"]
