# Rhinos Dashboard - Feature Backlog

## Active Roadmap

### Re-enable "The Story So Far" (After Match 8)
**Status:** Deferred
**Target:** When 8+ matches have been played
**Rationale:** With more data, there will be more interesting narrative patterns to highlight (comebacks, winning/losing streaks, standout performances, rivalries, etc.)

**Implementation Options:**
1. **Enhanced Template-Based** - Improve the current structured template with more sophisticated logic
2. **AI-Generated** (Client-side) - Use Claude Haiku API for creative narratives (~$0.001 per generation)
3. **Hybrid** - Template for facts + AI for narrative flourish

**What to highlight with more data:**
- Winning/losing streaks
- Best/worst performances
- Home vs Away record patterns
- Player form trends
- Head-to-head rivalries with specific opponents
- Comeback victories
- Clean sheet runs
- Goal-scoring droughts/purple patches

---

## Future Enhancements

### Spond Integration
**Status:** Researched - Implementation options identified
**Priority:** Medium
**Purpose:** Display upcoming fixture information from Spond

**Research Summary (Feb 2026):**

❌ **No Official API**
- Spond does not provide a public/official API
- No official developer documentation or support
- Calendar sync is one-way only (Spond → phone calendar, no iCal/RSS export)

✅ **Unofficial Community Solutions**
- **[Olen/Spond](https://github.com/Olen/Spond)** - Python library (most popular)
- **[martcl/spond](https://github.com/martcl/spond)** - Unofficial API docs
- **[Spond-classes](https://github.com/elliot-100/Spond-classes)** - Class abstraction layer
- All are reverse-engineered, unofficial, may break if Spond updates their internal API

**Available Data via Unofficial API:**
- ✅ Events (fixtures) with date/group filtering
- ✅ Event attendance and responses
- ✅ Group membership
- ✅ Event details (location, time, description)
- ✅ Messages/chat (not relevant for dashboard)
- ✅ Transactions (Spond Club payments - not relevant)

**Implementation Approaches:**

**Option 1: Python Backend Service** (Most Reliable)
- Use Olen/Spond library on a simple backend (AWS Lambda, Vercel, etc.)
- Fetch fixtures daily, cache as JSON
- Dashboard reads cached JSON (like current data.js approach)
- **Pros:** Reliable, secure credentials, can run on schedule
- **Cons:** Requires backend hosting, more complex setup

**Option 2: Manual iCal Export** (Simplest)
- Spond syncs to phone calendar
- Export iCal file from phone calendar manually
- Upload to GitHub repo
- Parse iCal in dashboard JavaScript
- **Pros:** No backend needed, simple, no API credentials
- **Cons:** Manual export step, outdated data if not refreshed

**Option 3: Browser Extension** (Complex)
- Build Chrome/Safari extension to extract data while user browses Spond
- Store in localStorage, sync to dashboard
- **Pros:** No backend, automated
- **Cons:** Very complex, requires extension installation, fragile

**Recommended Approach:**
Start with **Option 2 (Manual iCal)** for MVP, upgrade to **Option 1 (Python Backend)** if the manual process becomes burdensome.

**Potential Features:**
- "Next Match" card at top of dashboard
- Upcoming 3-5 fixtures section
- Match countdown timer
- Match location/time display
- Player availability display (if Spond responses tracked)

---

## Backlog Ideas (Not Prioritized)

### Data & Analytics
- **Match Photos** - Add photo field to matches, display in modals
- **Player Photos** - Headshots in leaderboard and modals
- **Clean Sheets Tracking** - New stat for defensive performance
- **Attendance Tracking** - Percentage, who's missing matches
- **Season Milestones** - Auto-detect achievements (10 goals, 5 wins, etc.)

### Sharing & Export
- **Download Stats as Image** - Share button to capture view as PNG for WhatsApp
- **Individual Player Reports** - Printable/shareable stat cards
- **End of Season Awards** - Golden Boot, Most Assists, etc.

### UX Enhancements
- **Match Notes/Highlights** - Optional text field per match ("Hat-trick by Fabian!")
- **Dark Mode** - Toggle for evening viewing
- **Print Stylesheet** - Clean printed version

### Advanced Features
- **Season Comparison** (Year 2+) - Compare vs. previous season
- **Head-to-Head Records** - Performance vs. specific opponents
- **Goal Celebrations** - Fun animations for big wins
- **Weather Icons** - Add weather context to matches
- **Video Highlights** - Link to YouTube/cloud videos per match

---

## Won't Do (For Now)

These were considered but decided against:
- ❌ **AI Story Generation (Early Season)** - Not enough data to make it interesting
- ❌ **Player Development Tracking** - Too complex for U8 level
- ❌ **Live Match Updates** - Not needed for this age group

---

## Completed Features

✅ Git repository setup
✅ GitHub Pages deployment
✅ Mobile-first responsive design
✅ Automated update form with GitHub API
✅ Interactive player/match modals
✅ Sortable leaderboard
✅ Match Day Magazine visual redesign
✅ Fixed "Last Updated" to show data date
✅ Mobile Safari compatibility fixes
