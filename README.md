# HireED MVP - OU Student Gig Platform

HireED is a platform designed to connect OU students for various tasks and gigs. Students can post tasks they need help with and find other students to collaborate with.

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