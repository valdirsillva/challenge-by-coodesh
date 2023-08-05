### Image base
FROM node:18

WORKDIR /usr/src/challenge-by-coodesh

RUN npm install

RUN apk update && apk add tzdata &&\ 
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime &&\ 
    echo "America/Sao_Paulo" > /etc/timezone &&\ 
    apk del tzdata && rm -rf /var/cache/apk/*

COPY  ./dist .

# Expose port
EXPOSE 8000
CMD ["sh", "-c", "npm start & chown root:root /etc/crontabs/root && /usr/sbin/crond -f"]
