const socket = io();

document.addEventListener("DOMContentLoaded", () => {
   const usernameInput = document.getElementById("username");
   const setUsernameButton = document.getElementById("set-username");
   const messageContainer = document.getElementById("message-container");
   const input = document.getElementById("input");
   const sendButton = document.getElementById("send");

   let username = localStorage.getItem("username") || "";

   function setUsername() {
      username = usernameInput.value.trim();
      if (username) {
         localStorage.setItem("username", username);
         socket.emit("setUsername", username); // Send username to server
         usernameInput.value = "";
         alert(`Username set to: ${username}`);
      } else {
         alert("Please enter a username.");
      }
   }

   setUsernameButton.addEventListener("click", setUsername);

   sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      const messageText = input.value.trim();
      if (messageText && username) {
         socket.emit("chatMessage", messageText); // Send message to server
         input.value = "";
      } else if (!username) {
         alert("Please set a username first.");
      }
   });

   socket.on("chatMessage", (data) => {
      const message = document.createElement("div");
      message.classList.add("message");
      message.innerHTML = `<span class="sender">${data.user}:</span> ${data.text}`;
      messageContainer.appendChild(message);
      messageContainer.scrollTop = messageContainer.scrollHeight;
   });
});
