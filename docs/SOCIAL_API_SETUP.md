# Live Instagram and LinkedIn setup

## Before you begin

Production OAuth uses `https://opsnora-social.vercel.app` as `APP_URL`. Never commit `.env.local`, service-account credentials, provider client secrets, or OAuth tokens.

Generate the OAuth encryption key once:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Put the result in `OAUTH_TOKEN_ENCRYPTION_KEY`. Create a Firebase service account under **Firebase Console → Project settings → Service accounts**, then add its project ID, client email, and private key to the server-only Firebase Admin variables. Firestore is required for connections; deploy its rules with `firebase deploy --only firestore:rules`. Firebase Storage is optional and is not required by either OAuth flow.

## Instagram / Meta

The current implementation uses Facebook Login and the Instagram Graph API for a professional Instagram account linked to a Facebook Page.

1. Create a Meta developer app for your business and add the **Facebook Login** and **Instagram Graph API** products.
2. The Instagram account must be Business or Creator, linked to a Facebook Page. The connecting Facebook user must have adequate Page access.
3. Under **Facebook Login → Settings**, enable Client OAuth Login and Web OAuth Login, require HTTPS, and add this exact Valid OAuth Redirect URI:

   `https://opsnora-social.vercel.app/api/oauth/meta/callback`

4. Set the app domain to `opsnora-social.vercel.app`. Configure valid HTTPS privacy-policy, terms-of-service, and user-data-deletion URLs before requesting Live mode or App Review.
5. Configure `META_REDIRECT_URI=https://opsnora-social.vercel.app/api/oauth/meta/callback`. Keep `META_APP_ID` and `META_APP_SECRET` server-only. The current implementation defaults to `META_GRAPH_VERSION=v23.0`.
6. Request these exact permissions through Advanced Access/App Review:

   `pages_show_list pages_read_engagement instagram_basic instagram_content_publish`

7. Provide Meta with reviewer instructions and a screencast showing account connection and the intended publishing flow. Complete Business Verification if Meta requires it.

While the Meta app is in Development mode, only app admins, developers, testers, and their eligible test assets can connect. Public customers require Live mode and approved permissions.

## LinkedIn

1. Create a LinkedIn application and associate/verify it with the relevant company Page.
2. Under **Auth**, add this exact OAuth 2.0 Authorized Redirect URL:

   `https://opsnora-social.vercel.app/api/oauth/linkedin/callback`

3. Configure `LINKEDIN_REDIRECT_URI=https://opsnora-social.vercel.app/api/oauth/linkedin/callback`. Keep `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET` server-only.
4. Request the **Sign In with LinkedIn using OpenID Connect** and **Share on LinkedIn** products.
5. The current member flow requests exactly:

   `openid profile email w_member_social`

6. For company Page publishing, separately request the applicable Community Management API access and `w_organization_social`. The authorizing member must hold an eligible Page role, such as Administrator or Content Admin. Do not add this scope to `LINKEDIN_SCOPES` until access is approved.
7. Reconnect users whenever approved scopes change.

## Test after developer-console setup

1. Sign in with a Firebase account.
2. Open **Connections** and choose the provider.
3. Approve the provider consent screen.
4. Confirm the callback returns to `/connections?connected=instagram` or `/connections?connected=linkedin` and displays the real account.
5. Inspect Firestore under `users/{firebaseUid}/social_connections`. Tokens must appear only as encrypted strings; client Firestore rules deny direct access to this subcollection.

The connection flow is ready for provider configuration. Actual scheduled publishing still requires provider-specific publishing adapters and a deployed background worker/queue; OAuth connection alone does not publish posts.
