# The Psychology of Website Design

An interactive educational website exploring how principles from cognitive psychology, perception, learning, and social influence shape website design.

## Features

- **5 Interactive Demos**: Each demonstrating a different psychological concept
- **A/B Testing**: Compare clean vs cluttered layouts
- **Data Persistence**: All responses saved to Supabase database
- **Aggregated Results**: View statistics and visualizations from all users
- **Educational Content**: Learn about cognitive psychology, Gestalt principles, schemas, trust, and dopamine

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL script from `supabase-schema.sql` to create all necessary tables
4. Go to Project Settings > API
5. Copy your Project URL and anon/public key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  page.tsx              # Landing page with A/B test
  demo1/page.tsx        # Gestalt Principles demo
  demo2/page.tsx        # Schema & Recognition demo
  demo3/page.tsx        # Faces & Trust demo
  demo4/page.tsx        # Dopamine & Scarcity demo
  final/page.tsx        # Summary page with aggregated results
  actions/
    supabase.ts         # Server actions for saving data
lib/
  supabase.ts           # Supabase client configuration
  session.ts            # Session ID management
  analytics.ts          # Data fetching utilities
components/             # React components for demos
```

## Database Schema

The application uses 5 main tables:
- `landing_responses` - Stress ratings and layout preferences
- `gestalt_responses` - Button finding times
- `schema_responses` - Layout familiarity and trust ratings
- `trust_responses` - Testimonial choices and social proof impact
- `dopamine_responses` - Feed engagement and scarcity interactions

See `supabase-schema.sql` for the complete schema.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database and backend
- **Recharts** - Data visualization

## License

This project is for educational purposes.
