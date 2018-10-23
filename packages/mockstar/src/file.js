export function getRequireResult(absolutePath) {
    // TODO 此处要考虑下是否安全
    return require(absolutePath);
}