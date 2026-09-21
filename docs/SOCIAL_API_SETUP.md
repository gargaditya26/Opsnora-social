# Live Instagram and LinkedIn setup

## Before you begin

Use an HTTPS public URL for OAuth testing (for example a deployed preview domain or a secure tunnel). Set `APP_URL` to it and restart Next.js. Never commit `.env.local` or share client secrets in chat.

Generate the OAuth encryption key once:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Put the result in `OAUTH_TOKEN_ENCRYPTION_KEY`. Create a Firebase service account under **Firebase Console → Project settings → Service accounts**, then add its project ID, client email and private key to the server-only Firebase Admin variables. Enable Firestore and deploy both rule files with `firebase deploy --only firestore,storage`.

## Instagram / Meta

1. Create a Meta developer app for your business at Meta for Developers.
2. Add the Facebook Login and Instagram Graph API products.
3. The Instagram account must be Business or Creator and linked to a Facebook Page. The connecting Facebook user needs adequate Page access.
4. In Facebook Login settings, register exactly:

   `https://YOUR_DOMAIN/api/oauth/meta/callback`

5. Add the domain, privacy-policy URL, terms URL and user-data-deletion URL required by Meta.
6. Add `META_APP_ID`, `META_APP_SECRET`, `META_REDIRECT_URI`, and the Graph version to `.env.local`.
7. Request Advanced Access/App Review for `pages_show_list`, `pages_read_engagement`, `instagram_basic`, and `instagram_content_publish`. Provide Meta with a screencast and reviewer instructions demonstrating account connection and publishing.
8. Complete Business Verification if Meta requires it for your requested access.

While the Meta app is in Development mode, only app admins/developers/testers and their eligible test assets can connect. Public customers require Live mode and approved permissions.

## LinkedIn

1. Create an application in the LinkedIn Developer Portal and associate/verify it with your company Page.
2. Add this exact authorized redirect URL under **Auth**:

   `https://YOUR_DOMAIN/api/oauth/linkedin/callback`

3. Add `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, and `LINKEDIN_REDIRECT_URI` to `.env.local`.
4. Request the **Sign In with LinkedIn using OpenID Connect** and **Share on LinkedIn** products for member identity and `w_member_social` posting.
5. For company Page publishing, request the relevant Community Management API access and `w_organization_social`. The authorizing member must have an eligible Page role such as Administrator or Content Admin.
6. Keep `LINKEDIN_SCOPES` limited to permissions actually approved for the app. Reconnect users whenever scopes change.

## Test

1. Restart with `Start-OPSNORA-Social.bat`.
2. Create or sign into a Firebase account.
3. Open **Connections** and click the platform button.
4. Approve the provider consent screen.
5. Confirm the callback returns to `/connections?connected=...` and the card shows the real account.
6. Inspect Firestore under `users/{firebaseUid}/social_connections`. Tokens should appear only as encrypted strings; client Firestore rules deny all direct access.

The connection flow is live-ready. Actual scheduled publishing still needs the provider-specific media publishing calls inside the background worker and a deployed server/queue; OAuth connection alone does not publish posts.
