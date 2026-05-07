const FILE_NAME = "clipboard_sync.txt";
const DRIVE_FILES_URL = "https://www.googleapis.com/drive/v3/files";
const DRIVE_UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3/files";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Clipboard Drive Sync extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "save") {
    saveToGoogleDrive(request.data)
      .then(sendResponse)
      .catch(err => sendResponse({ success: false, error: err.message }));
  } else if (request.action === "load") {
    loadFromGoogleDrive()
      .then(sendResponse)
      .catch(err => sendResponse({ success: false, error: err.message }));
  }
  return true;
});

function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(token);
      }
    });
  });
}

async function findFileId(token) {
  const response = await fetch(
    `${DRIVE_FILES_URL}?q=name="${FILE_NAME}"&spaces=drive&fields=files(id)`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!response.ok) throw new Error(`Drive query failed: ${response.status}`);
  const result = await response.json();
  return result.files?.length > 0 ? result.files[0].id : null;
}

async function saveToGoogleDrive(data) {
  const token = await getAuthToken();
  const boundary = "clipboard_sync_boundary";
  const metadata = { name: FILE_NAME, mimeType: "text/plain" };

  const multipartBody =
    `--${boundary}\r\n` +
    `Content-Type: application/json\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/plain\r\n\r\n` +
    `${data}\r\n` +
    `--${boundary}--`;

  const existingId = await findFileId(token);
  const url = existingId
    ? `${DRIVE_UPLOAD_URL}/${existingId}?uploadType=multipart`
    : `${DRIVE_UPLOAD_URL}?uploadType=multipart`;

  const response = await fetch(url, {
    method: existingId ? "PATCH" : "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/related; boundary="${boundary}"`,
    },
    body: multipartBody,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Upload failed: ${response.status}`);
  }

  return { success: true };
}

async function loadFromGoogleDrive() {
  const token = await getAuthToken();
  const fileId = await findFileId(token);

  if (!fileId) {
    return { success: false, error: "No clipboard found on Drive. Copy something first." };
  }

  const response = await fetch(
    `${DRIVE_FILES_URL}/${fileId}?alt=media`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }

  const data = await response.text();
  return { success: true, data };
}
