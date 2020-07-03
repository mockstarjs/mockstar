import colors from 'colors/safe';

export function error(msg: string): void {
  console.log(colors.red(msg));
}

export function warn(msg: string): void {
  console.log(colors.yellow(msg));
}

export function info(msg: string): void {
  console.log(colors.green(msg));
}

export {colors};
