# Vercel Deployment Guide for Leaf Confidential Trade

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment Instructions

### 1. Prepare the Repository

The repository is already configured and ready for deployment. All necessary files are in place:
- ✅ Package.json with correct dependencies
- ✅ Environment variables configured
- ✅ Build scripts ready
- ✅ No lovable dependencies

### 2. Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Import Project"
   - Select "Import Git Repository"
   - Choose `P2p4Labs/leaf-confidential-trade` from the list
   - Click "Import"

### 3. Configure Project Settings

1. **Framework Preset**
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Environment Variables**
   Add the following environment variables in Vercel dashboard:
   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   ```

3. **Build Settings**
   - Node.js Version: `18.x`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 4. Deploy the Project

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for the build process to complete (2-3 minutes)
   - Note the deployment URL provided

2. **Verify Deployment**
   - Visit the provided URL
   - Test wallet connection functionality
   - Verify all components load correctly

### 5. Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS will be enabled by default

### 6. Environment-Specific Configurations

#### Development Environment
```bash
# Local development
npm run dev
```

#### Production Environment
- All environment variables are configured in Vercel dashboard
- Build process is automated on git push
- Automatic deployments on main branch updates

### 7. Monitoring and Maintenance

1. **Deployment Monitoring**
   - Check Vercel dashboard for deployment status
   - Monitor build logs for any errors
   - Set up notifications for failed deployments

2. **Performance Monitoring**
   - Use Vercel Analytics (optional)
   - Monitor Core Web Vitals
   - Check for any runtime errors

### 8. Troubleshooting

#### Common Issues:

1. **Build Failures**
   - Check environment variables are set correctly
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL configuration
   - Ensure network settings match Sepolia testnet

3. **Environment Variables**
   - Double-check all VITE_ prefixed variables are set
   - Ensure no typos in variable names
   - Verify values are correct for production

### 9. Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Wallet connection works (Rainbow, MetaMask, etc.)
- [ ] All UI components render correctly
- [ ] Environment variables are properly configured
- [ ] HTTPS is enabled
- [ ] Custom domain (if used) is working
- [ ] Performance is acceptable

### 10. Continuous Deployment

The project is configured for automatic deployments:
- Push to `main` branch triggers automatic deployment
- All environment variables are preserved
- Build process is optimized for production

## Support

For issues with deployment:
1. Check Vercel documentation
2. Review build logs in Vercel dashboard
3. Verify all environment variables are set
4. Test locally with `npm run build` and `npm run preview`

## Security Notes

- Environment variables are encrypted in Vercel
- No sensitive data is exposed in client-side code
- All API keys are properly configured
- HTTPS is enforced by default

---

**Deployment URL**: Will be provided after successful deployment
**Last Updated**: September 2024
**Maintainer**: P2p4Labs
