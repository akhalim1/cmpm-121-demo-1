// testing comment
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

interface Item {
  name: string;
  cost: number;
  rate: number;
  desc: string;
}

const availableItems: Item[] = [
  { name: "Assistant", cost: 10, rate: 0.1, desc: "Helper to snag more fish." },
  {
    name: "Fishing Boat",
    cost: 100,
    rate: 2,
    desc: "Boat to scoop more fish.",
  },
  {
    name: "Fishing Net",
    cost: 1000,
    rate: 50,
    desc: "Net to catch more fish.",
  },
  {
    name: "Fishing Trawler",
    cost: 2500,
    rate: 250,
    desc: "Big ship to haul in tons of fish.",
  },
  {
    name: "Deep Sea Sonar",
    cost: 5000,
    rate: 1000,
    desc: "Sonar to find rare fish deeper in the ocean.",
  },
];

const gameName = "Fish Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// define variables
let counter: number = 0;
let growthRate: number = 0;

// constants
const COST_MULTIPLIER = 1.15;

const itemsPurchased: { [key: string]: number } = {};
const currentCosts: { [key: string]: number } = {};

availableItems.forEach((item) => {
  itemsPurchased[item.name] = 0;
  currentCosts[item.name] = item.cost;
});

// displays here
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} fish`;
app.append(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `${growthRate.toFixed(2)} fish/sec`;
app.append(growthRateDiv);

const purchasedItemsDiv = document.createElement("div");

const updatePurchasedItemsDisplay = () => {
  purchasedItemsDiv.textContent =
    "Purchased: " +
    availableItems
      .map((item) => `${item.name} - ${itemsPurchased[item.name]} times`)
      .join(", ");
};

app.append(purchasedItemsDiv);

// helper functions here
const updateDisplays = () => {
  counterDiv.textContent = `${counter} fish`;
  growthRateDiv.textContent = `${growthRate.toFixed(2)} fish/sec`;
  updatePurchasedItemsDisplay();
};

// click
const button = document.createElement("button");
button.textContent = "🎣CAST YOUR LINE!";
button.addEventListener("click", () => {
  // console.log("Clicked");
  counter += 1;
  updateDisplays();
  /*
  if (counter >= 10) {
    upgradeButton.disabled = false;
  }
  */
});

app.append(button);

// function to make upgrade button

const createUpgradeButton = (item: Item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `Purchase ${item.name} | Reward: +${item.rate} growth rate | Cost: ${item.cost} fish | Desc: ${item.desc}`;
  upgradeButton.disabled = true;

  upgradeButton.addEventListener("click", () => {
    const currentCost = currentCosts[item.name];

    if (counter >= currentCost) {
      counter -= currentCost;
      growthRate += item.rate;
      itemsPurchased[item.name] += 1;
      currentCosts[item.name] *= COST_MULTIPLIER;

      upgradeButton.textContent = `Purchase ${item.name} | Reward: +${item.rate} growth rate | Cost: ${currentCosts[item.name].toFixed(2)} fish | Desc: ${item.desc}`;

      updateDisplays();
    }
  });

  app.append(upgradeButton);

  const checkUpgradeAvaiability = () => {
    if (counter < currentCosts[item.name]) {
      upgradeButton.disabled = true;
    } else {
      upgradeButton.disabled = false;
    }
  };

  return { button: upgradeButton, checkUpgradeAvaiability };
};

const upgradeButtons = availableItems.map((item) => createUpgradeButton(item));

const checkAllUpgrades = () => {
  upgradeButtons.forEach((upgrade) => upgrade.checkUpgradeAvaiability());
};

// growth rate
let lastFrameTime = performance.now();

const incrementCounter = (currentTime: DOMHighResTimeStamp) => {
  const value = (currentTime - lastFrameTime) / 1000;
  counter += growthRate * value;

  // counterDiv.textContent = `${counter} swords`;
  updateDisplays();
  checkAllUpgrades();

  lastFrameTime = currentTime;
  requestAnimationFrame(incrementCounter);
};

requestAnimationFrame(incrementCounter);
