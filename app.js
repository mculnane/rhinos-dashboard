// Aspley Guise U8 Rhinos Dashboard Logic

// Calculate player statistics
function calculatePlayerStats() {
    const stats = {};

    // Initialize stats for all players
    seasonData.players.forEach(player => {
        stats[player.name] = {
            name: player.name,
            goals: 0,
            assists: 0,
            potm: 0,
            hatTricks: 0,
            appearances: player.appearances
        };
    });

    // Count goals and assists (excluding own goals)
    seasonData.goals.forEach(goal => {
        // Skip own goals for statistics
        if (goal.isOwnGoal) return;

        if (stats[goal.scorer]) {
            stats[goal.scorer].goals++;
        }
        if (goal.assister && stats[goal.assister]) {
            stats[goal.assister].assists++;
        }
    });

    // Count POTM awards
    seasonData.matches.forEach(match => {
        if (match.potm && stats[match.potm]) {
            stats[match.potm].potm++;
        }
    });

    // Calculate hat tricks (matches with 3+ goals per player)
    seasonData.players.forEach(player => {
        seasonData.matches.forEach(match => {
            const goalsInMatch = seasonData.goals.filter(goal =>
                goal.matchId === match.id &&
                goal.scorer === player.name &&
                !goal.isOwnGoal
            ).length;

            if (goalsInMatch >= 3) {
                stats[player.name].hatTricks++;
            }
        });
    });

    return Object.values(stats).sort((a, b) => b.goals - a.goals);
}

// Calculate clean sheet statistics for goalkeeper
function calculateCleanSheetStats() {
    // Find goalkeeper (hardcoded as Reuben)
    const goalkeeper = "Reuben";

    // Get all matches where goalkeeper appeared
    const gkMatches = seasonData.matches.filter(match =>
        match.squad && match.squad.includes(goalkeeper)
    );

    // Find clean sheet matches (0 opponent goals)
    const cleanSheetMatches = gkMatches.filter(match =>
        match.opponentGoals === 0
    );

    const appearances = gkMatches.length;
    const cleanSheets = cleanSheetMatches.length;
    const cleanSheetRate = appearances > 0
        ? Math.round((cleanSheets / appearances) * 100)
        : 0;

    return {
        goalkeeper,
        appearances,
        cleanSheets,
        cleanSheetRate,
        cleanSheetMatches: cleanSheetMatches.map(match => ({
            id: match.id,
            date: match.date,
            opponent: match.opponent,
            homeAway: match.homeAway,
            teamGoals: match.teamGoals,
            opponentGoals: match.opponentGoals
        }))
    };
}

// Calculate season statistics
function calculateSeasonStats() {
    const wins = seasonData.matches.filter(m => m.result === 'W').length;
    const draws = seasonData.matches.filter(m => m.result === 'D').length;
    const losses = seasonData.matches.filter(m => m.result === 'L').length;
    const totalMatches = seasonData.matches.length;
    const totalGoals = seasonData.matches.reduce((sum, m) => sum + m.teamGoals, 0);
    const totalConceded = seasonData.matches.reduce((sum, m) => sum + m.opponentGoals, 0);
    const goalDifference = totalGoals - totalConceded;
    const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

    return {
        wins,
        draws,
        losses,
        totalMatches,
        totalGoals,
        totalConceded,
        goalDifference,
        winRate,
        goalsPerMatch: totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : 0
    };
}

// Generate "Story So Far" text
function generateStory(stats, playerStats) {
    const topScorer = playerStats[0];
    const topAssister = playerStats.sort((a, b) => b.assists - a.assists)[0];

    playerStats.sort((a, b) => (b.goals + b.assists) - (a.goals + a.assists));
    const topInvolvements = playerStats[0];

    const story = `The Rhinos have played ${stats.totalMatches} matches this season, winning ${stats.wins} and losing ${stats.losses}, giving them a ${stats.winRate}% win rate. The team has scored ${stats.totalGoals} goals while conceding ${stats.totalConceded}, with ${topScorer.name} leading the scoring charts with ${topScorer.goals} goals. Averaging ${stats.goalsPerMatch} goals per match, the Rhinos have a goal difference of ${stats.goalDifference > 0 ? '+' : ''}${stats.goalDifference}. ${topAssister.name} has been the creative force with ${topAssister.assists} assists, while ${topInvolvements.name} leads goal involvements with ${topInvolvements.goals + topInvolvements.assists}.`;

    return story;
}

