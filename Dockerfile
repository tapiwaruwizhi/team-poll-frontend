# Build stage
FROM node:16 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code
COPY . .

# Disable source maps to prevent Docker sourcemap errors
ENV GENERATE_SOURCEMAP=false

# Build the app
RUN npm run build

# Production stage - Serve with 'serve'
FROM node:16 AS production

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build files from previous stage
COPY --from=build /app/build ./build

# Expose the port for the frontend
EXPOSE 3000

# Run the production server
CMD ["npm", "start"]
# CMD ["serve", "-s", "build", "-l", "3000"]
