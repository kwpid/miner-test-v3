// Game state variables
let coins = 100;
let crystals = 0;
let up = 0;

// Building data
const buildings = [
    {
        id: 'worker-building',
        name: 'Workers',
        cost: 100,
        production: 3,
        count: 0,
        purchaseCurrency: 'coins',
        productionCurrency: 'coins', 
        imageUrl: 'https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0ls_Kleki.png?v=1731953080499'
    },
    {
        id: 'factory-building',
        name: 'Factories',
        cost: 10000,
        production: 35,
        count: 0,
        purchaseCurrency: 'coins',
        productionCurrency: 'coins', 
        imageUrl: 'https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0lv_Kleki.png?v=1731953249354',
        unlockRequirement: {
            building: 'worker-building',
            count: 10
        },
        hidden: true // Initially hidden
    },
    {
        id: 'dynamite-building',
        name: 'Dynamite',
        cost: 250000,
        production: 100,
        count: 0,
        purchaseCurrency: 'coins',
        productionCurrency: 'coins', 
        imageUrl: 'https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0lx_Kleki.png?v=1731953399202',
        unlockRequirement: {
            building: 'factory-building',
            count: 25
        },
        hidden: true // Initially hidden
    },
    {
        id: 'drill-building',
        name: 'Drill',
        cost: 750000,
        production: 250,
        count: 0,
       purchaseCurrency: 'coins',
        productionCurrency: 'coins', 
        imageUrl: 'https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0lz_Kleki.png?v=1731953465422',
        unlockRequirement: {
            building: 'dynamite-building',
            count: 30
        },
        hidden: true // Initially hidden
    },
    {
        id: 'crystal-building',
        name: 'Crystal Miner',
        cost: 1000000,
        production: 1,
        count: 0,
      purchaseCurrency: 'coins',
        productionCurrency: 'crystals', 
        imageUrl: 'https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0lb_Kleki.png?v=1732124842660',
        unlockRequirement: {
            building: 'drill-building',
            count: 5,
        },
        hidden: true // Initially hidden
    },
    {
        id: 'crystal-factory-building',
        name: 'Crystal Factory',
        cost: 20000,
        production: 1,
        count: 0,
      purchaseCurrency: 'crystals',
        productionCurrency: 'crystals', 
        imageUrl: 'https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0lc_Kleki.png?v=1732124939380',
        unlockRequirement: {
            building: 'crystal-building',
            count: 15,
        },
        hidden: true // Initially hidden
    },
];
// Upgrade data
const upgrades = {
    "worker-building": {
        maxTier: 4,
        basePrice: 500,
        multiplier: 1.5,
        currentTier: 0,
        tiers: [
            { id: 1, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m5_Kleki.png?v=1731953947091", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m7_Kleki.png?v=1731954023019" },
            { id: 2, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m6_Kleki.png?v=1731953951156", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m8_Kleki.png?v=1731954024852" },
            { id: 3, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m6_Kleki%20(1).png?v=1731953956986", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m8_Kleki%20(1).png?v=1731954027899" },
          { id: 4, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0mi_Kleki%20(1).png?v=1732041023800", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0o4_Kleki.png?v=1732044513507" },
        ]
    },
    "factory-building": {
        maxTier: 4,
        basePrice: 1000,
        multiplier: 2,
      currentTier: 0,
        tiers: [
            { id: 1, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m5_Kleki.png?v=1731953947091", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m7_Kleki.png?v=1731954023019" },
            { id: 2, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m6_Kleki.png?v=1731953951156", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m8_Kleki.png?v=1731954024852" },
            { id: 3, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m6_Kleki%20(1).png?v=1731953956986", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m8_Kleki%20(1).png?v=1731954027899" },
          { id: 4, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0mi_Kleki%20(1).png?v=1732041023800", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0o4_Kleki.png?v=1732044513507" },
        ]
    },
    "dynamite-building": {
        maxTier: 4,
        basePrice: 50000,
        multiplier: 2.5,
      currentTier: 0,
        tiers: [
           { id: 1, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m5_Kleki.png?v=1731953947091", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m7_Kleki.png?v=1731954023019" },
            { id: 2, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m6_Kleki.png?v=1731953951156", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m8_Kleki.png?v=1731954024852" },
            { id: 3, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m6_Kleki%20(1).png?v=1731953956986", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m8_Kleki%20(1).png?v=1731954027899" },
          { id: 4, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0mi_Kleki%20(1).png?v=1732041023800", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0o4_Kleki.png?v=1732044513507" },
        ]
    },
    "drill-building": {
        maxTier: 4,
        basePrice: 100000,
        multiplier: 3,
      currentTier: 0,
        tiers: [
            { id: 1, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m5_Kleki.png?v=1731953947091", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m7_Kleki.png?v=1731954023019" },
            { id: 2, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m6_Kleki.png?v=1731953951156", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m8_Kleki.png?v=1731954024852" },
            { id: 3, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m6_Kleki%20(1).png?v=1731953956986", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0m8_Kleki%20(1).png?v=1731954027899" },
          { id: 4, icon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0mi_Kleki%20(1).png?v=1732041023800", activatedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0o4_Kleki.png?v=1732044513507" },
        ]
    }
};

