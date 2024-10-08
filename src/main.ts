// testing comment
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing cookie clicker game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;

const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} swords`;
app.append(counterDiv);

const button = document.createElement("button");
button.textContent = "⚔️ Click";
button.addEventListener("click", () => {
  // console.log("Clicked");
  counter += 1;
  counterDiv.textContent = `${counter} swords`;
});

app.append(button);
