FROM node:12-buster-slim

RUN apt-get update && apt-get install -y curl

WORKDIR /home/node

COPY package* ./

RUN npm install

COPY index.js ./

HEALTHCHECK --interval=5s --retries=1 --timeout=3s CMD [ "curl", "-sSf", "http://localhost:3000/health" ]

CMD ["node", "index.js"]