// Enhanced function to format numbers with suffixes up to 1Qa
function formatNumber(num) {
    if (num >= 1e15) {
        return (num / 1e15).toFixed(1) + ' Qa';
    } else if (num >= 1e12) {
        return (num / 1e12).toFixed(1) + ' T';
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + ' B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + ' M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + ' K';
    } else {
        return num.toString();
    }
}

// Function to update the state of purchase buttons
function updatePurchaseButtons() {
    buildings.forEach(building => {
        const button = document.querySelector(`#${building.id} .purchase-button`);
        if (button) {
            button.disabled = coins < building.cost;
        }
    });
}

// Function to update currency display
function updateCurrencyDisplay() {
    document.getElementById('coins').innerText = `Coins: ${formatNumber(coins)}`;
    document.getElementById('crystals').innerText = `Crystals: ${formatNumber(crystals)}`;
    document.getElementById('up').innerText = `UP: ${formatNumber(up)}`;

    buildings.forEach(building => {
        const productionElem = document.getElementById(`${building.id}-production`);
        const multiplierElem = document.getElementById(`${building.id}-multiplier`);
        if (productionElem) {
            // Calculate the current production with any upgrades applied
            let effectiveProduction = building.count * building.production;
            let effectiveMultiplier = 1;
            
            // Check for any upgrades that affect the multiplier
            const buildingUpgrades = upgrades[building.id];
            if (buildingUpgrades) {
                effectiveMultiplier = Math.pow(buildingUpgrades.multiplier, buildingUpgrades.currentTier || 0);
            }

            // Round up the effective multiplier and production
            effectiveMultiplier = Math.ceil(effectiveMultiplier);
            effectiveProduction = Math.ceil(effectiveProduction * effectiveMultiplier);

            // Update production display with correct currency
            const currency = building.productionCurrency === 'crystals' ? 'Crystals' : 'Coins';
            productionElem.innerText = `${formatNumber(effectiveProduction)} ${currency}/s`;
            if (multiplierElem) {
                multiplierElem.innerText = `(${effectiveMultiplier}x)`;  // Display without decimals
            }
        }

        // Unlock the building based on requirements
        if (building.unlockRequirement) {
            const requirement = buildings.find(b => b.id === building.unlockRequirement.building);
            if (requirement && requirement.count >= building.unlockRequirement.count) {
                document.getElementById(building.id).classList.remove('hidden');
            }
        }
    });

    updatePurchaseButtons();
}
function purchaseBuilding(buildingId) {
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
        const currency = building.purchaseCurrency;
        if ((currency === 'coins' && coins >= building.cost) || 
            (currency === 'crystals' && crystals >= building.cost)) {
            if (currency === 'coins') coins -= building.cost;
            if (currency === 'crystals') crystals -= building.cost;

            building.count++;
            building.cost = Math.floor(building.cost * 1.05);
            document.getElementById(`${building.id}-count`).innerText = building.count;
            document.getElementById(`${building.id}-cost`).innerText = formatNumber(building.cost);
            updateCurrencyDisplay();
        }
    }
}

