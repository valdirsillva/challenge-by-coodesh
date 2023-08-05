### Image base
FROM node:18

WORKDIR /usr/src/challenge-by-coodesh

RUN npm install

COPY  ./dist .

# Expose port
EXPOSE 8000
CMD ["npm", "server.ts"]

