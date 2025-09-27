# Auth0 Setup Guide for Universal Knowledge Chatbot

This guide will help you set up Auth0 with Google Social Connection and configure domain restrictions for your Universal Knowledge Chatbot.

## 🚀 Step 1: Create Auth0 Account

1. Go to [Auth0.com](https://auth0.com) and sign up for a free account
2. Choose a tenant name (e.g., `your-company-chatbot`)
3. Select your region (closest to your users)
4. Complete the initial setup

## 🔧 Step 2: Create Auth0 Application

1. **Navigate to Applications** in your Auth0 Dashboard
2. **Click "Create Application"**
3. **Application Settings:**
   - **Name:** Universal Knowledge Chatbot
   - **Type:** Single Page Application (SPA)
   - **Technology:** React
4. **Click "Create"**

## ⚙️ Step 3: Configure Application Settings

In your newly created application:

### Basic Settings

1. **Application URIs:**
   - **Allowed Callback URLs:**
     ```
     http://localhost:3000/auth/callback,
     https://yourdomain.com/auth/callback
     ```
   - **Allowed Logout URLs:**
     ```
     http://localhost:3000,
     https://yourdomain.com
     ```
   - **Allowed Web Origins:**
     ```
     http://localhost:3000,
     https://yourdomain.com
     ```
   - **Allowed Origins (CORS):**
     ```
     http://localhost:3000,
     https://yourdomain.com
     ```

2. **Advanced Settings > Grant Types:**
   - ✅ Authorization Code
   - ✅ Refresh Token
   - ✅ Implicit (for development only)

3. **Save Changes**

### Note Your Credentials

Copy these values for your environment configuration:

- **Domain:** `your-tenant.auth0.com`
- **Client ID:** `your-client-id-here`

## 🔗 Step 4: Enable Google Social Connection

1. **Navigate to Authentication > Social** in Auth0 Dashboard
2. **Click "Create Connection"**
3. **Select "Google"**

### Google Setup:

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select existing one
3. **Enable Google+ API:**
   - Navigate to "APIs & Services > Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services > Credentials"
   - Click "Create Credentials > OAuth 2.0 Client IDs"
   - Application type: Web application
   - Name: Universal Knowledge Chatbot
   - **Authorized redirect URIs:**
     ```
     https://your-tenant.auth0.com/login/callback
     ```
   - Copy the **Client ID** and **Client Secret**

5. **Back in Auth0:**
   - Enter Google **Client ID** and **Client Secret**
   - **Allowed Applications:** Select your chatbot application
   - **Attributes:** Keep default (email, email_verified, name, picture)
   - **Save**

## 🛡️ Step 5: Configure Domain Restrictions (Optional)

Auth0 provides multiple ways to restrict access:

### Method 1: Using Rules (Recommended)

1. **Navigate to Auth > Rules** in Auth0 Dashboard
2. **Create Rule** > **Empty Rule**
3. **Name:** Domain Restriction Rule
4. **Script:**

```javascript
function domainRestriction(user, context, callback) {
  // Configure your allowed domains
  const allowedDomains = ['yourcompany.com', 'partner.org'];
  const allowGmail = true; // Set to false to block Gmail

  const userEmail = user.email;
  const domain = userEmail.split('@')[1];

  // Check if domain is allowed
  if (allowGmail && domain === 'gmail.com') {
    return callback(null, user, context);
  }

  if (allowedDomains.length === 0 || allowedDomains.includes(domain)) {
    return callback(null, user, context);
  }

  return callback(new UnauthorizedError('Access denied for domain: ' + domain));
}
```

### Method 2: Use Application Configuration (Simpler)

Use the environment variables in your React app for client-side validation (less secure but easier).

## 🔐 Step 6: Configure Environment Variables

Create/update your `.env.local` file:

```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id

# Redirect URIs
VITE_OIDC_REDIRECT_URI=http://localhost:3000/auth/callback
VITE_OIDC_POST_LOGOUT_URI=http://localhost:3000

# Domain Restrictions (Optional - for client-side validation)
VITE_DOMAIN_RESTRICTIONS_ENABLED=true
VITE_ALLOWED_DOMAINS=yourcompany.com,partner.org
VITE_ALLOW_ALL_GMAIL=true
VITE_DOMAIN_BLOCK_MESSAGE=Access restricted to authorized company domains only.
```

## 🧪 Step 7: Test Your Setup

1. **Start your development server:**

   ```bash
   npm run dev
   ```

2. **Navigate to:** `http://localhost:3000`

3. **Test Login Flow:**
   - Click "Sign In with SSO"
   - Should redirect to Auth0
   - Select "Continue with Google"
   - Complete Google authentication
   - Should redirect back to your app

4. **Test Domain Restrictions** (if enabled):
   - Try logging in with allowed domain ✅
   - Try logging in with blocked domain ❌

## 🚀 Step 8: Production Deployment

### Update Auth0 Settings:

1. **Add production URLs** to Application URIs
2. **Update Google OAuth** with production redirect URI
3. **Test in production environment**

### Environment Variables for Production:

```env
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_OIDC_REDIRECT_URI=https://yourdomain.com/auth/callback
VITE_OIDC_POST_LOGOUT_URI=https://yourdomain.com
# ... other domain restriction settings
```

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid Callback URL"**
   - Check Allowed Callback URLs in Auth0 Application settings
   - Ensure URLs match exactly (including protocol and port)

2. **"Access Denied" after Google login**
   - Check Google OAuth redirect URI matches Auth0 callback
   - Verify Google+ API is enabled

3. **Domain restriction not working**
   - Check Auth0 Rules are enabled and saved
   - Verify environment variables are loaded correctly

4. **Login button doesn't work**
   - Check browser console for errors
   - Verify Auth0 domain and client ID are correct

### Debug Mode:

Enable debug logging by adding to your environment:

```env
VITE_AUTH0_DEBUG=true
```

## 📞 Support

- **Auth0 Documentation:** [https://auth0.com/docs](https://auth0.com/docs)
- **Google OAuth Setup:** [https://developers.google.com/identity/protocols/oauth2](https://developers.google.com/identity/protocols/oauth2)
- **Auth0 Community:** [https://community.auth0.com](https://community.auth0.com)

## 🎯 Example Configurations

### 1. Company Only Access:

```env
VITE_DOMAIN_RESTRICTIONS_ENABLED=true
VITE_ALLOWED_DOMAINS=yourcompany.com
VITE_ALLOW_ALL_GMAIL=false
```

### 2. Company + Gmail Access:

```env
VITE_DOMAIN_RESTRICTIONS_ENABLED=true
VITE_ALLOWED_DOMAINS=yourcompany.com
VITE_ALLOW_ALL_GMAIL=true
```

### 3. Open Access (No Restrictions):

```env
VITE_DOMAIN_RESTRICTIONS_ENABLED=false
```

### 4. Block Only Gmail:

```env
VITE_DOMAIN_RESTRICTIONS_ENABLED=true
VITE_ALLOWED_DOMAINS=
VITE_ALLOW_ALL_GMAIL=false
```

---

Your Universal Knowledge Chatbot is now ready with Auth0 + Google SSO and configurable domain restrictions! 🎉
