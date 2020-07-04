/**
 * fs-handler
 */
export interface FSHandlerItem {
  relativePath: string;
  basePath: string;
  isDirectory: () => boolean;
}
