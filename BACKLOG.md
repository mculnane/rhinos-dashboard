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
**Status:** Investigation phase
**Priority:** Medium
**Purpose:** Display upcoming fixture information from Spond

**Research needed:**
- Does Spond have a public API?
- Authentication requirements?
- What data is available (fixtures, attendance, locations)?
- Integration complexity (client-side vs. server-side)?

**Potential features:**
- "Next Match" card at top of dashboard
- Upcoming fixtures section
- Player availability integration
- Match location/time display

**Questions to answer:**
1. Is there a Spond API or would this require web scraping?
2. Does Spond provide webhook/RSS feeds?
3. What authentication method does it use?
4. Can it be done client-side (like GitHub integration) or need a backend?

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
