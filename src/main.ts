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

// upgrade button fix here
const setUpgradeButtonText = (
  button: HTMLButtonElement,
  item: Item,
  currentCost: number
) => {
  button.textContent = `Purchase ${item.name} | Reward: +${item.rate} growth rate | Cost: ${currentCost} fish | Desc: ${item.desc}`;
};

const createUpgButtonElement = (item: Item): HTMLButtonElement => {
  const button = document.createElement("button");
  setUpgradeButtonText(button, item, currentCosts[item.name]);
  button.disabled = true;
  return button;
};

const handleUpgradeClick = (item: Item, button: HTMLButtonElement) => {
  const currentCost = currentCosts[item.name];

  if (counter >= currentCost) {
    counter -= currentCost;
    growthRate += item.rate;
    itemsPurchased[item.name] += 1;
    currentCosts[item.name] *= COST_MULTIPLIER;

    setUpgradeButtonText(button, item, currentCosts[item.name]);
    updateDisplays();
  }
};

const checkUpgradeAvaiability = (button: HTMLButtonElement, item: Item) => {
  button.disabled = counter < currentCosts[item.name];
};

const createUpgradeButton = (item: Item) => {
  const button = createUpgButtonElement(item);
  button.addEventListener("click", () => handleUpgradeClick(item, button));
  app.append(button);

  return {
    button,
    checkUpgradeAvaiability: () => checkUpgradeAvaiability(button, item),
  };
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
