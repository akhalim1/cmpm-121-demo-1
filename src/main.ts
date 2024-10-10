// testing comment
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing clicker game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// define variables
let counter: number = 0;
let growthRate: number = 0;
const itemsPurchased: { A: number; B: number; C: number } = {
  A: 0,
  B: 0,
  C: 0,
};

const initialCosts: { A: number; B: number; C: number } = {
  A: 10,
  B: 100,
  C: 1000,
};

const currentCosts = { ...initialCosts };

// displays here
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} swords`;
app.append(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `${growthRate.toFixed(2)} cookies/sec`;
app.append(growthRateDiv);

const purchasedItemsDiv = document.createElement("div");
purchasedItemsDiv.textContent = `Purchased: A - ${itemsPurchased.A} times, B - ${itemsPurchased.B} times, C- ${itemsPurchased.C} times`;
app.append(purchasedItemsDiv);

// helper functions here
const updateDisplays = () => {
  counterDiv.textContent = `${counter} swords`;
  growthRateDiv.textContent = `${growthRate.toFixed(2)} cookies/sec`;
  purchasedItemsDiv.textContent = `Purchased: A - ${itemsPurchased.A} times, B - ${itemsPurchased.B} times, C- ${itemsPurchased.C} times`;
};

// click
const button = document.createElement("button");
button.textContent = "⚔️ Click";
button.addEventListener("click", () => {
  // console.log("Clicked");
  counter += 1;
  counterDiv.textContent = `${counter} swords`;

  /*
  if (counter >= 10) {
    upgradeButton.disabled = false;
  }
  */
});

app.append(button);

// function to make upgrade button
const createUpgradeButton = (
  label: string,
  cost: number,
  rate: number,
  upgradeType: keyof typeof itemsPurchased
) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `Purchase ${label} | Reward: +${rate} growth rate | Cost: ${cost} Swords`;
  upgradeButton.disabled = true;

  upgradeButton.addEventListener("click", () => {
    const currentCost = currentCosts[upgradeType];

    if (counter >= currentCost) {
      counter -= currentCost;
      growthRate += rate;
      itemsPurchased[upgradeType] += 1;
      currentCosts[upgradeType] *= 1.15;

      upgradeButton.textContent = `Purchase ${label} | Reward: +${rate} growth rate | Cost: ${currentCosts[upgradeType].toFixed(2)} Swords`;

      updateDisplays();
    }
  });

  app.append(upgradeButton);

  const checkUpgradeAvaiability = () => {
    if (counter < currentCosts[upgradeType]) {
      upgradeButton.disabled = true;
    } else {
      upgradeButton.disabled = false;
    }
  };

  return { button: upgradeButton, checkUpgradeAvaiability };
};

const upgradeA = createUpgradeButton("Upgrade A", currentCosts.A, 0.1, "A");
const upgradeB = createUpgradeButton("Upgrade B", currentCosts.B, 2, "B");
const upgradeC = createUpgradeButton("Upgrade C", currentCosts.C, 50, "C");

const checkAllUpgrades = () => {
  upgradeA.checkUpgradeAvaiability();
  upgradeB.checkUpgradeAvaiability();
  upgradeC.checkUpgradeAvaiability();
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
