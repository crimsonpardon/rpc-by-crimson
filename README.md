# rpc-by-crimson

> A Discord Rich Presence & token utility tool built by [crimsonpardon](https://github.com/crimsonpardon).

---

## ✨ Features

- 🎮 Custom Discord Rich Presence (RPC) support
- 🔑 Token-based session management
- 🟢 Online / Idle / DND / Invisible status control
- 💬 Custom status text & emoji setter
- 🖥️ PC, Mobile & Web platform spoofing
- ⚡ Lightweight & fast — no bloat

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A Discord user token

### Installation

```bash
# Clone the repository
git clone https://github.com/crimsonpardon/rpc-by-crimson.git

# Navigate into the project
cd rpc-by-crimson

# Install dependencies
npm install
```

### Usage

```bash
npm start
```

---

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_token_here
STATUS=online
CUSTOM_STATUS=Built by Crimson 💎
```

---

## 📁 Project Structure

```
rpc-by-crimson/
├── src/
│   ├── index.js        # Entry point
│   ├── rpc.js          # RPC handler
│   └── status.js       # Status manager
├── .env.example
├── package.json
└── README.md
```

---

## ⚠️ Disclaimer

This project uses a Discord user token. Self-botting is against [Discord's Terms of Service](https://discord.com/terms). Use at your own risk. The author is not responsible for any account actions taken by Discord.

---

## 👤 Author

**crimsonpardon**
- GitHub: [@crimsonpardon](https://github.com/crimsonpardon)

---

## 📄 License

This project is for personal use only. All rights reserved © crimsonpardon.
