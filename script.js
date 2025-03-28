let maps = [
    { name: "The Skeld", id: "skeld", percentage: 20, played: 0 },
    { name: "Polus", id: "polus", percentage: 20, played: 0 },
    { name: "Mira HQ", id: "mira", percentage: 20, played: 0 },
    { name: "The Airship", id: "airship", percentage: 20, played: 0 },
    { name: "Fungle", id: "fungle", percentage: 20, played: 0 }
];
let totalPlays = 0;

// Fonction pour initialiser les pourcentages avec "Proba :"
function initialiserProba() {
    for (let map of maps) {
        document.querySelector(`#${map.id} .percentage`).textContent = `Proba : ${map.percentage.toFixed(1)}%`;
    }
}

function tirerAuSort() {
    let rand = Math.random() * 100;
    let cumulative = 0;
    let selectedMap = null;

    for (let map of maps) {
        cumulative += map.percentage;
        if (rand < cumulative) {
            selectedMap = map;
            break;
        }
    }
    
    selectedMap.played++;
    totalPlays++;
    updateStats();
    
    // Suppression des secondes dans l'heure
    let now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let historyList = document.getElementById("history-list");
    let newHistoryItem = document.createElement("div");
    newHistoryItem.className = "history-item";
    newHistoryItem.textContent = `${now} - ${selectedMap.name}`;
    historyList.insertBefore(newHistoryItem, historyList.firstChild);
    
    document.getElementById("resultat").innerHTML = `Next map: <span class='selected-map'>${selectedMap.name}</span>`;
    
    let redistribution = selectedMap.percentage / 4;
    selectedMap.percentage = 0;

    for (let map of maps) {
        if (map !== selectedMap) {
            map.percentage += redistribution;
        }
    }
    
    for (let map of maps) {
        document.querySelector(`#${map.id} .percentage`).textContent = `Proba : ${map.percentage.toFixed(1)}%`;
    }
}

function updateStats() {
    for (let map of maps) {
        let percentagePlayed = totalPlays > 0 ? ((map.played / totalPlays) * 100).toFixed(1) : 0.0;
        document.getElementById(`stats-${map.id}`).textContent = `${map.name}: ${percentagePlayed}% (${map.played})`;
    }
}

// Initialiser les probabilités au chargement de la page
window.onload = function() {
    initialiserProba();
};
