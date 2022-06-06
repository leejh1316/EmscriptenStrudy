chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    focused: true,
    type: "popup",
    url: "popup.html",
    width: 450,
    height: 600,
    top: 0,
    left: 0,
  });
});
