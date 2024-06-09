// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const USER_SCRIPT_ID = 'default';
const SAVE_BUTTON_ID = 'save-button';

const FORM_ID = 'settings-form';
const FORM = document.getElementById(FORM_ID);

const TYPE_INPUT_NAME = 'type';
const SCRIPT_TEXTAREA_NAME = 'custom-script';

const CONTENT_SCRIPTS = [
  'content-scripts/tool-tip.js',
  'content-scripts/add-style.js'
];

/**
 * Checks if the user has developer mode enabled, which is required to use the
 * User Scripts API.
 *
 * @returns If the chrome.userScripts API is available.
 */
function isUserScriptsAvailable() {
  try {
    // Property access which throws if developer mode is not enabled.
    chrome.userScripts;
    return true;
  } catch {
    // Not available, so hide UI and show error.
    document.getElementById('warning').style.display = 'block';
    FORM.style.display = 'none';
    return false;
  }
}

async function updateUi() {
  if (!isUserScriptsAvailable()) return;

  // Access settings from storage with default values.
  const { type, script } = await chrome.storage.local.get({
    type: 'file',
    script: "alert('hi');"
  });

  // Update UI with current values.
  FORM.elements[TYPE_INPUT_NAME].value = type;
  FORM.elements[SCRIPT_TEXTAREA_NAME].value = script;
}

async function addContentScripts() {
  const existingScripts = await chrome.userScripts.getScripts({
    ids: [USER_SCRIPT_ID]
  });

  const updateScripts = existingScripts.length > 0 ? chrome.userScripts.update : chrome.userScripts.register;
  const scripts = CONTENT_SCRIPTS.map(i => ({ file: i }));

  console.log(CONTENT_SCRIPTS);
  console.log(scripts);

  await updateScripts([
    {
      id: USER_SCRIPT_ID,
      matches: ['<all_urls>'],
      js: scripts
    }
  ]);

}

async function onSave() {
  if (!isUserScriptsAvailable()) return;

  // Get values from form.
  const type = FORM.elements[TYPE_INPUT_NAME].value;
  const script = FORM.elements[SCRIPT_TEXTAREA_NAME].value;

  // Save to storage.
  chrome.storage.local.set({
    type,
    script
  });

  addContentScripts();
}

// Update UI immediately, and on any storage changes.
addContentScripts();
updateUi();
chrome.storage.local.onChanged.addListener(updateUi);

// Register listener for save button click.
document.getElementById(SAVE_BUTTON_ID).addEventListener('click', onSave);
