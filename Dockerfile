### Image base
FROM node:18

# Create a directory
WORKDIR /challenge-by-coodesh/src/

# install dependences
RUN npm install

COPY  . .

# Expose port
EXPOSE 8000
CMD ["node", "server.ts"]

