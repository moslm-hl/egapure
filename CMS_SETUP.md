# EGAPURE Website - CMS Setup Guide

## GitHub API Integration for Content Management

This website uses GitHub API to save admin changes directly to the repository, triggering automatic Vercel redeploys.

### Setup Instructions

#### 1. Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "EGAPURE CMS"
4. Select scopes:
   - `repo` (Full control of private repositories)
5. Copy the token (save it securely!)

#### 2. Configure Vercel Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:

```
GITHUB_TOKEN=your_personal_access_token_here
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repository_name
```

#### 3. Deploy

Push your changes to GitHub. Vercel will automatically redeploy with the new environment variables.

#### 4. Test the CMS

1. Go to your deployed site
2. Navigate to `/admin/login`
3. Make changes and save
4. The changes will be committed to GitHub and Vercel will redeploy
5. All visitors will see the updates

### How it Works

- Admin saves changes → GitHub API commits to `data/content.json`
- Vercel detects the commit → Automatic redeploy
- Updated content is served to all visitors

### Security Notes

- The GitHub token has `repo` scope, so it can modify your repository
- Keep the token secure and never commit it to the repository
- Only trusted admins should have access to the admin panel

### Troubleshooting

- **"Failed to save changes"**: Check that environment variables are set correctly in Vercel
- **No auto-redeploy**: Ensure Vercel is connected to your GitHub repository
- **Permission errors**: Verify the GitHub token has the correct scopes

### Development

For local development, the system falls back to localStorage. The GitHub API integration only works in production on Vercel.