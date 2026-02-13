# Aspley Guise U8 Rhinos - Mobile Dashboard

A mobile-optimized season tracker for the Aspley Guise U8 Rhinos, perfect for sharing on WhatsApp!

## 🚀 Complete Setup Guide

### Step 1: Create a GitHub Account (if needed)

1. Go to [github.com](https://github.com)
2. Click **Sign up** (top right)
3. Follow the signup process (email, password, username)
4. Verify your email address

### Step 2: Create Your Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon in the top-right corner
3. Click **New repository**
4. Fill in the details:
   - **Repository name**: `rhinos-dashboard` (or any name you prefer)
   - **Description** (optional): "Aspley Guise U8 Rhinos Season Tracker"
   - **Public** ✅ (must be public for free GitHub Pages)
   - **Do NOT** check "Add a README file"
5. Click **Create repository**

You'll see a page with setup instructions - ignore these, we'll upload files directly.

### Step 3: Upload Dashboard Files

1. On your new repository page, click **uploading an existing file**
   - OR click **Add file** → **Upload files**
2. Drag and drop ALL FOUR files from your computer:
   - `index.html` (the main dashboard)
   - `data.js` (your match data)
   - `app.js` (dashboard functionality)
   - `update-form.html` (automated update form)
3. Scroll down to "Commit changes"
4. Type commit message: `Initial dashboard upload`
5. Click **Commit changes**

You should now see all four files listed in your repository.

### Step 4: Enable GitHub Pages

1. In your repository, click **Settings** (top menu bar)
2. In the left sidebar, scroll down and click **Pages**
3. Under **Branch**, click the dropdown that says "None"
4. Select **main** (or **master** if that's what you see)
5. Leave the folder as **/ (root)**
6. Click **Save**

You'll see a message: "Your site is being built..."

### Step 5: Get Your Dashboard URL

1. Wait 1-2 minutes for GitHub to build your site
2. Refresh the Settings → Pages page
3. You'll see a green box that says: **"Your site is live at https://YOUR-USERNAME.github.io/rhinos-dashboard/"**
4. Click the **Visit site** button to test it!

**Your dashboard is now live!** 🎉

---

## 📱 Updating Match Data (Automated Method - RECOMMENDED)

### One-Time Setup (5 minutes)

You'll need to create a GitHub Personal Access Token. This allows the update form to automatically commit changes to your repository.

#### Creating Your GitHub Token:

1. Open the update form: `https://YOUR-USERNAME.github.io/rhinos-dashboard/update-form.html`
2. Click the link in the setup section: **"GitHub Settings → Fine-grained tokens"**
   - OR go directly to: [github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)
3. Click **Generate new token**
4. Fill in the token details:
   - **Token name**: `Rhinos Dashboard`
   - **Expiration**: Select `Custom` → Choose 1 year (or longer)
   - **Description** (optional): "Update Rhinos dashboard from phone"
   - **Repository access**: Click **Only select repositories**
   - Click the dropdown and select your `rhinos-dashboard` repository
5. Scroll down to **Permissions**
6. Find **Repository permissions** → **Contents**
7. Click the dropdown and select **Read and write**
8. Scroll to the bottom and click **Generate token**
9. **IMPORTANT**: Copy the token immediately (it starts with `github_pat_...`)
   - You won't be able to see it again!
   - Save it somewhere temporarily (you'll paste it in the form next)

#### Configuring the Update Form:

1. Go back to your update form: `https://YOUR-USERNAME.github.io/rhinos-dashboard/update-form.html`
2. Enter:
   - **GitHub Username**: Your GitHub username (e.g., `matthew-culnane`)
   - **Repository Name**: `rhinos-dashboard` (or whatever you named it)
   - **Personal Access Token**: Paste the token you copied
3. Click **Save Configuration**

You'll see "Configuration saved!" and the form will appear.

**Your form is now connected!** ✅ The token is stored securely in your browser.

### After Each Match (On Your Phone):

1. Open the update form on your phone: `https://YOUR-USERNAME.github.io/rhinos-dashboard/update-form.html`
2. Fill in all the match details:
   - Match ID (e.g., `M05`)
   - Date
   - Opponent name
   - Home or Away
   - Score
   - Result (Win/Draw/Loss)
   - Competition type (League/Friendly/Cup)
   - Player of the Match
   - **Squad Selection**: Check the boxes for players who appeared
   - **Goals**: Click "+ Add Goal" and enter scorer and assister for each goal
3. Tap **🚀 Submit Update to GitHub**
4. Wait for the loading spinner (5-10 seconds)
5. You'll see: "✅ Match data successfully uploaded! Dashboard will update in a few seconds."
6. **Done!** Your dashboard is updated automatically!

The form will reset and you can go view the updated dashboard.

---

## 📊 Manual Update Method (Backup Option)

If you prefer to edit the data manually, or if the automated form isn't working:

### How to Manually Edit data.js:

1. Go to your GitHub repository
2. Click on the `data.js` file
3. Click the **pencil icon** (✏️ Edit this file) in the top-right
4. Add your new match to the `matches` array (see format below)
5. Add goals to the `goals` array
6. Scroll down and click **Commit changes**
7. Dashboard updates automatically in 30-60 seconds

### Match Format:

```javascript
{
    id: "M05",
    date: "2026-02-14",     // YYYY-MM-DD format
    opponent: "Team Name",
    homeAway: "Home",       // or "Away"
    teamGoals: 3,
    opponentGoals: 1,
    result: "W",            // W, D, or L
    competition: "League",  // League, Friendly, or Cup
    potm: "Player Name",
    squad: ["Fabian", "Lake", "Darius", "Siji", "Reuben", "Kian", "Aydan", "Leo"]
}
```

Add this **before** the closing `]` of the matches array, with a comma after the previous match.

### Goal Format:

```javascript
{ matchId: "M05", scorer: "Fabian", assister: "Lake" }
{ matchId: "M05", scorer: "Kian", assister: null }  // Unassisted goal
```

---

## 🔒 Security & Privacy

### GitHub Token Security:
- Your token is stored **only in your browser** (localStorage)
- It's **never sent anywhere** except to GitHub
- It only has write access to **your one repository**
- You can revoke it anytime at [github.com/settings/tokens](https://github.com/settings/tokens)

### Dashboard Privacy:
- Your dashboard is **public** but **not searchable**
- Only people with the direct link can find it
- No personal information should be in the dashboard
- If you need it private, you'd need a GitHub Pro account (paid)

---

## 📱 Dashboard Features

### Interactive Elements:
- **Tap on any player name** → See their full season performance match-by-match
- **Tap on any match** → See complete match details (goals, squad, POTM)
- **Sortable table** → Tap column headers to sort (Apps, Goals, Assists, POTM)
- **Form indicator** → Shows last 5 results (W/D/L boxes at top)

### Mobile-Optimized:
- ✅ Portrait mode layout
- ✅ Touch-friendly buttons
- ✅ Smooth animations
- ✅ Fast loading
- ✅ Works offline after first visit

### Real-Time Stats:
- Season summary cards
- Match results pie chart
- Goals by player bar chart
- Full match history with competition badges
- "Story So Far" narrative summary
- Season leaders table with gold/silver/bronze ranks

---

## 🔗 Sharing Your Dashboard

### Your Dashboard URLs:
- **Main Dashboard**: `https://YOUR-USERNAME.github.io/rhinos-dashboard/`
- **Update Form**: `https://YOUR-USERNAME.github.io/rhinos-dashboard/update-form.html`

Replace `YOUR-USERNAME` with your actual GitHub username.

### Sharing Tips:
1. **Bookmark** both URLs on your phone
2. **Pin** the main dashboard link in your WhatsApp group
3. **Add to home screen** on your phone (works like an app!)
   - iPhone: Open in Safari → Share → Add to Home Screen
   - Android: Open in Chrome → Menu → Add to Home screen
4. **Share update form** only with people who should update data

---

## 🛠️ Troubleshooting

### "Your site is not published yet"
- Wait 2-3 minutes after enabling Pages
- Refresh the Settings → Pages page
- Make sure you selected the **main** branch

### Update form shows "Failed to fetch data.js"
- Check your **GitHub username** is correct
- Check **repository name** matches exactly
- Make sure token has **Contents: Read and write** permission
- Try regenerating a new token

### Token expired or doesn't work
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Find "Rhinos Dashboard" token
3. Click **Regenerate token**
4. Copy the new token
5. Go to update form → Click "Change Settings"
6. Paste the new token and save

### Dashboard not updating
- Check GitHub repository - are your changes there?
- Clear your browser cache (Settings → Clear browsing data)
- Wait 30-60 seconds for GitHub Pages to rebuild
- Hard refresh the page (Ctrl+F5 on desktop, or close and reopen on mobile)

### "Squad not recorded" showing in match details
- Make sure you added the `squad` array to the match data
- Check the squad array has player names spelled exactly as they appear in the players list

---

## 💡 Tips & Best Practices

### For Match Updates:
- **Update as soon as possible** after the match while it's fresh
- **Take a photo** of the score sheet if provided
- **Double-check** squad selection (who actually played)
- **Be consistent** with player names (always "Fabian", not "Fabi")

### For Long-Term Maintenance:
- **Bookmark** the update form URL
- **Set token expiration** to 1 year, set a calendar reminder to renew it
- **Keep a backup** of your data.js file downloaded locally
- **Test the update form** after setting it up

### For the WhatsApp Group:
- **Pin the dashboard link** at the top of the group
- **Update** the pinned message after big wins! 🎉
- **Share screenshots** of the charts and stats
- **Encourage** parents to check player individual stats

---

## 🎨 Customization

### Changing Colors:
All colors are defined in `index.html` in the `<style>` section:
- Club red: `#dc3545`
- Success green: `#28a745`
- Warning amber: `#ffc107`

Search for these hex codes in `index.html` and replace with your preferred colors.

### Adding New Players:
If a new player joins mid-season:

1. Edit `data.js`
2. Add to the `players` array:
   ```javascript
   { name: "NewPlayer", appearances: 0 }
   ```
3. Update the update form HTML to add their checkbox in the squad section

---

## 📞 Need More Help?

### Helpful Resources:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Tokens Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- Search YouTube for "GitHub Pages tutorial" for video guides

---

**Built for the Aspley Guise U8 Rhinos** 🦏⚽

_Go Rhinos!_

---

## 📋 Quick Reference

### File Structure:
```
rhinos-dashboard/
├── index.html        (Main dashboard)
├── data.js          (Match and player data)
├── app.js           (Dashboard logic)
└── update-form.html (Automated update tool)
```

### Common GitHub URLs:
- Your repository: `github.com/YOUR-USERNAME/rhinos-dashboard`
- Token settings: `github.com/settings/tokens`
- Repository settings: `github.com/YOUR-USERNAME/rhinos-dashboard/settings`

---

## 🔄 Daily Workflow (Git Updates)

After editing files locally (especially `data.js` after a match), push changes to GitHub:

```bash
cd "/Users/matthew.culnane/Library/CloudStorage/OneDrive-OMNE/Personal/Fabian/U8 Rhinos season data"
git add data.js
git commit -m "Add match vs [Opponent Name]"
git push
```

Your dashboard will update live in 30-60 seconds at: **https://mculnane.github.io/rhinos-dashboard/**

### Quick Git Commands:
- **Check status**: `git status`
- **See recent commits**: `git log --oneline -5`
- **Undo uncommitted changes**: `git checkout -- data.js`
- **Pull latest from GitHub**: `git pull`
