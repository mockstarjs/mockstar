const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

export function getDB(fullPath) {
    return low(new FileSync(fullPath));
}
