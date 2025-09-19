# 🚀 Vercel Deployment Guide

> **Professional Deployment for Leaf Confidential Trade**

## 📋 Prerequisites

- GitHub account with repository access
- Vercel account (free tier available)
- Node.js 18+ (for local testing)

## 🛠️ Step-by-Step Deployment

### 1. Repository Preparation

The repository is pre-configured and ready for deployment:
- ✅ Package.json with correct dependencies
- ✅ Environment variables template
- ✅ Build scripts configured
- ✅ No external dependencies

### 2. Vercel Connection

1. **Access Vercel Dashboard**
   - Navigate to [vercel.com](https://vercel.com)
   - Sign in with GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select "Import Git Repository"
   - Choose `P2p4Labs/leaf-confidential-trade`
   - Click "Import"

### 3. Project Configuration

#### Framework Settings
- **Framework**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Configure the following variables in Vercel dashboard:

```env
# Network Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Optional Configuration
VITE_INFURA_API_KEY=YOUR_INFURA_KEY
```

#### Build Settings
- **Node.js Version**: `18.x`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 4. Deployment Process

1. **Initial Deployment**
   - Click "Deploy" button
   - Monitor build process (2-3 minutes)
   - Note the deployment URL

2. **Verification**
   - Visit the deployment URL
   - Test wallet connection
   - Verify all components load

### 5. Custom Domain (Optional)

1. **Domain Configuration**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your custom domain
   - Follow DNS setup instructions

2. **SSL Certificate**
   - Automatic SSL provided by Vercel
   - HTTPS enabled by default

### 6. Environment Management

#### Development Environment
```bash
# Local development
npm run dev
```

#### Production Environment
- Environment variables configured in Vercel
- Automatic builds on git push
- Branch-based deployments

### 7. Monitoring & Maintenance

#### Deployment Monitoring
- Check Vercel dashboard for status
- Monitor build logs for errors
- Set up deployment notifications

#### Performance Monitoring
- Use Vercel Analytics (optional)
- Monitor Core Web Vitals
- Check runtime errors

### 8. Troubleshooting

#### Common Issues

**Build Failures**
- Verify environment variables
- Check all dependencies in package.json
- Review build logs in Vercel dashboard

**Wallet Connection Issues**
- Confirm WalletConnect Project ID
- Verify RPC URL configuration
- Check network settings

**Environment Variables**
- Ensure all VITE_ variables are set
- Check for typos in variable names
- Verify production values

### 9. Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Wallet connection functional
- [ ] UI components render correctly
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Custom domain working (if used)
- [ ] Performance acceptable

### 10. Continuous Deployment

**Automatic Deployment**
- Push to `main` branch triggers deployment
- Environment variables preserved
- Optimized build process

**Manual Deployment**
- Available through Vercel dashboard
- Branch-specific deployments
- Preview deployments for testing

## 🔧 Advanced Configuration

### Build Optimization
- Vite build optimizations enabled
- Tree shaking for smaller bundles
- Code splitting for better performance

### Security Configuration
- Environment variables encrypted
- No sensitive data in client code
- HTTPS enforcement

## 📞 Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Verify environment variables
4. Test locally with `npm run build`

## 🔐 Security Notes

- Environment variables encrypted in Vercel
- No sensitive data exposed client-side
- API keys properly configured
- HTTPS enforced by default

---

**Deployment Status**: ✅ Ready for Production  
**Last Updated**: September 2024  
**Maintainer**: P2p4Labs