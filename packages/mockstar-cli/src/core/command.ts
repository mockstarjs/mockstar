import abbrev from 'abbrev';
import {Base} from '../internal/base';

/**
 * All commands need to be registered before using in CLI console.
 * After registered, command will store in context store, and ctx
 * will try to find it from store when call a command.
 *
 * @type {Command}
 */
export class Command {
  store: Record<string, Base>;
  alias: Record<string, string>;

  constructor() {
    this.store = {};
    this.alias = {};
  }

  /**
   * Get a command detail from ctx store.
   *
   * @param name   {String}   command name
   * @returns {*}
   */
  get(name: string) {
    name = name.toLowerCase();
    return this.store[this.alias[name]];
  }

  /**
   * List all commands.
   * @returns {{}|*}
   */
  list() {
    return this.store;
  }

  /**
   * Register a command, unique entrance for command registry.
   *
   * @param name   {String}   command name
   * @param desc   {String}   command description
   * @param options
   * @param fn     {Function} command callback
   */
  register(name: string, fn: Base): void;
  register(name: string, desc: string, fn: Base): void;
  register(name: string, options: Record<string, unknown>, fn: Base): void;
  register(name: string, desc: string, options: Record<string, unknown>, fn: Base): void;
  register(
    name: string,
    desc: Base | string | Record<string, unknown>,
    options?: Record<string, unknown> | Base,
    fn?: Base,
  ): void {
    if (!name) throw new TypeError('name is required');

    if (!fn) {
      if (options) {
        if (typeof options === 'object') {
          // 将类给到 fn
          fn = options as Base;

          if (typeof desc === 'object') {
            // name, options, fn
            options = desc;
            desc = '';
          } else {
            // name, desc, fn
            options = {};
          }
        } else {
          throw new TypeError('fn must be a object');
        }
      } else {
        // name, fn
        if (typeof desc === 'object') {
          fn = desc as Base;
          options = {};
          desc = '';
        } else {
          throw new TypeError('fn must be a function');
        }
      }
    }

    const c = (this.store[name.toLowerCase()] = fn);
    c.setInfo(desc as string, options as Record<string, unknown>);

    this.alias = abbrev(Object.keys(this.store));
  }
}
