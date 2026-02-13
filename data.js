// Aspley Guise U8 Rhinos Season Data
// Update this file to refresh the dashboard

const seasonData = {
    matches: [
        {
            id: "M01",
            date: "2026-01-17",
            opponent: "Great Linford Raptors",
            homeAway: "Away",
            teamGoals: 9,
            opponentGoals: 3,
            result: "W",
            competition: "League",
            potm: "Fabian",
            squad: ["Fabian", "Lake", "Darius", "Siji", "Reuben", "Kian"]
        },
        {
            id: "M02",
            date: "2026-01-24",
            opponent: "MK Athletic Rockets",
            homeAway: "Home",
            teamGoals: 12,
            opponentGoals: 2,
            result: "W",
            competition: "League",
            potm: "Kian",
            squad: ["Fabian", "Lake", "Darius", "Reuben", "Kian", "Aydan", "Leo"]
        },
        {
            id: "M03",
            date: "2026-01-31",
            opponent: "Tattenhoe Youth Jaguars",
            homeAway: "Away",
            teamGoals: 4,
            opponentGoals: 0,
            result: "W",
            competition: "League",
            potm: "Aydan",
            squad: ["Fabian", "Lake", "Darius", "Siji", "Reuben", "Kian", "Aydan", "Leo"]
        },
        {
            id: "M04",
            date: "2026-02-07",
            opponent: "Cranfield Colts",
            homeAway: "Home",
            teamGoals: 0,
            opponentGoals: 3,
            result: "L",
            competition: "League",
            potm: "Reuben",
            squad: ["Fabian", "Lake", "Darius", "Reuben", "Kian", "Aydan"]
        }
    ],

    goals: [
        // M01 - Great Linford Raptors (9 goals)
        { matchId: "M01", scorer: "Fabian", assister: null },
        { matchId: "M01", scorer: "Fabian", assister: null },
        { matchId: "M01", scorer: "Fabian", assister: null },
        { matchId: "M01", scorer: "Fabian", assister: null },
        { matchId: "M01", scorer: "Lake", assister: null },
        { matchId: "M01", scorer: "Darius", assister: null },
        { matchId: "M01", scorer: "Siji", assister: null },
        { matchId: "M01", scorer: "Siji", assister: null },
        { matchId: "M01", scorer: "Siji", assister: null },

        // M02 - MK Athletic Rockets (12 goals - includes 2 own goals)
        { matchId: "M02", scorer: "Fabian", assister: null },
        { matchId: "M02", scorer: "Fabian", assister: null },
        { matchId: "M02", scorer: "Fabian", assister: null },
        { matchId: "M02", scorer: "Fabian", assister: null },
        { matchId: "M02", scorer: "Reuben", assister: null },
        { matchId: "M02", scorer: "Reuben", assister: null },
        { matchId: "M02", scorer: "Lake", assister: null },
        { matchId: "M02", scorer: "Lake", assister: null },
        { matchId: "M02", scorer: "Kian", assister: null },
        { matchId: "M02", scorer: "Darius", assister: null },
        // Note: 2 own goals by opponent not tracked in player stats

        // M03 - Tattenhoe Youth Jaguars (4 goals)
        { matchId: "M03", scorer: "Kian", assister: "Lake" },
        { matchId: "M03", scorer: "Kian", assister: "Aydan" },
        { matchId: "M03", scorer: "Siji", assister: "Aydan" },
        { matchId: "M03", scorer: "Darius", assister: null }

        // M04 - Cranfield Colts (0 goals)
    ],

    players: [
        { name: "Fabian", appearances: 4 },
        { name: "Lake", appearances: 4 },
        { name: "Darius", appearances: 4 },
        { name: "Siji", appearances: 2 },
        { name: "Reuben", appearances: 4 },
        { name: "Kian", appearances: 4 },
        { name: "Aydan", appearances: 3 },
        { name: "Leo", appearances: 2 }
    ]
};
