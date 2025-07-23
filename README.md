# 📋 Clipboard Drive Sync - Chrome Extension

This Chrome extension allows you to **copy text to your clipboard** and **sync it across all your devices** using your **Google Drive** account.

## 🚀 Features

- ✅ Copy clipboard content and upload it to Google Drive
- ✅ Paste synced content on another device with the same Google ID
- ✅ Works across all Chrome browsers where you install this extension
- ✅ Secure via Google OAuth (no third-party backend)

---

## 🛠️ Setup Instructions

### 1. Enable Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project
3. Enable **Google Drive API**
4. Create **OAuth 2.0 Client ID** for **Chrome App**
5. Add the `client_id` to `manifest.json` (replace `YOUR_OAUTH2_CLIENT_ID`)

### 2. Load the Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the extracted folder

---

## 📂 Folder Structure

```
clipboard-sync/
├── manifest.json
├── background.js
├── popup.html
├── popup.js
└── README.md
```

---

## ✨ Usage

1. Click on the extension icon
2. Use the **Copy** button to read from clipboard and upload to Drive
3. On another device/browser, click **Paste** to retrieve the text and write to clipboard

---

## 🔐 Permissions Used

- `identity` – for Google OAuth authentication
- `clipboardRead` and `clipboardWrite` – to access clipboard
- `storage` – Chrome local storage if needed in future
- Google Drive API scopes:
  - `drive.appdata`
  - `drive.file`

---

## 📎 Notes

- Clipboard content is stored as a text file: `clipboard_sync.txt`
- You can optionally extend it with:
  - 🔐 Encryption
  - 📜 Clipboard history
  - 🔁 Auto-syncing

---

## 📄 License

MIT License
