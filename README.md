# Demo - Next.js 13 w/ Trackmania API

A "simple" demo app built using Next.js 13 w/ TypeScript fetching data from the Trackmania API.

Setup:

- Make initial request to get access and refresh tokens
- Store these tokens in Supabase database, along with expiration date
- Check server side if a new token needs to be requested
