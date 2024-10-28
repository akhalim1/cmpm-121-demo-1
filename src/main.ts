// testing comment
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// defining upgrade items
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

// game state variables
let counter: number = 0;
let growthRate: number = 0;

const COST_MULTIPLIER = 1.15;

const itemsPurchased: { [key: string]: number } = {};
const currentCosts: { [key: string]: number } = {};

availableItems.forEach((item) => {
  itemsPurchased[item.name] = 0;
  currentCosts[item.name] = item.cost;
});

// creating display elements
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter.toFixed(2)} fish`;
app.append(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `${growthRate.toFixed(2)} fish/sec`;
app.append(growthRateDiv);

const purchasedItemsDiv = document.createElement("div");

// Update purchase items display
const updatePurchasedItemsDisplay = () => {
  purchasedItemsDiv.textContent =
    "Purchased: " +
    availableItems
      .map((item) => `${item.name} - ${itemsPurchased[item.name]} times`)
      .join(", ");
};

app.append(purchasedItemsDiv);

const updateDisplays = () => {
  counterDiv.textContent = `${counter} fish`;
  growthRateDiv.textContent = `${growthRate.toFixed(2)} fish/sec`;
  updatePurchasedItemsDisplay();
};

// Manual fish clicking
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("manual-clicker-container");

const button = document.createElement("button");
button.classList.add("manual-clicker");
button.innerHTML = "<span class='reel'>🎣</span>";

button.addEventListener("click", () => {
  const reel = button.querySelector(".reel") as HTMLElement | null;

  if (reel) {
    reel?.classList.remove("animate-reel");
    void reel?.offsetWidth;
    reel?.classList.add("animate-reel");
  }

  counter += 1;
  updateDisplays();
});

buttonContainer.append(button);
app.append(buttonContainer);

// functions to manage upgrade buttons
const setUpgradeButtonText = (
  button: HTMLButtonElement,
  item: Item,
  currentCost: number
) => {
  button.textContent = `Purchase ${item.name} | Reward: +${item.rate} growth rate | Cost: ${currentCost.toFixed(2)} fish | Desc: ${item.desc}`;
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

// automatic fish collection based on growth rate
let lastFrameTime = performance.now();

const incrementCounter = (currentTime: DOMHighResTimeStamp) => {
  const value = (currentTime - lastFrameTime) / 1000;
  counter += growthRate * value;
  updateDisplays();
  checkAllUpgrades();

  lastFrameTime = currentTime;
  requestAnimationFrame(incrementCounter);
};

requestAnimationFrame(incrementCounter);
