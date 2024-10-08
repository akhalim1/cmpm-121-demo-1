// testing comment
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing cookie clicker game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "⚔️ Click";
button.addEventListener("click", () => {
  console.log("Clicked");
});

app.append(button);
