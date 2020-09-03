import mockstarPackageJson from './package-file/mockstar.json';
import mockstarCliPackageJson from './package-file/mockstar-cli.json';
import mockstarGeneratorsPackageJson from './package-file/mockstar-generators.json';

export interface PkgInfo {
  name: string;
  version: string;
}

const mockstarPackage: PkgInfo = {
  name: mockstarPackageJson.name,
  version: mockstarPackageJson.version,
};

const mockstarCliPackage: PkgInfo = {
  name: mockstarCliPackageJson.name,
  version: mockstarCliPackageJson.version,
};

const mockstarGeneratorsPackage: PkgInfo = {
  name: mockstarGeneratorsPackageJson.name,
  version: mockstarGeneratorsPackageJson.version,
};

export { mockstarPackage, mockstarCliPackage, mockstarGeneratorsPackage };
