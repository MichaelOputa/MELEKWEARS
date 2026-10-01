# Owner product admin setup

Product administration requires a Supabase project. The admin UI uses the public anon key; database row-level security and Storage policies enforce owner permissions. Never put a service-role key in the website.

1. In the Supabase SQL editor, run `migrations/20261001090000_create_owner_catalog.sql`.
2. In Supabase Authentication, create the owner's user with email and password. Do not enable public sign-ups for the site.
3. In the SQL editor, find that account's UUID and authorize only it:

   ```sql
   select id, email from auth.users where email = 'owner@example.com';
   insert into public.store_admins (user_id) values ('OWNER-USER-UUID');
   ```

4. Copy `.env.example` to `.env.local`, then set `VITE_SUPABASE_ANON_KEY` from the Supabase project's API settings; the example already contains the project URL. Restart the Vite server. Set both variables in the production hosting environment, then redeploy.
5. Open `/admin` and sign in with the owner's Supabase account. Other authenticated accounts are denied by both the UI check and database policies.

The female collection ships with editable starter product prices. Confirm the prices and descriptions in `/admin` before publishing them as final values.