// Update stat cards
function updateStatCards(stats) {
    document.getElementById('stat-matches').textContent = stats.totalMatches;
    document.getElementById('stat-wins').textContent = stats.wins;
    document.getElementById('stat-goals').textContent = stats.totalGoals;
    document.getElementById('stat-winrate').textContent = stats.winRate + '%';
}

// Update last updated timestamp
function updateLastUpdated() {
    const lastUpdatedEl = document.getElementById('last-updated');

    // Use lastUpdated from data.js if available, otherwise fall back to most recent match date
    let lastUpdateDate;
    if (seasonData.lastUpdated) {
        lastUpdateDate = new Date(seasonData.lastUpdated);
    } else if (seasonData.matches.length > 0) {
        // Find most recent match date
        const sortedMatches = [...seasonData.matches].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
        lastUpdateDate = new Date(sortedMatches[0].date);
    } else {
        lastUpdateDate = new Date();
    }

    const formatted = lastUpdateDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    lastUpdatedEl.textContent = `Last updated: ${formatted}`;
}

// Create Results Pie Chart
function createResultsChart(stats) {
    try {
        console.log('[CHART DEBUG] Starting createResultsChart');
        console.log('[CHART DEBUG] Stats:', stats);

        const canvas = document.getElementById('resultsChart');
        console.log('[CHART DEBUG] Canvas element:', canvas);

        if (!canvas) {
            console.error('[CHART DEBUG] resultsChart canvas not found!');
            return;
        }

        const ctx = canvas.getContext('2d');
        console.log('[CHART DEBUG] Canvas context:', ctx);

        if (typeof Chart === 'undefined') {
            console.error('[CHART DEBUG] Chart.js not loaded!');
            return;
        }

        console.log('[CHART DEBUG] Creating Chart.js instance...');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    `${stats.wins} win${stats.wins !== 1 ? 's' : ''}`,
                    `${stats.draws} draw${stats.draws !== 1 ? 's' : ''}`,
                    `${stats.losses} loss${stats.losses !== 1 ? 'es' : ''}`
                ],
                datasets: [{
                    data: [stats.wins, stats.draws, stats.losses],
                    backgroundColor: [
                        '#28a745',  // Green for wins
                        '#ffc107',  // Amber for draws
                        '#dc3545'   // Red for losses
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 10,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
        console.log('[CHART DEBUG] Results chart created successfully');
    } catch (error) {
        console.error('[CHART DEBUG] Error creating results chart:', error);
        console.error('[CHART DEBUG] Error stack:', error.stack);
    }
}

// Create Goals Bar Chart
function createGoalsChart(playerStats) {
    try {
        console.log('[CHART DEBUG] Starting createGoalsChart');
        console.log('[CHART DEBUG] Player stats:', playerStats);

        const canvas = document.getElementById('goalsChart');
        console.log('[CHART DEBUG] Canvas element:', canvas);

        if (!canvas) {
            console.error('[CHART DEBUG] goalsChart canvas not found!');
            return;
        }

        const ctx = canvas.getContext('2d');
        console.log('[CHART DEBUG] Canvas context:', ctx);

        // Destroy existing chart if it exists
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }

        if (typeof Chart === 'undefined') {
            console.error('[CHART DEBUG] Chart.js not loaded!');
            return;
        }

        const sortedPlayers = [...playerStats].sort((a, b) => b.goals - a.goals);
        console.log('[CHART DEBUG] Sorted players:', sortedPlayers);

        console.log('[CHART DEBUG] Creating Chart.js instance...');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedPlayers.map(p => p.name),
                datasets: [{
                    label: 'Goals',
                    data: sortedPlayers.map(p => p.goals),
                    backgroundColor: '#dc3545',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: '#e9ecef'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        console.log('[CHART DEBUG] Goals chart created successfully');
    } catch (error) {
        console.error('[CHART DEBUG] Error creating goals chart:', error);
        console.error('[CHART DEBUG] Error stack:', error.stack);
    }
}

// Create assists chart
function createAssistsChart(playerStats) {
    try {
        const canvas = document.getElementById('goalsChart');
        if (!canvas) return;

        // Destroy existing chart if it exists
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        const sortedPlayers = [...playerStats].sort((a, b) => b.assists - a.assists);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedPlayers.map(p => p.name),
                datasets: [{
                    label: 'Assists',
                    data: sortedPlayers.map(p => p.assists),
                    backgroundColor: '#28a745',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: '#e9ecef'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('[CHART DEBUG] Error creating assists chart:', error);
    }
}

// Create POTM awards chart
function createPOTMChart(playerStats) {
    try {
        const canvas = document.getElementById('goalsChart');
        if (!canvas) return;

        // Destroy existing chart if it exists
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        const sortedPlayers = [...playerStats].sort((a, b) => b.potm - a.potm);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedPlayers.map(p => p.name),
                datasets: [{
                    label: 'POTM Awards',
                    data: sortedPlayers.map(p => p.potm),
                    backgroundColor: '#ffc107',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: '#e9ecef'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('[CHART DEBUG] Error creating POTM chart:', error);
    }
}

// Create hat tricks chart
function createHatTricksChart(playerStats) {
    try {
        const canvas = document.getElementById('goalsChart');
        if (!canvas) return;

        // Destroy existing chart if it exists
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        const sortedPlayers = [...playerStats].sort((a, b) => b.hatTricks - a.hatTricks);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedPlayers.map(p => p.name),
                datasets: [{
                    label: 'Hat Tricks',
                    data: sortedPlayers.map(p => p.hatTricks),
                    backgroundColor: '#9b59b6',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: '#e9ecef'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('[CHART DEBUG] Error creating hat tricks chart:', error);
    }
}

// Create appearances chart
function createAppearancesChart(playerStats) {
    try {
        const canvas = document.getElementById('goalsChart');
        if (!canvas) return;

        // Destroy existing chart if it exists
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        const sortedPlayers = [...playerStats].sort((a, b) => b.appearances - a.appearances);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedPlayers.map(p => p.name),
                datasets: [{
                    label: 'Appearances',
                    data: sortedPlayers.map(p => p.appearances),
                    backgroundColor: '#6c757d',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: '#e9ecef'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('[CHART DEBUG] Error creating appearances chart:', error);
    }
}

// Global variable to track current chart type
let currentChartType = 'appearances';

// Switch between chart types
function switchChart(event, chartType) {
    console.log('[CHART SWITCH] Called with chartType:', chartType);
    console.log('[CHART SWITCH] Event:', event);
    console.log('[CHART SWITCH] Event target:', event.target);

    currentChartType = chartType;

    // Update active tab styling
    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    console.log('[CHART SWITCH] Updated active tab');

    // Update section title and emoji
    const titleElement = document.getElementById('chart-title');
    const emojiElement = document.getElementById('chart-emoji');
    console.log('[CHART SWITCH] Title element:', titleElement);
    console.log('[CHART SWITCH] Emoji element:', emojiElement);

    // Calculate fresh player stats
    const playerStats = calculatePlayerStats();
    console.log('[CHART SWITCH] Player stats calculated:', playerStats.length, 'players');

    // Render appropriate chart
    switch(chartType) {
        case 'appearances':
            console.log('[CHART SWITCH] Rendering appearances chart');
            titleElement.textContent = 'Appearances by Player';
            emojiElement.textContent = '👥';
            createAppearancesChart(playerStats);
            break;
        case 'goals':
            console.log('[CHART SWITCH] Rendering goals chart');
            titleElement.textContent = 'Goals by Player';
            emojiElement.textContent = '⚽';
            createGoalsChart(playerStats);
            break;
        case 'assists':
            console.log('[CHART SWITCH] Rendering assists chart');
            titleElement.textContent = 'Assists by Player';
            emojiElement.textContent = '🎯';
            createAssistsChart(playerStats);
            break;
        case 'potm':
            console.log('[CHART SWITCH] Rendering POTM chart');
            titleElement.textContent = 'POTM Awards by Player';
            emojiElement.textContent = '⭐';
            createPOTMChart(playerStats);
            break;
        case 'hatTricks':
            console.log('[CHART SWITCH] Rendering hat tricks chart');
            titleElement.textContent = 'Hat Tricks by Player';
            emojiElement.textContent = '🎩';
            createHatTricksChart(playerStats);
            break;
        default:
            console.error('[CHART SWITCH] Unknown chart type:', chartType);
    }
    console.log('[CHART SWITCH] Switch complete');
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function setupModalHandlers() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Backdrop clicks
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

// Show Player Detail Modal
function showPlayerDetail(playerName) {
    const playerStats = calculatePlayerStats();
    const player = playerStats.find(p => p.name === playerName);

    if (!player) return;

    // Set header and stats
    document.getElementById('player-modal-name').textContent = playerName;
    document.getElementById('player-modal-goals').textContent = player.goals;
    document.getElementById('player-modal-assists').textContent = player.assists;
    document.getElementById('player-modal-potm').textContent = player.potm;
    document.getElementById('player-modal-apps').textContent = player.appearances;

    // Build match-by-match table
    const tbody = document.getElementById('player-modal-matches');
    tbody.innerHTML = '';

    seasonData.matches.forEach(match => {
        // Check if player appeared in this match using squad array
        const playerInMatch = match.squad && match.squad.includes(playerName);
        if (!playerInMatch) return;

        // Count goals and assists for this player in this match
        const matchGoals = seasonData.goals.filter(g =>
            g.matchId === match.id && g.scorer === playerName
        ).length;

        const matchAssists = seasonData.goals.filter(g =>
            g.matchId === match.id && g.assister === playerName
        ).length;

        // Check if player was POTM
        const isPotm = match.potm === playerName;

        const date = new Date(match.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short'
        });

        const homeAwayIndicator = match.homeAway === 'Home' ? '(H)' : '(A)';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>${match.opponent} ${homeAwayIndicator}</td>
            <td>${matchGoals || '-'}</td>
            <td>${matchAssists || '-'}</td>
            <td>${isPotm ? '⭐' : ''}</td>
        `;
        tbody.appendChild(row);
    });

    openModal('player-modal');
}

// Show Match Detail Modal
function showMatchDetail(matchId) {
    const match = seasonData.matches.find(m => m.id === matchId);
    if (!match) return;

    const date = new Date(match.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const homeAwayText = match.homeAway === 'Home' ? 'vs' : 'at';

    // Set header
    document.getElementById('match-modal-title').textContent =
        `${homeAwayText} ${match.opponent}`;

    // Set score and meta
    document.getElementById('match-modal-score').textContent =
        `${match.teamGoals} - ${match.opponentGoals}`;
    document.getElementById('match-modal-opponent').textContent = match.opponent;
    document.getElementById('match-modal-date').textContent = date;

    const competitionBadge = match.competition
        ? `<span class="competition-badge ${match.competition}">${match.competition}</span>`
        : '';
    document.getElementById('match-modal-competition').innerHTML = competitionBadge;

    // Build goals list
    const goalsContainer = document.getElementById('match-modal-goals');
    const matchGoals = seasonData.goals.filter(g => g.matchId === matchId);

    if (matchGoals.length === 0) {
        goalsContainer.innerHTML = '<p style="color: #666; font-style: italic;">No goals scored</p>';
    } else {
        goalsContainer.innerHTML = matchGoals.map(goal => {
            // Handle own goals
            if (goal.isOwnGoal) {
                return `
                    <div class="goal-item">
                        <span class="goal-icon">🥅</span>
                        <span class="goal-text">
                            <span class="goal-scorer">Own goal</span>
                        </span>
                    </div>
                `;
            }

            // Handle regular goals
            const assisterText = goal.assister
                ? `<span class="goal-assister"> (assist: ${goal.assister})</span>`
                : '';
            return `
                <div class="goal-item">
                    <span class="goal-icon">⚽</span>
                    <span class="goal-text">
                        <span class="goal-scorer">${goal.scorer}</span>${assisterText}
                    </span>
                </div>
            `;
        }).join('');
    }

    // Build squad list - use the match's squad array
    const squadContainer = document.getElementById('match-modal-squad');
    const squadPlayers = match.squad || [];

    if (squadPlayers.length === 0) {
        squadContainer.innerHTML = '<p style="color: #666; font-style: italic;">Squad not recorded</p>';
    } else {
        squadContainer.innerHTML = squadPlayers.map(player =>
            `<div class="squad-player">${player}</div>`
        ).join('');
    }

    // Show POTM
    document.getElementById('match-modal-potm').textContent = match.potm || 'Not recorded';

    openModal('match-modal');
}

// Populate match history with click handlers
function populateMatchHistory() {
    const tbody = document.getElementById('matches-body');
    tbody.innerHTML = '';

    const sortedMatches = [...seasonData.matches].reverse();

    sortedMatches.forEach(match => {
        const date = new Date(match.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short'
        });

        // Add (H) or (A) to opponent name
        const homeAwayIndicator = match.homeAway === 'Home' ? '(H)' : '(A)';
        const opponentDisplay = `${match.opponent} ${homeAwayIndicator}`;

        // Add competition badge if present
        const competitionBadge = match.competition
            ? `<span class="competition-badge ${match.competition}">${match.competition}</span>`
            : '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>${opponentDisplay}${competitionBadge}</td>
            <td>${match.teamGoals}-${match.opponentGoals}</td>
            <td><span class="match-result result-${match.result}">${match.result}</span></td>
        `;

        // Add click handler
        row.addEventListener('click', () => showMatchDetail(match.id));

        tbody.appendChild(row);
    });
}

// Populate Safe Hands section with clean sheet data
function populateSafeHands() {
    const stats = calculateCleanSheetStats();

    // Update goalkeeper stats card
    document.getElementById('gk-name').textContent = stats.goalkeeper;
    document.getElementById('gk-clean-sheets').textContent = stats.cleanSheets;
    document.getElementById('gk-appearances').textContent = stats.appearances;
    document.getElementById('gk-clean-sheet-rate').textContent = stats.cleanSheetRate + '%';

    // Populate clean sheet matches list
    const listContainer = document.getElementById('clean-sheets-list');

    if (stats.cleanSheetMatches.length === 0) {
        listContainer.innerHTML = `
            <div class="clean-sheets-empty">
                No clean sheets yet this season. Keep working hard! 🧤
            </div>
        `;
        return;
    }

    // Reverse to show most recent first
    const sortedMatches = [...stats.cleanSheetMatches].reverse();

    listContainer.innerHTML = sortedMatches.map(match => {
        const date = new Date(match.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short'
        });

        const homeAwayIndicator = match.homeAway === 'Home' ? '(H)' : '(A)';

        return `
            <div class="clean-sheet-item" onclick="showMatchDetail('${match.id}')">
                <span class="clean-sheet-check">✓</span>
                <div class="clean-sheet-details">
                    <div class="clean-sheet-date">${date}</div>
                    <div class="clean-sheet-match">${match.opponent} ${homeAwayIndicator}</div>
                </div>
                <span class="clean-sheet-score">${match.teamGoals}-${match.opponentGoals}</span>
            </div>
        `;
    }).join('');
}

// Populate player buttons for detail access
function populatePlayerButtons() {
    const container = document.getElementById('player-buttons');
    container.innerHTML = '';

    seasonData.players.forEach(player => {
        const button = document.createElement('button');
        button.className = 'player-btn';
        button.textContent = player.name;
        button.onclick = () => showPlayerDetail(player.name);
        container.appendChild(button);
    });
}

// Initialize dashboard
function initDashboard() {
    console.log('[DASHBOARD DEBUG] Starting dashboard initialization...');
    console.log('[DASHBOARD DEBUG] User agent:', navigator.userAgent);
    console.log('[DASHBOARD DEBUG] Screen dimensions:', window.innerWidth, 'x', window.innerHeight);
    console.log('[DASHBOARD DEBUG] Chart.js available:', typeof Chart !== 'undefined');

    try {
        console.log('[DASHBOARD DEBUG] Calculating stats...');
        const seasonStats = calculateSeasonStats();
        const playerStats = calculatePlayerStats();
        console.log('[DASHBOARD DEBUG] Season stats:', seasonStats);
        console.log('[DASHBOARD DEBUG] Player stats:', playerStats);

        console.log('[DASHBOARD DEBUG] Updating stat cards...');
        updateStatCards(seasonStats);

        console.log('[DASHBOARD DEBUG] Updating last updated...');
        updateLastUpdated();

        console.log('[DASHBOARD DEBUG] Creating results chart...');
        createResultsChart(seasonStats);

        console.log('[DASHBOARD DEBUG] Creating appearances chart...');
        createAppearancesChart(playerStats);

        console.log('[DASHBOARD DEBUG] Populating match history...');
        populateMatchHistory();

        console.log('[DASHBOARD DEBUG] Populating safe hands...');
        populateSafeHands();

        console.log('[DASHBOARD DEBUG] Populating player buttons...');
        populatePlayerButtons();

        console.log('[DASHBOARD DEBUG] Setting up modal handlers...');
        setupModalHandlers();

        // Remove loading class to show content
        const container = document.querySelector('.container');
        if (container) {
            container.classList.remove('loading');
            container.style.opacity = '1';
        }
        console.log('[DASHBOARD DEBUG] Dashboard initialization complete!');
    } catch (error) {
        console.error('[DASHBOARD DEBUG] Dashboard initialization failed:', error);
        console.error('[DASHBOARD DEBUG] Error stack:', error.stack);
        // Fallback: show content anyway
        const container = document.querySelector('.container');
        if (container) {
            container.style.opacity = '1';
        }
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', initDashboard);
