# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment Instructions

### Frontend Deployment (Vercel)

1. **Sign up or log in to Vercel**
   - Go to [vercel.com](https://vercel.com) and create an account or log in if you already have one

2. **Create a New Project**
   - Click on "New Project" in your dashboard
   - Import your Git repository (GitHub, GitLab, or Bitbucket) or upload your code manually

3. **Configure Your Project**
   - Set the framework preset to "Vite"
   - Set the root directory to `frontend` (since your frontend code is in the frontend folder)
   - The build command should automatically be detected as `npm run build`
   - The output directory should be `dist`

4. **Environment Variables**
   - Add the `VITE_API_URL` environment variable with the URL of your deployed backend
   - For development, you can use `http://localhost:3001`
   - After deploying your backend, update this with the actual backend URL

5. **Deploy**
   - Click "Deploy" and wait for the deployment to complete

### Troubleshooting Common Issues

#### "Failed to load module script" Error

If you encounter the error "Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of 'text/html'", this is typically caused by routing issues:

1. **Check your Vite base configuration**: Make sure `vite.config.js` has `base: './'` set
2. **Verify asset paths**: Ensure all assets are referenced correctly with relative paths
3. **Check Vercel routing**: Your `vercel.json` should have proper routing configuration

#### Fix for Module Script Error

The issue is resolved by:
1. Setting `base: './'` in [vite.config.js](file:///Users/pranjalshukla/Desktop/Application-number/frontend/vite.config.js) (already done)
2. Using proper routing in [vercel.json](file:///Users/pranjalshukla/Desktop/Application-number/frontend/vercel.json)

### Backend Deployment

For backend deployment, you can use services like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

Make sure to update the `VITE_API_URL` environment variable in your frontend with the deployed backend URL.