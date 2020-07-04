import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export function getDB(fullPath: string): low.LowdbSync<any> {
  return low(new FileSync(fullPath));
}
