// Global variable declarations
var musicEnabled = true;

// Site list declaration
const siteList = [
  "aliexpress",
  "alibaba",
  "amazon",
  "mediamarkt",
  "ebay"
];

// Music object
const musicObject = new Audio();
musicObject.volume = .5;
musicObject.loop = true;
musicObject.src = '/public/music/wii-shop-theme.ogg';

// Music controller
const musicController = (tab, action) => {
  if (action === 'pause') return musicObject.pause();
  siteList.forEach((site) => {
    if (tab.includes(site)) {
      if (action === 'play') return musicObject.play();
    }
  });
};

// Event listener for active tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      tabs.forEach(tab => musicController(tab.url, 'play'));
    });
  }
});

// Event listener for tab close or inactivity
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    tabs.forEach(tab => musicController(tab.url, 'pause'));
  });
});