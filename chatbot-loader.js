document.addEventListener("DOMContentLoaded", function () {
  // ===========================
  // 1️⃣ Floating WA Button
  // ===========================
  const chatButton = document.createElement("button");
  chatButton.id = "chat-toggle";
  chatButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 448 512" fill="white">
      <path d="M380.9 97.1C339-3 250-22 178.3 28.1S30.3 122.8 24 208.3c-4.8 58.1 19.4 114.3 62.5 156.5L24 488l123.1-63.5c41.2 22.5 88.2 27.1 132.5 12.6 78.5-23.7 133.4-99.3 133.4-187.3 0-49.3-19.2-95.6-53.1-129.2zM224 404c-31.3 0-62-7.3-89-21.1l-6.3-3.3-73.5 38 15.6-72.1-4.1-6.4C49.1 312.8 40 280.3 40 248c0-97.2 78.8-176 176-176 46.9 0 90.9 18.3 124 51.6 33.2 33.2 51.5 77.2 51.5 124.1 0 97.1-78.8 176-176 176zm101.2-138.3c-5.6-2.8-33-16.3-38.1-18.1-5-1.8-8.6-2.8-12.2 2.8s-14 18.1-17.2 21.9c-3.1 3.8-6.3 4.3-11.7 1.5-31.2-15.6-51.6-27.9-72.4-63.1-5.4-9.3 5.4-8.6 15.3-28.7 1.7-3.1 .9-5.6-.5-7.8-1.4-2.3-12.2-29.3-16.7-40.2-4.4-10.5-8.9-9.1-12.2-9.3-3.1-.2-6.7-.2-10.3-.2s-7.5 1.1-11.4 5.6c-3.8 4.4-14.6 14.3-14.6 34.9 0 20.5 14.9 40.3 16.9 43.1 2 2.8 29.3 44.7 70.9 62.7 9.9 4.3 17.6 6.9 23.6 8.8 9.9 3.2 18.9 2.8 26 1.7 7.9-1.2 33-13.5 37.6-26.6 4.6-13.1 4.6-24.4 3.2-26.6-1.4-2.2-5.1-3.5-10.7-6.3z"/>
    </svg>
  `;
  document.body.appendChild(chatButton);

  // Tooltip WA
  const chatTooltip = document.createElement("div");
  chatTooltip.id = "chat-tooltip";
  chatTooltip.innerHTML = `Halo, ada yang bisa kami bantu? 👋`;
  document.body.appendChild(chatTooltip);

  // ===========================
  // 2️⃣ Chat Container
  // ===========================
  const chatbot = document.createElement("div");
  chatbot.id = "chatbot";
  chatbot.innerHTML = `
    <div class="chat-header">PT GABE JAI PRO</div>
    <div class="chat-body" id="chat-body">
      <div class="chat-bubble bot">
        Selamat datang di <b>PT GABE JAI PRO!</b> Saya siap membantu Anda 😊
      </div>
      <div class="chat-bubble bot action">
        <a href="https://wa.me/62811725545?text=Halo%20saya%20mau%20info%20properti" 
           target="_blank" class="wa-button">💬 Lanjutkan ke WhatsApp</a>
      </div>
    </div>
    <div class="chat-footer">
      <input type="text" id="chat-input" placeholder="Tanya tentang properti..." />
      <button id="send-btn">➤</button>
    </div>
  `;
  document.body.appendChild(chatbot);

  // ===========================
  // 3️⃣ Toggle Chat
  // ===========================
  chatButton.addEventListener("click", () => {
    chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
    chatTooltip.style.display = "none";
  });

  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  // ===========================
  // 4️⃣ Predefined Static Replies
  // ===========================
  const replies = {
    harga: "Harga rumah bervariasi, mulai dari Rp 166 juta sampai Rp 3,2 M, tergantung tipe dan lokasi.",
    lokasi: "Kami berlokasi di Lampung Selatan, dekat fasilitas umum dan akses strategis.",
    kpr: "Kamu bisa menggunakan fitur simulasi KPR di website atau hubungi marketing kami untuk info lebih lanjut.",
    default: "Terima kasih sudah menghubungi PT GABE JAI PRO. Untuk info lebih lanjut, silakan chat WA."
  };

  function addMessage(sender, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes("harga")) return replies.harga;
    if (msg.includes("lokasi")) return replies.lokasi;
    if (msg.includes("kpr")) return replies.kpr;
    return replies.default;
  }

  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    addMessage("user", message);
    chatInput.value = "";

    // Simulasi delay
    addMessage("bot", "🤖 Memproses...");
    setTimeout(() => {
      const botReply = getReply(message);
      const lastBot = chatBody.querySelector(".chat-bubble.bot:last-child");
      if (lastBot) lastBot.innerHTML = botReply;
    }, 800);
  }

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
