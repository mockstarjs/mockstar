import pkg from './pkg.json';

export interface PkgInfo {
  name: string;
  version: string;
}

const pkgInfo: PkgInfo = {
  name: pkg.name,
  version: pkg.version,
};

export default pkgInfo;
