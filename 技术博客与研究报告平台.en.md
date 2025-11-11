# JSON Processing Library Comparison Platform

This is a frontend project for an in-depth comparative analysis report on JSON
processing libraries, built with Vite. It primarily compares the performance,
features, and use cases of the stream-json and large-json-reader-writer
libraries.

## Project Features

- Single-page application (SPA) built with Vite
- Modern responsive interface based on Tailwind CSS
- Includes interactive charts and detailed comparative data
- Provides navigation management functionality, supporting adding, editing, and
  deleting navigation items
- Uses axios for API interactions
- Loads Chart.js and Font Awesome via CDN

## Technology Stack

- Build tool: Vite 7.x
- CSS framework: Tailwind CSS 4.x
- HTTP client: axios
- Chart library: Chart.js (loaded via CDN)
- Icons: Font Awesome (loaded via CDN)

## Installation and Execution

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build production version
pnpm build

# Preview build output
pnpm preview
```

## Project Structure

- **index.html** - Main page containing the full report and interactive charts
- **src/main.js** - Core JavaScript logic, including navigation management and
  API interactions
- **src/style.css** - Global styles
- **src/counter.js** - Counter component
- **public/** - Static assets directory

## Development Server Configuration

The development server is configured with API proxies in `vite.config.js`:

- `/api` → `http://localhost:5000`
- `/static` → `http://localhost:5000`

## Notes

1. The project uses a Chinese interface; all text content should remain in
   Chinese.
2. The project is primarily a presentation-style report page, containing
   extensive pre-defined comparative data and charts.
3. Although the code includes API calls related to navigation management, the
   main content is embedded directly within the HTML.
4. Multiple CDN resources are used to load the chart and icon libraries.
