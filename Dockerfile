FROM node:lts

WORKDIR /app

COPY . .

RUN npm update && \
npm install 
EXPOSE 9001

CMD ["bash", "run.sh"]