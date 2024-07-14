/**
 * Mostly copied from https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/userScripts
 */

const USER_SCRIPT_ID = 'default';
const SAVE_BUTTON_ID = 'save-button';

const FORM_ID = 'settings-form';
const FORM = document.getElementById(FORM_ID);

const SCRIPT_TEXTAREA_NAME = 'custom-json';

async function updateUi() {
  const { json } = await chrome.storage.local.get({
    json: "[]"
  });

  // Update UI with current values.
  FORM.elements[SCRIPT_TEXTAREA_NAME].value = json;
}

async function onSave() {
  const json = FORM.elements[SCRIPT_TEXTAREA_NAME].value;

  chrome.storage.local.set({
    json
  });
}

updateUi();
chrome.storage.local.onChanged.addListener(updateUi);
document.getElementById(SAVE_BUTTON_ID).addEventListener('click', onSave);