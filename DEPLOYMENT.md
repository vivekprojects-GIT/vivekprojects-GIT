# Portfolio Deployment Guide

This guide covers various deployment options for your Generative AI Engineer portfolio.

## 🚀 Quick Start

### Local Development
```bash
# Clone and navigate to portfolio
git clone <your-repo-url>
cd portfolio

# Start local server
python3 -m http.server 8000
# OR
npx serve .

# Open in browser
open http://localhost:8000
```

### Run Interactive Demos
```bash
# Make script executable (if needed)
chmod +x run_demos.sh

# Run all demos
./run_demos.sh
```

## 🌐 Deployment Options

### 1. Netlify (Recommended)

**Pros**: Free, automatic deployments, custom domains, form handling
**Best for**: Static sites with forms

#### Steps:
1. **Prepare your repository**
   ```bash
   # Ensure all files are committed
   git add .
   git commit -m "Portfolio ready for deployment"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - Build command: `echo "Static site - no build needed"`
     - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Custom domain (optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Update DNS records as instructed

### 2. Vercel

**Pros**: Excellent performance, automatic deployments, serverless functions
**Best for**: React/Next.js projects (though works great for static sites too)

#### Steps:
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   # Follow the prompts
   ```

3. **Automatic deployments**
   - Connect your GitHub repository
   - Every push to main branch triggers deployment

### 3. GitHub Pages

**Pros**: Free, integrated with GitHub, simple setup
**Best for**: Open source projects

#### Steps:
1. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select source: "Deploy from a branch"
   - Choose branch: `main`
   - Choose folder: `/ (root)`

2. **Access your site**
   - URL: `https://yourusername.github.io/your-repo-name`

### 4. AWS S3 + CloudFront

**Pros**: Highly scalable, CDN integration, custom domains
**Best for**: Enterprise deployments

#### Steps:
1. **Create S3 bucket**
   ```bash
   aws s3 mb s3://your-portfolio-bucket
   ```

2. **Upload files**
   ```bash
   aws s3 sync . s3://your-portfolio-bucket --delete
   ```

3. **Configure static website hosting**
   - Enable static website hosting in S3 console
   - Set index document: `index.html`

4. **Set up CloudFront (optional)**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain

## 🔧 Environment Configuration

### For Interactive Demos

If you want to deploy the interactive demos (Gradio apps), consider these options:

#### Option 1: Hugging Face Spaces
```bash
# Create a new Space on Hugging Face
# Upload your demo files
# Set Space SDK to Gradio
```

#### Option 2: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

#### Option 3: Streamlit Cloud
```bash
# For Streamlit-based demos
# Connect GitHub repository to Streamlit Cloud
# Automatic deployment on push
```

## 📊 Performance Optimization

### Before Deployment

1. **Optimize images**
   ```bash
   # Install image optimization tools
   npm install -g imagemin-cli
   
   # Optimize images
   imagemin images/* --out-dir=images/optimized
   ```

2. **Minify CSS/JS**
   ```bash
   # Install minification tools
   npm install -g clean-css-cli uglify-js
   
   # Minify files
   cleancss -o styles.min.css styles.css
   uglifyjs script.js -o script.min.js
   ```

3. **Enable compression**
   - Most hosting platforms enable gzip compression automatically
   - For custom servers, configure gzip in your web server

### Performance Monitoring

1. **Google PageSpeed Insights**
   - Test your deployed site
   - Address any performance issues

2. **GTmetrix**
   - Monitor loading times
   - Optimize based on recommendations

## 🔒 Security Considerations

### HTTPS
- Most modern hosting platforms provide HTTPS by default
- For custom domains, ensure SSL certificates are properly configured

### Content Security Policy
Add to your HTML head:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
               font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
               img-src 'self' data: https:;">
```

## 📱 Mobile Optimization

### Testing
- Use browser dev tools to test mobile responsiveness
- Test on actual devices when possible
- Validate with Google's Mobile-Friendly Test

### Progressive Web App (Optional)
Add a web app manifest for better mobile experience:
```json
{
  "name": "Sai Vivek - AI Engineer Portfolio",
  "short_name": "AI Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6366f1"
}
```

## 🔄 Continuous Deployment

### GitHub Actions (Example)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: '.'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📈 Analytics Integration

### Google Analytics
Add to your HTML head:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Alternative Analytics
- **Plausible**: Privacy-focused analytics
- **Fathom**: Simple, privacy-friendly analytics
- **Mixpanel**: Event-based analytics

## 🆘 Troubleshooting

### Common Issues

1. **404 errors on refresh**
   - Configure your hosting platform for SPA routing
   - Add redirect rules for all routes to index.html

2. **Mixed content warnings**
   - Ensure all resources use HTTPS
   - Update any HTTP links to HTTPS

3. **Slow loading times**
   - Optimize images and assets
   - Enable compression
   - Use a CDN

4. **Demo not working**
   - Check Python version (3.8+ required)
   - Verify all dependencies are installed
   - Check firewall/port settings

### Getting Help

- Check hosting platform documentation
- Review browser console for errors
- Test locally before deploying
- Use online validators for HTML/CSS

## 📞 Support

For deployment issues or questions:
- **Email**: saivivek@example.com
- **GitHub Issues**: Create an issue in the repository
- **Documentation**: Check hosting platform docs

---

**Happy Deploying! 🚀**
