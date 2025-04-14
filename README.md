# HireED MVP - OU Student Gig Platform

HireED is a platform designed to connect OU students for various tasks and gigs. Students can post tasks they need help with and find other students to collaborate with.

## Branch Management

⚠️ **Important for Cursor Users and Contributors**:

1. Initial Setup:
```bash
# Clone the repository
git clone [repository-url]
cd hiredmvp

# Set up the dev branch
git fetch origin
git checkout -b dev origin/dev
```

2. For new features, always create a branch from `dev`:
```bash
# Make sure you're on dev and it's up to date
git checkout dev
git pull origin dev

# Create your feature branch
git checkout -b feature/your-feature-name
```

3. Branch naming conventions:
   - Features: `feature/description` (e.g., `feature/user-authentication`)
   - Bugfixes: `fix/description` (e.g., `fix/login-error`)
   - Hotfixes: `hotfix/description` (e.g., `hotfix/security-patch`)
   - Documentation: `docs/description` (e.g., `docs/api-documentation`)

4. Keeping branches up to date:
```bash
# Update your dev branch
git checkout dev
git pull origin dev

# Update your feature branch
git checkout your-branch
git merge dev
```

5. Before pushing changes:
```bash
# Make sure your branch is up to date
git pull origin dev

# Push your changes
git push origin your-branch
```

6. Creating Pull Requests:
   - Create PRs from your feature branch to `dev`
   - Ensure all tests pass
   - Request reviews from team members
   - Keep PRs focused and small

## Using Cursor with this Repository

When using Cursor to work on this repository:

1. **Before Starting Work**:
   - Make sure you're on the `dev` branch
   - Create a new feature branch for your work:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

2. **Important Notes**:
   - Cursor will NOT automatically create branches for you
   - Always create a new branch before making changes
   - Never commit directly to `dev` or `main`
   - Use the terminal in Cursor to manage your branches

3. **Best Practices**:
   - Keep Cursor's AI features enabled for code assistance
   - Use Cursor's built-in terminal for git commands
   - Commit your changes frequently with descriptive messages

## Features

- Post tasks and gigs
- Browse available gigs with filtering options
- Student profiles with skills and completed tasks
- Clean, modern UI with OU's brand colors

## Tech Stack

- Next.js 14
- TypeScript
- TailwindCSS
- React

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd hiredmvp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
hiredmvp/
├── src/                 # Next.js app directory
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx        # Home page
│   │   ├── post/           # Post task page
│   │   ├── gigs/           # Find gigs page
│   │   ├── profile/        # Profile page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskForm.tsx
│   └── data/              # Mock data and types
│       └── mockData.ts
```

## Development

- The project uses TypeScript for type safety
- TailwindCSS for styling
- Mock data is used for the MVP phase
- Components are built with reusability in mind

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 