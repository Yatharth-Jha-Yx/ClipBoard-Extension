# 📋 Clipboard Drive Sync - Chrome Extension

A lightweight Chrome extension that lets you copy text from your clipboard, store it securely on your Google Drive, and access it from any other device using the same Google account and extension. Perfect for seamless clipboard sharing across desktop and laptop devices.

---

## ✅ What This Extension Does

- Copies your current clipboard text.
- Saves the clipboard data to your Google Drive as a text file (`clipboard_sync.txt`).
- On any other Chrome browser where you're signed in with the same Google account, you can paste the content from Drive back into your clipboard.
- Great for syncing clipboard text across different machines without needing a third-party sync app.

---

## 💡 Where This Extension Works

| Platform         | Supported |
|------------------|-----------|
| Windows          | ✅ Yes    |
| macOS            | ✅ Yes    |
| Linux            | ✅ Yes    |
| Chrome OS        | ✅ Yes    |
| Android (via Kiwi Browser with Extension Support) | ⚠️ Experimental |
| iOS              | ❌ No (iOS Chrome doesn't support extensions) |

> ⚠️ **Note**: This is a Chrome extension, so it will only work in browsers that support Chrome Extensions (like Google Chrome, Brave, Edge, or Kiwi Browser on Android). Not supported on Safari or Firefox.

---

## 🔐 Requirements

1. Google Chrome (or compatible browser with extension support)
2. A Google Account
3. Internet connection
4. Permissions for:
   - Clipboard access (read/write)
   - Google OAuth for Drive
   - Identity and storage access

---

## 🛠 Setup Instructions

### 1. Enable Google Drive API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Google Drive API** for your project
4. Create an **OAuth 2.0 Client ID**
   - Application Type: "Chrome App"
   - Add your extension ID in the "Authorized JavaScript origins" (You can use `chrome.identity.getRedirectURL()` to find it)
5. Copy the `client_id` and replace `YOUR_OAUTH2_CLIENT_ID` in the `manifest.json`

### 2. Load the Extension in Chrome

1. Download or clone this repository
2. Open `chrome://extensions` in your Chrome browser
3. Enable **Developer Mode** (top-right corner)
4. Click **Load Unpacked**
5. Select the extension folder (e.g., `clipboard-sync/`)

---

## 🔘 How to Use

1. Click the Clipboard Drive Sync extension icon in the Chrome toolbar.
2. Click **"Copy"** – it will grab your current clipboard text and upload it to Google Drive.
3. On another Chrome browser (on another device), with the same extension and Google account:
   - Click **"Paste"** – it will fetch the last copied text from Google Drive and insert it into your local clipboard.

---

## 🔐 Permissions Explained

- `clipboardRead`, `clipboardWrite`: Access your system clipboard.
- `identity`: Authenticate with your Google account.
- `storage`: Optional (for future support of local clipboard history).
- `https://www.googleapis.com/`: Required to use Google Drive API.
