import * as Log from './Log.js'

let localStorageEnabled = false;
let indexedStorageEnabled = false;
let GPATH = "";

const LAST_GAME_KEY = "prLastGame";
const SAVE_COUNT = 8;

function checkLocalStorageAvailable() {
    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        localStorageEnabled = true;
        Log.info("Local storage is available.");
    } catch (e) {
        Log.info("Local storage is not available.");
    }
}

function checkIndexedDbAvailable() {
    if (!window.indexedDB) {
        window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    }
    if (!window.IDBTransaction) {
        window.IDBTransaction = window.webkitIDBTransaction || window.msIDBTransaction;
    }
    if (!window.IDBKeyRange) {
        window.IDBKeyRange = window.webkitIDBKeyRange || window.msIDBKeyRange;
    }

    if (window.indexedDB) {
        let dbReq = window.indexedDB.open('test', 1);
        dbReq.onsuccess = function (event) {
            indexedStorageEnabled = true;
        }
    }
}

function getLastGame() {
    return readValue(LAST_GAME_KEY);
}

function setLastGame(key) {
    writeValue(LAST_GAME_KEY, key);
}

function writeValue(name, value) {
    if (!localStorageEnabled) {
        Log.info("Unable to write '" + name + "', local storage disabled.");
        return false;
    }

    try {
        localStorage.setItem(name, value);
    } catch (e) {
        Log.error("An error occurred attempting to save '" + name + "': " + e);
        return false;
    }
    return true;
}

function readValue(name) {
    if (!localStorageEnabled) {
        Log.info("Unable to read '" + name + "', local storage disabled.");
        return null;
    }

    try {
        return localStorage.getItem(name);
    } catch (e) {
        Log.error("An error occurred attempting to load '" + name + "': " + e);
    }
    return null;
}

function removeValue(name) {
    if (!localStorageEnabled) {
        Log.info("Unable to remove '" + name + "', local storage disabled.");
        return;
    }

    try {
        localStorage.removeItem(name);
    } catch (e) {
        Log.error("An error occurred attempting to remove '" + name + "': " + e);
    }
}

function populateFiles() {
    if (!localStorageEnabled) {
        return;
    }

    let FS = window.FS;
    for (let i = -1; i < SAVE_COUNT; i++) {
        let path = GPATH + (i === -1 ? "/prboom.cfg" : "/prbmsav" + i + ".dsg");
        try {
            let res = FS.analyzePath(path, true);
            if (!res.exists) {
                let b64 = readValue(path);
                if (b64 !== null) {
                    let binary = window.atob(b64);
                    let len = binary.length;
                    let bytes = new Uint8Array(len);
                    for (let j = 0; j < len; j++) {
                        bytes[j] = binary.charCodeAt(j);
                    }
                    FS.writeFile(path, bytes);
                }
            }
        } catch (e) {
            Log.error(e);
        }
    }
}

function storeFiles() {
    if (!localStorageEnabled) {
        return;
    }

    let FS = window.FS;
    for (let i = -1; i < SAVE_COUNT; i++) {
        let path = GPATH + (i === -1 ? "/prboom.cfg" : "/prbmsav" + i + ".dsg");
        let content = null;
        try {
            content = FS.readFile(path);
            let binary = '';
            let len = content.byteLength;
            for (let j = 0; j < len; j++) {
                binary += String.fromCharCode(content[j]);
            }
            writeValue(path, btoa(binary));
        } catch (e) {
            Log.error(e)
            removeValue(path);
        }
    }
}

function mountAndPopulateFs(key) {
    const DB = '/idxdb';
    GPATH = DB + '/' + key;

    let FS = window.FS;
    FS.mkdir(DB);
    if (!indexedStorageEnabled) {
        FS.mkdir(GPATH);
        populateFiles();
    } else {
        FS.mount(FS.filesystems.IDBFS, {}, DB);
        FS.syncfs(true, function (err) {
            if (err) {
                Log.error(err);
            } else {
                let res = FS.analyzePath(GPATH, true);
                if (!res.exists) {
                    FS.mkdir(GPATH);
                }
            }
        });
    }
}

function syncFs() {
    let FS = window.FS;
    if (!indexedStorageEnabled) {
        storeFiles();
    } else {
        FS.syncfs(function (err) {
            if (err) {
                Log.error(err);
            }
        });
    }
}

function init() {
    checkLocalStorageAvailable();
    checkIndexedDbAvailable();
}

export {
    init,
    setLastGame,
    getLastGame,
    writeValue,
    readValue,
    removeValue,
    mountAndPopulateFs,
    syncFs
}