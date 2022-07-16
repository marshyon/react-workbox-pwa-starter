# React Firebase Auth starter app with PWA using Workbox


## running / building the development environment

To develop the app within a local container, it can be run with plain docker run commands or with the compose file and with docker-compose - **see the sections below** - see also 'Environment' to set up your own app with Firebase.

A working docker environment such as docker desktop or on a real linux system / vm with docker installed ofcourse needs to be present

VSCode is not a requirement but using VSCode with the `Remote - ssh` plugin when using a remote Linux server with Docker installed is convenient and productive.



## run in dev mode with docker run

### build

to build with docker 

```
docker build -t marshyon/react-workbox-pwa:dev .
```

### run

to run image 

```
./run_docker.sh
```
## run in dev mode with docker-compose

```
docker-compose up  --build
```

## deploy

Having done developing locally and when its time to test build / deploy with PWA enabled, run 

```
npm install
npm run build
```
which creates a deployable directory in `build` which can be run / tested for install with

```
serve -s build
```

## environment

this repo uses `.env` files to manage firebase access tokens

when setting up a firebase app in its web console at https://console.firebase.google.com/ you will need to get hold of the access tokens for your app and create an `.env` file like the following

```
# development
apiKey="your api key"
appId="your app id"
authDomain="your auth domain"
messagingSenderId="your mesaging sender id"
projectId="your project id"

```
if you want to you can protect your own `.env` file using https://dotenv.org/env-vault - where you can store your environment variables and even share them with other developers

at the moment its free to use


## reference

> https://mherman.org/blog/dockerizing-a-react-app/

> https://stackoverflow.com/questions/67087735/eacces-permission-denied-mkdir-usr-app-node-modules-cache-how-can-i-creat

salient bit being

```
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
```

there are likely other lesser measures to achive the same thing but as a development image this suffices for now - it is not for production