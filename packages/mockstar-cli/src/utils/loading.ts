import ora from 'ora';

export class Loading {
  spinner: ora.Ora;

  constructor(
    name: string,
    color: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray',
  ) {
    const spinner = ora(`Loading ${name}`).start();

    spinner.color = color || 'yellow';
    spinner.text = `Loading ${name}`;

    this.spinner = spinner;
  }

  /**
   * Loading success.
   */
  success(msg: string) {
    this.spinner.succeed(msg);
  }

  /**
   * Loading failure.
   */
  fail(msg: string) {
    this.spinner.fail(msg);
  }
}