function generateBuildings() {
    const buildingsContainer = document.getElementById('buildings');
    buildingsContainer.innerHTML = ''; // Clear previous content

    // Separate buildings by currency type
    const coinBuildings = buildings.filter(b => b.productionCurrency === 'coins');
    const crystalBuildings = buildings.filter(b => b.productionCurrency === 'crystals');

    // Helper function to create a section
    const createSection = (title, buildingList) => {
        if (buildingList.length === 0) return; // Skip empty sections

        const section = document.createElement('div');
        section.className = 'building-section';

        const header = document.createElement('h2');
        header.innerText = title;
        section.appendChild(header);

        buildingList.forEach(building => {
            const buildingElem = document.createElement('div');
            buildingElem.className = `building ${building.hidden ? 'hidden' : ''}`;
            buildingElem.id = building.id;

            const currency = building.purchaseCurrency === 'crystals' ? 'Crystals' : 'Coins';
            buildingElem.innerHTML = `
                <img src="${building.imageUrl}" alt="${building.name}" class="icon">
                <span>${building.name}</span> <span id="${building.id}-count">${building.count}</span>
                <button class="purchase-button" onclick="purchaseBuilding('${building.id}')">Buy (Cost: <span id="${building.id}-cost">${formatNumber(building.cost)}</span> ${currency})</button>
                <span id="${building.id}-production">0 ${currency}/s</span>
                <span id="${building.id}-multiplier"></span> <!-- Multiplier will be displayed here -->
            `;

            section.appendChild(buildingElem);
        });

        buildingsContainer.appendChild(section);
    };

    // Create separate sections for Coin and Crystal buildings
    createSection('Coin-Producing Buildings', coinBuildings);
    createSection('Crystal-Producing Buildings', crystalBuildings);
}


// Function to render upgrades dynamically
function generateUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container');
    upgradesContainer.innerHTML = ''; // Clear previous content

    Object.keys(upgrades).forEach(buildingId => {
        const buildingUpgrades = upgrades[buildingId];
        const building = buildings.find(b => b.id === buildingId);
        
        // Check if the building is unlocked (either by count or the specific condition) and not hidden
        if (building && (building.hidden === true || buildingId === 'worker-building' || (building.unlockRequirement && isBuildingUnlocked(building.unlockRequirement)))) {
            const upgradeElem = document.createElement('div');
            upgradeElem.className = 'building-upgrades';
            upgradeElem.innerHTML = `
                <h3>${building.name} Upgrades</h3>
                <div class="upgrade-tiers" id="${buildingId}-upgrades"></div>
            `;
            upgradesContainer.appendChild(upgradeElem);

            const tiersContainer = document.getElementById(`${buildingId}-upgrades`);
            buildingUpgrades.tiers.forEach(tier => {
                const tierElem = document.createElement('button');
                const currentTier = buildingUpgrades.currentTier || 0;
                const price = buildingUpgrades.basePrice * Math.pow(2, tier.id - 1);
                const isPurchased = tier.id <= currentTier;

                tierElem.className = 'upgrade-tier';
                tierElem.innerHTML = `<img src="${isPurchased ? tier.activatedIcon : tier.icon}" alt="Tier ${tier.id}" class="icon">`;
                tierElem.disabled = tier.id > currentTier + 1 || coins < price || isPurchased;
                tierElem.onclick = () => purchaseUpgrade(buildingId, tier.id, price, tierElem, tier);

                tiersContainer.appendChild(tierElem);

                // Add tooltip
                tierElem.title = `Buy Tier ${tier.id} for ${formatNumber(price)} Coins`;
            });
        }
    });
}
// Function to update production logic
function updateProduction() {
    let coinsProduced = 0;
    let crystalsProduced = 0;

    buildings.forEach(building => {
        const production = building.count * building.production;

        // Check the currency type and add production accordingly
        if (building.productionCurrency === 'coins') {
            coinsProduced += production;
        } else if (building.productionCurrency === 'crystals') {
            crystalsProduced += production;
        }
    });

    // Add the produced resources
    coins += coinsProduced;
    crystals += crystalsProduced;

    // Update the displayed resources
    updateCurrencyDisplay();
}

// Call the production update function periodically
setInterval(updateProduction, 1000); // Adjust interval as needed

function isBuildingUnlocked(requirement) {
    const reqBuilding = buildings.find(b => b.id === requirement.building);
    return reqBuilding && reqBuilding.count >= requirement.count;
}

