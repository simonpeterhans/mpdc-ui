import * as DEEPMERGE from 'deepmerge';

export class Config {

  private static readonly DEFAULT_PORT = 5678;

  // Default config.
  _config = {
    collector: {
      host: window.location.hostname + ':' + Config.DEFAULT_PORT,
      tls: false,
      ping_interval: 10_000
    }
  }

  constructor(collector?: any) {
    const overwriteMerge = (destinationArray: any, sourceArray: any, options: any) => sourceArray;

    if (collector) {
      this._config.collector = DEEPMERGE(this._config.collector, collector, {arrayMerge: overwriteMerge});
    }

    this._config.collector.host = this._config.collector.host.replace(/^https?:\/\//, '');
  }

  get collectorBasePath(): string {
    const protocol = this._config.collector.tls ? 'https://' : 'http://';
    return protocol + this._config.collector.host;
  }

  public static deserializeFromObject(object: {} | string): Config {
    console.log(object);
    if (typeof object === 'string') {
      object = JSON.parse(object);
    }

    // @ts-ignore
    return new Config(object['collector']);
  }

}
