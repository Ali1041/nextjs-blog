# Admin Setup Instructions

This guide explains how to set up and use the admin authentication system for your Next.js blog/case studies website.

## Overview

The admin system provides secure access to content creation and editing features. Only authenticated admin users can see and use:

- "Create Blog Post" buttons
- "Create Case Study" buttons
- Blog post edit functionality
- Case study edit functionality
- Direct access to creation pages

Regular visitors can view all content but cannot see admin controls.

## Initial Setup

### 1. Configure Environment Variables

Update the `.env.local` file with your admin credentials:

```env
# Admin authentication settings
ADMIN_EMAIL=your-admin-email@yourcompany.com
JWT_SECRET=your-super-secret-jwt-key-change-in-production-minimum-32-chars
```

### 2. Set Admin Password

Generate a bcrypt hash for your admin password:

```bash
# Install bcryptjs globally (if not already installed)
npm install -g bcryptjs

# Generate hash (replace 'your-password-here' with your actual password)
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password-here', 10, (err, hash) => console.log(hash));"
```

Update the `.env.local` file with the generated hash:

```env
ADMIN_PASSWORD_HASH=$2a$10$your.generated.hash.here
```

## How to Use

### 1. Admin Login

- Visit your website and look for "Admin Login" in the top navigation
- Click it to access `/admin/login`
- Enter your email and password
- After successful login, you'll see "Admin" status in the navbar with a logout button

### 2. Creating Content

Once logged in, you'll see additional buttons:

- **Blog Listing Page** (`/blog`): "Create Blog Post" button
- **Case Studies Listing Page** (`/case-studies`): "Create Case Study" button

### 3. Edit Existing Content

- On individual blog posts and case studies, you'll see "Edit" buttons
- These lead to protected edit pages where you can modify existing content

### 4. Direct Access

You can also directly access admin pages:

- `/blog/new` - Create new blog post
- `/case-studies/new` - Create new case study
- `/admin/login` - Admin login page

**Note**: If you try to access these URLs without being logged in, you'll be redirected to the login page.

### 5. Logout

Click the "Logout" button in the navbar to sign out. This clears your session and returns you to the regular user experience.

## Security Features

### Authentication
- **JWT Tokens**: Stored securely in HTTP-only cookies
- **Automatic Expiry**: Tokens expire after 24 hours
- **Secure Cookies**: Protected against XSS attacks

### Route Protection
- **Middleware**: Automatically redirects unauthenticated users from admin routes
- **Client-Side Checks**: Navbar shows/hides admin controls based on authentication status
- **Server-Side Prevention**: API routes protected by token verification

### Password Security
- **Bcrypt Hashing**: Admin passwords are securely hashed
- **Salt Rounds**: 10 rounds for strong protection
- **Environment Sealed**: No sensitive data in source code

## Development vs Production

### Development
- Uses `{ sameSite: "strict", secure: false }` for local development
- Allows cookie transmission over HTTP

### Production
- Uses `{ sameSite: "strict", secure: true }` for HTTPS
- Cookies only transmitted over secure connections

## Troubleshooting

### Can't Access Admin Pages
- Check that you're logged in (look for "Admin" in navbar)
- Clear cookies and try logging in again
- Check that `.env.local` values are set correctly

### Login Fails
- Verify email and password match `.env.local` values
- Generate a new password hash if needed
- Check browser console for errors

### Admin Controls Don't Show
- Try refreshing the page after login
- Check the network tab for `/api/auth/check` errors
- Ensure you're not in incognito/private browsing (may not persist cookies)

## API Endpoints

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

## Next Steps

1. Customize admin email and password in `.env.local`
2. Test the login/logout functionality
3. Start creating blog posts and case studies!
4. Consider adding user role management if you need multiple admins

## Support

If you encounter issues:

1. Check the browser console for JavaScript errors
2. Verify environment variables are loaded correctly
3. Ensure all required packages are installed (`bcryptjs`, `jsonwebtoken`)
4. Check that Next.js middleware is properly configured

The authentication system uses industry-standard practices to keep your admin area secure while maintaining a smooth user experience.
