const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

let history = [];

sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    history.push({ role: "user", text: userMessage });
    displayMessage(history);
    userInput.value = "";

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userMessage }),
    });

    const data = await response.json();
    console.log(data);
    history.push({ role: "bot", text: data.answer });
    displayMessage(history);
  }
});

function displayMessage(messages) {
  chatContainer.innerHTML = "";
  messages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    const messageHeader = document.createElement("div");
    messageHeader.classList.add("message-header");
    messageHeader.textContent = message.role === "user" ? "You" : "Bot";
    messageElement.appendChild(messageHeader);

    const messageContent = document.createElement("div");
    messageContent.innerHTML = convertMarkdownToHTML(message.text);
    messageElement.appendChild(messageContent);

    chatContainer.appendChild(messageElement);
  });
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function convertMarkdownToHTML(markdownText) {
  const htmlText = markdownText
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<li>$1</li>")
    .replace(/\n/g, "<br>");
  return htmlText;
}
