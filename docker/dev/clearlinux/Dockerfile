FROM kiwfydev/node-clear-linux:latest

WORKDIR /usr/src/
RUN ls -la
COPY package-lock.json .
COPY package.json .

EXPOSE 3000

COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
