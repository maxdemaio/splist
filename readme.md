# splist

![splist og](./public/og-new-1.png)

## Developer Setup

1. Go to spotify's developer dashboard and create an app for the web API - [https://developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Make sure the redirect is just to `http://localhost:3000/api/auth/callback/spotify`
3. Take the `client_id` and `client_secret` from your app and put them in a `.env` file similar to [.env.template](./.env.template)
4. Start cooking 👩🏻‍🍳