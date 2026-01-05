const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

/* Auto-grow textarea */
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

/* Enter to send */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener("click", sendMessage);

function addMessage(text, role) {
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

/* Simulated streaming */
function streamResponse(element, text) {
  let i = 0;
  sendBtn.disabled = true;

  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    chat.scrollTop = chat.scrollHeight;

    if (i >= text.length) {
      clearInterval(interval);
      sendBtn.disabled = false;
    }
  }, 25);
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  input.style.height = "auto";

  const assistantBubble = addMessage("", "assistant");

  const fakeResponse =
    "Hello \n"+
    "Welcome to 100 days of Web devlopment";

  streamResponse(assistantBubble, fakeResponse);
}
