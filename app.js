// Aspley Guise U8 Rhinos Dashboard Logic

// Global state for table sorting
let currentSort = {
    column: 'goals',
    direction: 'desc'
};

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
            appearances: player.appearances
        };
    });

    // Count goals and assists
    seasonData.goals.forEach(goal => {
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

    return Object.values(stats).sort((a, b) => b.goals - a.goals);
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
    const now = new Date();
    const formatted = now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    lastUpdatedEl.textContent = `Last updated: ${formatted}`;
}

// Create Results Pie Chart
function createResultsChart(stats) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
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
}

// Create Goals Bar Chart
function createGoalsChart(playerStats) {
    const ctx = document.getElementById('goalsChart').getContext('2d');
    const sortedPlayers = [...playerStats].sort((a, b) => b.goals - a.goals);

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
}

// Sort player stats
function sortPlayerStats(playerStats, column, direction) {
    return [...playerStats].sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];

        // For name, use alphabetical sorting
        if (column === 'name') {
            return direction === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        // For numbers, use numeric sorting
        return direction === 'asc'
            ? aVal - bVal
            : bVal - aVal;
    });
}

// Setup table sorting
function setupTableSorting(playerStats) {
    const headers = document.querySelectorAll('#leaderboard th.sortable');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const sortColumn = header.dataset.sort;

            // Toggle direction if clicking the same column
            if (currentSort.column === sortColumn) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.column = sortColumn;
                currentSort.direction = 'desc'; // Default to descending for new column
            }

            // Update header classes
            headers.forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
            });
            header.classList.add(`sorted-${currentSort.direction}`);

            // Re-populate table with new sort (this re-adds click handlers)
            const allPlayerStats = calculatePlayerStats();
            populateLeaderboard(allPlayerStats);
        });
    });

    // Set initial sorted column indicator
    const initialHeader = document.querySelector(`#leaderboard th[data-sort="${currentSort.column}"]`);
    if (initialHeader) {
        initialHeader.classList.add('sorted-desc');
    }
}

// Populate match history
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
        tbody.appendChild(row);
    });
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

// Populate leaderboard table with sorting and click handlers
function populateLeaderboard(playerStats) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';

    // Sort the player stats based on current sort
    const sortedStats = sortPlayerStats(playerStats, currentSort.column, currentSort.direction);

    sortedStats.forEach((player, index) => {
        const row = document.createElement('tr');

        // Determine rank class for top 3
        const rankIndex = index + 1;
        let rankClass = 'rank';
        if (rankIndex === 1) rankClass += ' rank-1';
        else if (rankIndex === 2) rankClass += ' rank-2';
        else if (rankIndex === 3) rankClass += ' rank-3';

        row.innerHTML = `
            <td class="${rankClass}">${rankIndex}</td>
            <td>${player.name}</td>
            <td>${player.appearances}</td>
            <td>${player.goals}</td>
            <td>${player.assists}</td>
            <td>${player.potm}</td>
        `;

        // Add click handler
        row.addEventListener('click', () => showPlayerDetail(player.name));

        tbody.appendChild(row);
    });
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

// Initialize dashboard
function initDashboard() {
    const seasonStats = calculateSeasonStats();
    const playerStats = calculatePlayerStats();
    const story = generateStory(seasonStats, [...playerStats]);

    updateStatCards(seasonStats);
    updateLastUpdated();
    document.getElementById('story-text').textContent = story;
    createResultsChart(seasonStats);
    createGoalsChart(playerStats);
    populateLeaderboard(playerStats);
    populateMatchHistory();
    setupTableSorting(playerStats);
    setupModalHandlers();
}

// Run when page loads
document.addEventListener('DOMContentLoaded', initDashboard);