function purchaseUpgrade(buildingId, tierId, price, button, activatedIcon) {
    const buildingUpgrades = upgrades[buildingId];
    if (coins >= price && buildingUpgrades.currentTier + 1 === tierId) {
        coins -= price;
        buildingUpgrades.currentTier = tierId;

        // Update button icon and disable it
        button.querySelector('img').src = activatedIcon;
        button.disabled = true;

        // Recalculate production and update display
        updateCurrencyDisplay();
    }
}



// Add logic to regenerate upgrades when state changes
function updateUpgradeButtons() {
    generateUpgrades();
}
const tooltipContainer = document.getElementById('tooltip-container');

// Function to show the tooltip
function showTooltip(text) {
    tooltipContainer.innerText = text;
    tooltipContainer.style.display = 'block';
}

// Function to hide the tooltip
function hideTooltip() {
    tooltipContainer.style.display = 'none';
}

// Attach event listeners to elements that require tooltips
document.querySelectorAll('.upgrade-tier').forEach(element => {
    element.addEventListener('mouseover', () => {
        const tooltipText = element.getAttribute('data-tooltip');
        if (tooltipText) {
            showTooltip(tooltipText);
        }
    });

    element.addEventListener('mouseout', hideTooltip);
});

const achievements = [
   { 
        id: "dev1", 
        name: "Developer", 
        description: "Only given to developers.", 
        condition: () => redeemedCodes.has(codes["DEV1"]),
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0m0_Kleki%20(1).png?v=1732126384100", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0m0_Kleki.png?v=1732126372398",
      reward: 15,
    },
  { 
        id: "admin1", 
        name: "Administrator", 
        description: "Only given to admins.", 
        condition: () => redeemedCodes.has(codes["ADMIN1"]),
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0ly_Kleki.png?v=1732126253342", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0ly_Kleki%20(1).png?v=1732126256949",
      reward: 15,
    },
   { 
        id: "Christmas2024Cont", 
        name: "Christmas 2024 Contender", 
        description: "Given to those who competed in the 2024 Christmas Events", 
        condition: () => redeemedCodes.has(codes["Christmas2024Cont"]), // Check if the code is redeemed
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0ls_Kleki.png?v=1732125938194", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0lt_Kleki.png?v=1732125961679",
        reward: 15,
    },
  { 
        id: "humble-start", 
        name: "Humble Start", 
        description: "Purchase 1 worker", 
        condition: () => buildings[0].count >= 1,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0i8_Kleki.png?v=1732031805661", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0ia_Kleki.png?v=1732031916779" ,
       reward: 1,
    },
    { 
        id: "upgrades-people-upgrades", 
        name: "More To The Party", 
        description: "Purchase 10 workers", 
        condition: () => buildings[0].count >= 10,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0ik_Kleki.png?v=1732032531590", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0im_Kleki.png?v=1732032638378",
      reward: 1
    },
    { 
        id: "triple-digits", 
        name: "Triple Digits", 
        description: "Purchase 100 workers", 
        condition: () => buildings[0].count >= 100,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0is_Kleki.png?v=1732032989124", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0is_Kleki%20(1).png?v=1732032994115",
      reward: 3
    },
    { 
        id: "an-investment", 
        name: "An Investment", 
        description: "Purchase 1 factory", 
        condition: () => buildings[1].count >= 1,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kf_Kleki.png?v=1732036533255", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kf_Kleki%20(1).png?v=1732036564876", 
      reward: 1,
    },
    { 
        id: "getting-somewhere", 
        name: "Getting Somewhere", 
        description: "Purchase 10 factories", 
        condition: () => buildings[1].count >= 10,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kh_Kleki.png?v=1732036693869", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kh_Kleki%20(1).png?v=1732036696722" ,
      reward: 1,
    },
    { 
        id: "o2-who", 
        name: "O2 Who?", 
        description: "Purchase 100 factories", 
        condition: () => buildings[1].count >= 100,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kh_Kleki%20(2).png?v=1732036689721", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0ki_Kleki.png?v=1732036687113" ,
      reward: 3,
    },
    { 
        id: "explosive-time", 
        name: "Explosive Time", 
        description: "Purchase 1 dynamite", 
        condition: () => buildings[2].count >= 1,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kp_Kleki.png?v=1732037122181", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kp_Kleki%20(1).png?v=1732037142779" ,
      reward: 1,
    },
    { 
        id: "tnt-dynamite", 
        name: "TNT, DYNAMITE!", 
        description: "Purchase 10 dynamite", 
        condition: () => buildings[2].count >= 10,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kp_Kleki%20(2).png?v=1732037212318", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kq_Kleki.png?v=1732037217332" ,
      reward: 1,
    },
    { 
        id: "enough-to-blow", 
        name: "Enough to blow", 
        description: "Purchase 100 dynamite", 
        condition: () => buildings[2].count >= 100,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kq_Kleki%20(1).png?v=1732037230407", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0kq_Kleki%20(2).png?v=1732037220279", 
      reward: 5,
    },
    { 
        id: "lets-get-drilling", 
        name: "Let's Get Drilling", 
        description: "Purchase 1 drill", 
        condition: () => buildings[3].count >= 1,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0lz_Kleki.png?v=1731953465422", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l3_Kleki.png?v=1732037972179",
      reward: 1,
    },
    { 
        id: "off-to-china", 
        name: "Off to China!", 
        description: "Purchase 10 drills", 
        condition: () => buildings[3].count >= 10,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0lz_Kleki.png?v=1731953465422", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l3_Kleki.png?v=1732037972179",
      reward: 1,
    },
    { 
        id: "minertest", 
        name: "MinerTest", 
        description: "Purchase 100 drills", 
        condition: () => buildings[3].count >= 100,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_18_0lz_Kleki.png?v=1731953465422", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l3_Kleki.png?v=1732037972179",
      reward: 10
    },
   { 
        id: "crystalstart", 
        name: "Crystal Clear Start", 
        description: "Purchase your first crystal building", 
        condition: () => buildings[4].count >= 1,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0le_Kleki.png?v=1732125057868", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0lf_Kleki.png?v=1732125101840",
      reward: 15
    },
     { 
        id: "crystalstart2", 
        name: "Crystals Glore", 
        description: "Purchase 10 crystal workers", 
        condition: () => buildings[4].count >= 10,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0li_Kleki.png?v=1732125262856", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0li_Kleki%20(1).png?v=1732125288366",
      reward: 15
    },
  { 
        id: "crystalholy", 
        name: "Crystal Army", 
        description: "Purchase 100 crystal workers", 
        condition: () => buildings[4].count >= 100,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0lp_Kleki.png?v=1732125698165", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_20_0lp_Kleki%20(1).png?v=1732125701178",
      reward: 15
    },
    { 
        id: "first-10-bands", 
        name: "First 10 Bands", 
        description: "Achieve a total of 10 K coins", 
        condition: () => coins >= 10000,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l5_Kleki.png?v=1732038108253", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l5_Kleki%20(1).png?v=1732038112502",
      reward: 1,
    },
    { 
        id: "first-100", 
        name: "First 100", 
        description: "Achieve a total of 100 K coins", 
        condition: () => coins >= 100000,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l5_Kleki.png?v=1732038108253", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l5_Kleki%20(1).png?v=1732038112502",
      reward: 2,
    },
    { 
        id: "millionaire", 
        name: "Millionaire", 
        description: "Achieve a total of 1M coins", 
        condition: () => coins >= 1000000,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l5_Kleki.png?v=1732038108253", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l5_Kleki%20(1).png?v=1732038112502",
      reward: 5,
    },
  { 
        id: "billionaire", 
        name: "Billionarie", 
        description: "Achieve a total of 1B coins", 
        condition: () => coins >= 1000000000,
        normalIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l5_Kleki.png?v=1732038108253", 
        achievedIcon: "https://cdn.glitch.global/e139b1ac-9ba2-4b0d-909b-e0a3617dc4f6/2024_11_19_0l5_Kleki%20(1).png?v=1732038112502",
      reward: 15,
    },
  
];


