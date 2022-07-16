FROM node:18.6-bullseye

#ADD packages.sh /usr/local/bin
#RUN chmod +x /usr/local/bin/packages.sh \
#    && /bin/bash /usr/local/bin/packages.sh
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# copy the scripts to the folder
COPY . ./

# start the server
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]

EXPOSE 3000

CMD ["npm", "start"]



