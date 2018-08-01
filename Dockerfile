# --- Build ---
FROM node:8 AS build
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

ARG env=prod
RUN npm run build -- --prod --environment $env

# --- Release ---
FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