// Unlocked achievements
let unlockedAchievements = new Set();
const codes = { 
  "Christmas2024Cont": { code: "XMAS2024", redeemable: true },
  "admin1": { code: "ADMIN1", redeemable: false },
  "dev1": { code: "DEV1", redeemable: true },
};
let redeemedCodes = new Set();

// Function to show a notification
function showNotification(message) {
    const container = document.getElementById('notification-container');

    // Create a new notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <div class="message">${message}</div>
        <div class="notification-progress"></div>
    `;
    container.appendChild(notification);

    // Slide in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    // Automatically remove after duration
    setTimeout(() => {
        // Slide out
        notification.style.transform = 'translateX(120%)';
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);

    // Limit to 5 notifications
    const notifications = container.querySelectorAll('.notification');
    if (notifications.length > 5) {
        notifications[0].remove();
    }
}
document.getElementById("redeem-button").addEventListener("click", function () {
    const enteredCode = document.getElementById("redeem-input").value.trim();

    // Find the matching achievement key
    const matchingAchievement = Object.keys(codes).find(id => codes[id].code === enteredCode);

    if (matchingAchievement) {
        if (codes[matchingAchievement].redeemable) {
            redeemedCodes.add(enteredCode); // Store redeemed code
            checkAchievements(); // Re-check conditions
            showNotification("Code redeemed! Achievement status updated.");
        } else {
            showNotification("This code cannot be redeemed.");
        }
    } else {
        showNotification("Invalid code. Please try again.");
    }
});


// Function to check achievements
function checkAchievements() {
    achievements.forEach(achievement => {
        if (!unlockedAchievements.has(achievement.id) && achievement.condition()) {
            unlockedAchievements.add(achievement.id);
            updateAchievementIcon(achievement, true);

            // Add UP reward if defined
            const reward = achievement.reward || 0;
            up += reward;

            // Show notification with UP reward
            showNotification(`Achievement Unlocked: ${achievement.name} [+${reward} UP]`);
        }
    });
}
// Function to update an achievement's icon based on completion
function updateAchievementIcon(achievement, isAchieved) {
    const achievementElem = document.getElementById(`achievement-${achievement.id}`);
    const img = achievementElem.querySelector('img');
    if (isAchieved) {
        achievementElem.classList.add('completed');
        img.src = achievement.achievedIcon;
    } else {
        img.src = achievement.normalIcon;
    }
}

// Function to initialize all achievements in the grid
function initializeAchievementsGrid() {
    const grid = document.getElementById('achievement-grid');
    achievements.forEach(achievement => {
        const achievementElem = document.createElement('div');
        achievementElem.classList.add('achievement');
        achievementElem.id = `achievement-${achievement.id}`;
        achievementElem.innerHTML = `
            <img src="${achievement.normalIcon}" alt="${achievement.name}" />
            <div class="tooltip">
                <strong>${achievement.name}</strong><br>
                ${achievement.description}
                <p>Reward: ${achievement.reward} UP</p>
            </div>
        `;
        grid.appendChild(achievementElem);

        // Set initial icon based on completion status
        const isAchieved = unlockedAchievements.has(achievement.id);
        updateAchievementIcon(achievement, isAchieved);
    });
}

// Initialize the achievements grid on page load
initializeAchievementsGrid();

// Example: Call `checkAchievements` after significant game events
setInterval(checkAchievements, 1000); // Adjust as needed

function showSettingsSubTab(subTabId) {
    const subTabs = document.querySelectorAll('.settings-content');
    subTabs.forEach(subTab => subTab.classList.add('hidden'));
    document.getElementById(subTabId).classList.remove('hidden');
}

function toggleDarkMode() {
    const darkModeEnabled = document.getElementById('darkModeToggle').checked;
    document.body.style.backgroundColor = darkModeEnabled ? '#1c1c1c' : '#ffffff';
    document.body.style.color = darkModeEnabled ? '#f5f5f5' : '#000000';
}

function resetGameData() {
    if (confirm('Are you sure you want to reset your game data?')) {
        // Reset game data logic here
        alert('Game data has been reset.');
    }
}

  
// Function to show a tab
function showTab(tabName, button) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).style.display = 'block';
    button.classList.add('active');
}

// Initial setup to show the first tab and generate buildings
document.querySelector('.tab-button').click();
generateBuildings();

// Increment coin generation over time
setInterval(() => {
    buildings.forEach(building => {
        coins += building.count * building.production;
    });
    updateCurrencyDisplay();
}, 1000);

updateCurrencyDisplay();
  generateUpgrades();
