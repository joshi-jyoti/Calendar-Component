# Calendar Component

A React + TypeScript calendar UI that mimics a physical hanging wall calendar with a visual spiral binding and page-turn month transitions.

## Why This Approach

- React + TypeScript: predictable component state and safer refactors while iterating on interactive UI.
- Vite: fast local startup and rebuilds during animation and style tuning.
- Tailwind CSS: quick layout and visual iteration for responsive behavior across mobile and desktop.
- Component-driven structure: calendar logic (`CalendarGrid`, themes, holidays) is separated from presentation (`WallCalendar`) to keep changes manageable.

## Main Features

- Month navigation with animated forward/backward page flip
- Spiral-bound wall-calendar visual treatment
- Month-themed hero header and month/year badge
- Date-range selection in the calendar grid
- Notes section for month/range context
- Responsive layout for small and large screens

## Run Locally

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The app runs at:

```text
http://localhost:8080
```

### Useful Commands

```bash
npm run build      # Production build
npm run preview    # Preview built app
npm run lint       # Lint the codebase
npm run test       # Run tests once
```

