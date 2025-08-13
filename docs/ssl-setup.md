# SSL Setup Guide for API

This guide explains how to set up HTTPS for the API to resolve mixed content issues when the admin panel (served over HTTPS) needs to communicate with the backend API.

## Prerequisites

- A server with nginx installed
- Domain name configured (api.alamin.rocks pointing to your server)
- Root or sudo access to the server

## Step 1: Install Certbot

```bash
# Update package list
sudo apt update

# Install Certbot and nginx plugin
sudo apt install certbot python3-certbot-nginx -y
```

## Step 2: Obtain SSL Certificate

```bash
# Obtain certificate for api.alamin.rocks
sudo certbot certonly --nginx -d api.alamin.rocks

# Follow the prompts:
# - Enter email address
# - Agree to terms
# - Choose whether to share email with EFF
```

## Step 3: Deploy Nginx Configuration

1. Copy the nginx configuration to the server:

```bash
# Copy the configuration file
sudo cp nginx/api.nginx.conf /etc/nginx/sites-available/api.alamin.rocks

# Create a symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/api.alamin.rocks /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

2. Create directory for Let's Encrypt challenges:

```bash
sudo mkdir -p /var/www/certbot
```

## Step 4: Set Up Automatic Certificate Renewal

```bash
# Test automatic renewal
sudo certbot renew --dry-run

# Add cron job for automatic renewal
sudo crontab -e

# Add this line to renew certificates twice daily
0 0,12 * * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
```

## Step 5: Update Application Configuration

1. **Admin Panel** - Already updated:
   - `.env.local`: `NEXT_PUBLIC_API_URL=https://api.alamin.rocks`
   - `src/lib/api.ts`: Fallback URL updated to use HTTPS

2. **Backend** - Already updated:
   - CORS settings now include HTTPS origins

3. **Main Environment File** - Already updated:
   - `.env`: API URLs updated to use HTTPS

## Step 6: Deploy Changes

1. **Deploy Admin Panel:**

```bash
cd admin
npm run build
# Deploy to your hosting service (e.g., PM2, Docker, etc.)
```

2. **Deploy Backend:**

```bash
cd backend
# Restart the backend service
# If using systemd:
sudo systemctl restart alamin-backend

# If using PM2:
pm2 restart backend

# If using Docker:
docker-compose restart backend
```

## Step 7: Verify Setup

1. **Check SSL Certificate:**

```bash
# Verify certificate is installed
curl -I https://api.alamin.rocks

# Check certificate details
openssl s_client -connect api.alamin.rocks:443 -servername api.alamin.rocks
```

2. **Test API Access:**

```bash
# Test API endpoint
curl https://api.alamin.rocks/health

# Test CORS headers
curl -I -X OPTIONS https://api.alamin.rocks/api/v1/auth/login \
  -H "Origin: https://admin.alamin.rocks" \
  -H "Access-Control-Request-Method: POST"
```

3. **Test Admin Panel:**
   - Navigate to https://admin.alamin.rocks
   - Open browser Developer Tools (F12)
   - Check Network tab for any mixed content warnings
   - Try logging in and performing API operations

## Troubleshooting

### Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Force renewal if needed
sudo certbot renew --force-renewal

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### CORS Issues

If you encounter CORS errors:

1. Check that the backend is running and accessible
2. Verify CORS settings in `backend/app/main.py`
3. Check nginx CORS headers in the configuration
4. Clear browser cache and cookies

### Connection Issues

```bash
# Check if nginx is running
sudo systemctl status nginx

# Check if backend is accessible locally
curl http://103.198.137.95:8120/health

# Check nginx proxy logs
sudo tail -f /var/log/nginx/access.log
```

## Security Considerations

1. **Firewall Rules:**

```bash
# Allow HTTPS traffic
sudo ufw allow 443/tcp

# Allow HTTP for Let's Encrypt challenges
sudo ufw allow 80/tcp
```

2. **Backend Security:**
   - Keep the backend on HTTP locally (port 8120)
   - Only expose it through the nginx HTTPS proxy
   - Consider restricting direct access to port 8120

```bash
# Block direct access to backend port from outside
sudo ufw delete allow 8120
```

3. **Regular Updates:**

```bash
# Keep certificates up to date
sudo certbot renew

# Update nginx regularly
sudo apt update && sudo apt upgrade nginx
```

## Alternative Solution: Using Cloudflare

If you prefer not to manage SSL certificates directly, you can use Cloudflare:

1. Add your domain to Cloudflare
2. Update DNS to point to Cloudflare
3. Enable "Full SSL/TLS" mode
4. Create a page rule for api.alamin.rocks with "SSL: Full"
5. Update nginx to accept Cloudflare's origin certificates

This provides automatic SSL management and additional security features.

## Summary

After completing these steps:
- API will be accessible via HTTPS at https://api.alamin.rocks
- Admin panel can communicate with the API without mixed content errors
- SSL certificates will auto-renew
- All traffic between admin panel and API will be encrypted