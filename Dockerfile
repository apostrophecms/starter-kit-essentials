FROM node:12
WORKDIR /app
COPY . /app/
RUN npm install
EXPOSE 3000
RUN echo $(date +%s) > RELEASE_ID
RUN APOS_RELEASE_ID=$(cat RELEASE_ID); npm run build
ARG APOS_RELEASE_ID=$(cat RELEASE_ID)
CMD ["npm", "start" ]
