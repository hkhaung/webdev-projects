# the only directory/project omitted is unit-testing

# Use Node.js as the base image for Vite/React projects
FROM node:18 AS build

# Build React + Vite code
WORKDIR /app/simple-memory-game/simple-memory-game
COPY simple-memory-game/simple-memory-game/package*.json ./
RUN npm install
COPY simple-memory-game/simple-memory-game ./
RUN npm run build

WORKDIR /app/generate-resume/generate-resume
COPY generate-resume/generate-resume/package*.json ./
RUN npm install
COPY generate-resume/generate-resume ./
RUN npm run build

# Build projects that use webpack
WORKDIR /app/quest-board/webpack
COPY quest-board/webpack/package*.json ./
RUN npm install
COPY quest-board/webpack ./
RUN npm run build

WORKDIR /app/restaurant-page/webpack
COPY restaurant-page/webpack/package*.json ./
RUN npm install
COPY restaurant-page/webpack ./
RUN npm run build

# Use NGINX to serve the built Vite projects and static files
FROM nginx:alpine

# Copy Vite build output from React + Vite builds
COPY --from=build /app/simple-memory-game/simple-memory-game/dist /usr/share/nginx/html/simple-memory-game
COPY --from=build /app/generate-resume/generate-resume/dist /usr/share/nginx/html/generate-resume

# Copy Webpack build output for webpack projects
COPY --from=build /app/quest-board/webpack/dist /usr/share/nginx/html/quest-board
COPY --from=build /app/restaurant-page/webpack/dist /usr/share/nginx/html/restaurant-page

# Copy static files from other projects
COPY calculator-game /usr/share/nginx/html/calculator-game
COPY dashboard /usr/share/nginx/html/dashboard
COPY datastructures /usr/share/nginx/html/datastructures
COPY dynamic-user-interface /usr/share/nginx/html/dynamic-user-interface
COPY etch-a-sketch /usr/share/nginx/html/etch-a-sketch
COPY landingpage /usr/share/nginx/html/landingpage
COPY library /usr/share/nginx/html/library
COPY rockpaperscissors /usr/share/nginx/html/rockpaperscissors
COPY signup-form /usr/share/nginx/html/signup-form

# Expose port 80 for HTTP access
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
