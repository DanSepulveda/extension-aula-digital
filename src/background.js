const RELOAD_INTERVAL_MINUTES = 25;
const ALARM_NAME = 'reload';

chrome.runtime.onInstalled.addListener(() => {
  restoreAlarm();
});

chrome.runtime.onStartup.addListener(() => {
  restoreAlarm();
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'SET_AUTO_RELOAD') {
    msg.enabled ? enableReload() : disableReload();
  }
});

function restoreAlarm() {
  chrome.storage.local.get(['reload'], ({ reload }) => {
    if (reload) {
      enableReload();
    }
  });
}

function enableReload() {
  chrome.alarms.clear(ALARM_NAME, () => {
    chrome.alarms.create(ALARM_NAME, {
      periodInMinutes: RELOAD_INTERVAL_MINUTES,
    });
  });
}

function disableReload() {
  chrome.alarms.clear(ALARM_NAME);
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) return;

  const tabs = await chrome.tabs.query({
    url: 'https://auladigital.sence.cl/*',
  });

  if (!tabs.length) return;

  for (const tab of tabs) {
    chrome.tabs.reload(tab.id);
  }
});
