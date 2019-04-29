/*
 *  Copyright 2018 - 2019 Mitsuha Kitsune <https://mitsuhakitsune.com>
 *  Licensed under the MIT license.
 *
 *  Custom class to apply polyfills without dependencies
 *  and offer crossbrowser compatibility
 */

var browser = require('webextension-polyfill');

class Browser {
  constructor() {
    this.browser = null;
  }

  isBackgroundScript(script) {
    return new Promise((resolve) => {
      browser.runtime.getBackgroundPage().then((backgroundPage) => resolve(script === backgroundPage));

      return false;
    });
  }

  getPersistentStates() {
    return new Promise((resolve, reject) => {
      browser.storage.local
        .get('@@vwe-persistence')
        .then((data) => {
          if (data['@@vwe-persistence']) {
            return resolve(data['@@vwe-persistence']);
          }

          return resolve(null);
        })
        .catch((err) => {
          reject(err);
        });

      return false;
    });
  }

  savePersistentStates(datas) {
    browser.storage.local
      .set({
        '@@vwe-persistence': datas
      })
      .catch(() => {
        throw new Error(`Vuex WebExtensions: Can't write persistent states to local storage. Did you grant storage permission to your WebExtension?`);
      });
  }

  handleConnection(callback) {
    return browser.runtime.onConnect.addListener(callback);
  }

  connectToBackground(connectionName) {
    return browser.runtime.connect({
      name: connectionName
    });
  }
}

export default Browser;
