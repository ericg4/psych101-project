# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up Supabase:**
   - Go to [supabase.com](https://supabase.com) and create a new project
   - In the SQL Editor, run the contents of `supabase-schema.sql`
   - Go to Project Settings > API
   - Copy your Project URL and anon/public key

3. **Create `.env.local` file:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key-here
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup Details

The `supabase-schema.sql` file creates:
- 5 response tables (landing, gestalt, schema, trust, dopamine)
- Indexes for performance
- Row Level Security policies allowing anonymous inserts and selects

All tables are configured to allow anonymous users to insert and read data, which is perfect for this educational demo.

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in the root directory
- Verify the variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Restart your dev server after creating/updating `.env.local`

### Database connection errors
- Verify your Supabase project is active
- Check that you've run the SQL schema script
- Ensure RLS policies are created (they're included in the schema file)

### Type errors
- Run `pnpm install` to ensure all dependencies are installed
- Check that TypeScript can resolve the `@/` path alias (configured in `tsconfig.json`)
