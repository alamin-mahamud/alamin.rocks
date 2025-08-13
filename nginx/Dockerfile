FROM nginx:alpine

# Install certbot dependencies if needed
RUN apk add --no-cache certbot

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create directories for SSL and certbot
RUN mkdir -p /etc/nginx/ssl /var/www/certbot

# Expose ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]