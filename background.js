chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "save") {
    await saveToDrive(message.data);
    sendResponse({ success: true });
  } else if (message.action === "load") {
    const data = await loadFromDrive();
    sendResponse({ data });
  }
  return true;
});

async function getAuthToken() {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      resolve(token);
    });
  });
}

async function saveToDrive(data) {
  const token = await getAuthToken();

  const metadata = {
    name: "clipboard_sync.txt",
    mimeType: "text/plain"
  };

  const boundary = "foo_bar_baz";
  const delimiter = `\r\n--${boundary}\r\n`;
  const close_delim = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: text/plain\r\n\r\n" +
    data +
    close_delim;

  await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": `multipart/related; boundary=${boundary}`
    },
    body: multipartRequestBody
  });
}

async function loadFromDrive() {
  const token = await getAuthToken();

  const listResponse = await fetch("https://www.googleapis.com/drive/v3/files?q=name='clipboard_sync.txt'", {
    headers: { Authorization: "Bearer " + token }
  });
  const listData = await listResponse.json();
  const fileId = listData.files?.[0]?.id;
  if (!fileId) return "";

  const contentResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: "Bearer " + token }
  });

  return await contentResponse.text();
}
