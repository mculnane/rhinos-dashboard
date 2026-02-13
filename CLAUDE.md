# Aspley Guise U8 Rhinos Dashboard - Project Context

## Project Overview

Mobile-optimized season tracker for the Aspley Guise U8 Rhinos football team. Built for sharing via WhatsApp on phones with portrait orientation.

**Live Dashboard**: https://YOUR-USERNAME.github.io/rhinos-dashboard/
**Update Form**: https://YOUR-USERNAME.github.io/rhinos-dashboard/update-form.html

## Why This Exists

95% of team communication happens on WhatsApp via phones. Started as an Excel prototype but pivoted to mobile-first HTML dashboard optimized for portrait orientation and touch interfaces.

## File Structure

```
.
├── index.html          # Main dashboard - interactive stats, charts, match history
├── data.js             # All match and player data (THIS IS UPDATED MOST OFTEN)
├── app.js              # Dashboard logic - charts, modals, sorting, interactivity
├── update-form.html    # Automated match entry form with GitHub API integration
├── README.md           # Complete setup and usage guide for users
├── CLAUDE.md           # This file - project context for Claude
└── archive/            # Excel prototype and development files (not deployed)
```

## Key Technical Details

### Hosting
- **Platform**: GitHub Pages (free static hosting)
- **Repository**: Public (required for free Pages)
- **Deploy**: Automatic - push to main branch, live in 30-60 seconds
- **Privacy**: Public but not searchable - only accessible via direct link

### Tech Stack
- Pure HTML/CSS/JavaScript (no build process)
- Chart.js for visualizations
- Responsive mobile-first design
- localStorage for update form configuration
- GitHub API for automated data updates

### Branding
- **Primary Color**: Aspley Guise FC Red `#dc3545`
- **Success Green**: `#28a745`
- **Warning Amber**: `#ffc107`
- **Design**: Mobile-optimized, touch-friendly, portrait layout

## Data Structure

### Players Array (data.js)
```javascript
players: [
    { name: "Fabian", appearances: 4 },
    { name: "Lake", appearances: 4 },
    // ... 8 players total
]
```

### Matches Array (data.js)
```javascript
matches: [
    {
        id: "M01",
        date: "2026-01-17",           // YYYY-MM-DD
        opponent: "Team Name",
        homeAway: "Home",              // or "Away"
        teamGoals: 9,
        opponentGoals: 3,
        result: "W",                   // W, D, or L
        competition: "League",         // League, Friendly, or Cup
        potm: "Player Name",
        squad: ["Fabian", "Lake", ...]  // Players who appeared
    }
]
```

### Goals Array (data.js)
```javascript
goals: [
    { matchId: "M01", scorer: "Fabian", assister: null },
    { matchId: "M01", scorer: "Lake", assister: "Fabian" },
    // One entry per goal
]
```

## Dashboard Features

### Interactive Elements
- **Tap player name** → Modal with match-by-match performance
- **Tap match row** → Modal with goals, squad, POTM details
- **Tap column headers** → Sort table (Apps, Goals, Assists, POTM)
- **Form indicator** → Last 5 results (W/D/L boxes)

### Calculated Stats
- Season summary cards (matches, wins, goals, win rate)
- Match results pie chart
- Goals by player bar chart
- Season leaders table with gold/silver/bronze ranks
- "Story So Far" narrative auto-generated from data
- Full match history with competition badges

### Mobile Optimizations
- 2x2 stat card grid on all screen sizes
- Portrait-friendly tables
- Touch-friendly tap targets
- Smooth modal animations (slide up from bottom)
- Works offline after first visit

## Common Workflows

### Adding Match Data

**Method 1: Automated Form (Mobile-Friendly)**
1. Visit update-form.html on phone
2. Fill in match details (date, opponent, score, squad, goals)
3. Tap "Submit Update to GitHub"
4. Dashboard updates automatically in 30 seconds

**Method 2: Direct Edit (data.js)**
1. Open data.js
2. Add match object to matches array
3. Add goal objects to goals array
4. Commit and push
5. Live in 30-60 seconds

### Making Design Changes

**Typical Changes:**
- Colors/branding: Edit CSS in `<style>` section of index.html
- Layout/structure: Edit HTML in index.html
- Interactivity/logic: Edit app.js
- Data format: Edit data.js structure + app.js parsing

**Process:**
1. Edit the file
2. Test locally (optional: run local server)
3. Commit and push
4. Verify on live site

### GitHub Pages Deployment

- **Branch**: main
- **Source**: / (root)
- **Build time**: 30-60 seconds after push
- **Cache**: May need hard refresh on first view after update

## Update Form Technical Details

### GitHub API Integration
- Uses Personal Access Token for authentication
- Token stored in browser localStorage (per device)
- Permissions needed: Contents (Read and write)
- Fetches current data.js, modifies it, commits back

### Export/Import Feature
- Export: Copies base64-encoded config to clipboard
- Import: Paste config on new device
- Transfers: username, repo name, token
- Use case: Set up on laptop, import to phone

## Important Notes

### Squad Tracking
- Each match MUST have a squad array
- Squad determines which players appear in match modals
- Used to calculate accurate appearances
- Example: Leo has 2 appearances, only shows in M02 and M03

### Player Statistics Order
Display order: **Apps, Goals, Assists, POTM**
- Appearances first (participation)
- Performance metrics (goals, assists)
- Recognition last (POTM)

### Competition Types
- **League**: Red badge
- **Friendly**: Teal badge
- **Cup**: Grey badge (not yet used)

### Git Workflow
- Always pull before making changes
- Test locally when possible
- Commit messages should be descriptive
- Push immediately after committing (auto-deploys)

## Project History

### Evolution
1. **Excel Prototype** (archived) - Desktop-focused, formulas-based
2. **Mobile Dashboard** (current) - HTML/JS, WhatsApp-friendly
3. **Automated Updates** (current) - GitHub API integration

### Key Decisions
- **Why GitHub Pages?** Free, reliable, easy deployment
- **Why pure HTML/JS?** No build process, simple to maintain
- **Why localStorage for tokens?** Secure, no backend needed
- **Why modal overlays?** Mobile-friendly drill-down without navigation complexity

## Maintenance

### Season Updates
- Update data.js after each match (usually weekly)
- Occasional design tweaks (monthly)
- Token renewal (annually)

### Adding Players Mid-Season
1. Add to players array in data.js
2. Add checkbox to update-form.html squad section
3. Update appearances as they play

### Troubleshooting
- **Dashboard not updating?** Check GitHub commit history, wait 60s, hard refresh
- **Form not submitting?** Check token permissions, verify repo name
- **Modal not showing?** Check squad array exists, player names match exactly
- **Stats incorrect?** Verify data.js format, check for typos in player names

## User Context

**User**: Matthew (parent, tech-savvy but not a developer)
**Team**: Aspley Guise U8 Rhinos (8 players, ~4 matches played)
**Communication**: WhatsApp group (95% mobile)
**Update Frequency**: After each match (~weekly)
**Audience**: Parents, coaches viewing on phones

## Future Enhancements (Potential)

- End-of-season awards page
- Player photo integration
- Match photos/videos
- Calendar integration
- Export stats as PDF
- Historical season comparison (next year)
