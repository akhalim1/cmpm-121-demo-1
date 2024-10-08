// testing comment
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing clicker game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
let growthRate: number = 0;

const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} swords`;
app.append(counterDiv);

const button = document.createElement("button");
button.textContent = "⚔️ Click";
button.addEventListener("click", () => {
  // console.log("Clicked");
  counter += 1;
  counterDiv.textContent = `${counter} swords`;

  if (counter >= 10) {
    upgradeButton.disabled = false;
  }
});

app.append(button);

const upgradeButton = document.createElement("button");
upgradeButton.textContent =
  "Purchase Upgrade | Reward: +1 growth rate | Cost: 10 Swords";
upgradeButton.disabled = true;

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;

    if (counter <= 0) {
      upgradeButton.disabled = true;
    } else {
      upgradeButton.disabled = false;
    }
  }
});

app.append(upgradeButton);

let lastFrameTime = performance.now();

const incrementCounter = (currentTime: DOMHighResTimeStamp) => {
  const value = (currentTime - lastFrameTime) / 1000;
  counter += growthRate * value;

  counterDiv.textContent = `${counter} swords`;

  lastFrameTime = currentTime;
  requestAnimationFrame(incrementCounter);
};

requestAnimationFrame(incrementCounter);
