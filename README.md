# Welcome to your Expo app 👋

This is a template for building full stack apps with expo, its intended to be built locally with expo prebuild + expo run:ios for faster local development.

The project uses expo router + server output with server routes that are deployed with eas deploy.

## Get started

1. Install dependencies

```bash
bun install
```

2. Start the app

```bash
bun run start
```

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Tech Stack

This project uses a modern React Native stack with the following key technologies:

### Core Technologies

- [Expo](https://docs.expo.dev/): A framework and platform for universal React applications, providing a set of tools and services for building native iOS, Android, and web apps.
- [Expo Router](https://docs.expo.dev/router/introduction/): A file-based router for React Native and web applications, enabling universal navigation patterns.

### UI Components and Styling

- [Gluestack UI](https://ui.gluestack.io/): A universal UI library for React Native, web, and Expo applications. It provides:

  - Pre-built accessible components
  - Customizable theming
  - Support for both mobile and web platforms
  - Components used in this project include:
    - Actionsheet
    - Alert & Alert Dialog
    - Avatar
    - Button
    - Form Controls
    - Modal
    - And more...

- [NativeWind](https://www.nativewind.dev/): Tailwind CSS for React Native, allowing you to use Tailwind classes in your mobile app.

### Database and ORM

- [Supabase](https://supabase.com/docs): Our database and authentication solution, providing:

### Development Tools

- [Bun](https://bun.sh/): A fast all-in-one JavaScript runtime and package manager
- [TypeScript](https://www.typescriptlang.org/): For type-safe JavaScript development
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/): For code quality and consistent formatting

For more detailed information about specific components, refer to:

- [Gluestack UI Components](https://gluestack.io/ui/docs/components/all-components)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/overview/)

## Available Scripts

All scripts should be run using `bun` as the package manager. Here are all the available scripts:

### Development Scripts

- `bun start`: Starts the Expo development client for local development
- `bun android`: Runs the app on Android with dark mode media query support
- `bun ios`: Runs the app on iOS with dark mode media query support
- `bun web`: Starts the web version of the app with dark mode media query support

### Testing and Code Quality

- `bun test`: Runs Jest tests in watch mode
- `bun lint`: Runs ESLint and Prettier checks (with caching and zero warnings allowed)
- `bun format`: Automatically formats code using Prettier and fixes ESLint issues
- `bun check`: Runs TypeScript type checking without emitting files
- `bun validate`: Runs format and lint checks
- `bun validate:strict`: Runs validate plus TypeScript type checking

### Utility Scripts

- `bun index-images`: Indexes images using the utility script
- `bun dump-modules`: Removes node_modules, android, ios, dist, and web-build directories
- `bun reboot-emulator`: Reboots the Android emulator
- `bun reset-simulator`: Resets iOS simulator, Xcode selection, and Watchman
- `bun expo-doctor`: Runs Expo Doctor to diagnose project issues
- `bun expo-fingerprint`: Generates a fingerprint of the project
- `bun regenerate-nativewind-styles`: Regenerates NativeWind styles from Tailwind CSS
- `bun fix-versions`: Updates and fixes Expo package versions

## Running Supabase Locally

This project uses Supabase for the database and authentication. Here's how to work with it locally:

### Prerequisites

- Make sure you have Docker installed and running
- Install the Supabase CLI if you haven't already: `brew install supabase/tap/supabase`

### Available Commands

- `bun db:start`: Starts the local Supabase instance (includes database, auth, and other services)
- `bun db:stop`: Stops the local Supabase instance
- `bun db:reset`: Resets the database to a clean state and runs migrations + seed data
- `bun db:migrate:local`: Runs any pending migrations on your local database
- `bun db:init`: Initializes a new Supabase project (only needed when setting up the project for the first time)

### Getting Started with Local Development

1. Start the local Supabase instance:

```bash
bun db:start
```

2. To get the latest migrations and seed data, run:

```bash
bun db:reset
```

3. Your local Supabase instance will be running with:

   - Studio Dashboard: http://localhost:54323
   - Database URL: postgresql://postgres:postgres@localhost:54322/postgres
   - Supabase API URL: http://localhost:54321
   - Supabase Anonymous Key: should print to the console

4. When you're done developing, stop the instance:

```bash
bun db:stop
```

### Database Changes

- All database changes should be made through migrations
- Migrations are stored in `supabase/migrations`
- To get the latest migrations, always use `bun db:reset` (recommended) rather than `db:migrate:local`
  - This ensures a clean state
  - Applies all migrations in order
  - Runs the seed file automatically
  - Prevents potential issues with migration state
- The seed file in `supabase/seed.sql` will automatically run after migrations when using `db:reset`

## Test Data

When running the local development environment, the database is seeded with test data for easy testing:

### Test Users

The database is seeded with 10 test users with the following credentials:

- Emails: `user1@example.com` through `user10@example.com`
- Password: `password` (same for all test users)

Each test user has:

- A confirmed email address
- An associated profile with name "User X Example" (where X is their number)
- Full authentication setup

To use a test account:

1. Start the local development environment with `bun db:start`
2. Sign in with any of the test emails (e.g., `user1@example.com`) and password `password`
3. You can also create new accounts using the sign-up form

Note: The test data is reset whenever you run `bun db:reset`.
