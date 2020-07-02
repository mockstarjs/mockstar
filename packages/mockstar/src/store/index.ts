import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileAsync';

export function getDB(fullPath: string): low.LowdbAsync<any> {
  return (low(new FileSync(fullPath)) as unknown) as low.LowdbAsync<any>;
}
