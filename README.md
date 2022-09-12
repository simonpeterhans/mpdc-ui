# mpdc-ui

Front end of a multi-platform data collection system to collect social media data from various (academic) APIs, suitable for long-running/continuous queries that can be recovered upon interrupt.

To be used with the back end at [mpdc-collector](https://github.com/simonpeterhans/mpdc-collector) that is responsible for the execution of data collection queries issued from this UI.

**Note:** You still need API access keys to use this system! The setup is meant to be local on a per-research-group or per-researcher basis.

##### APIs:

- Twitter Academic v2 (tweet search/stream, 1% stream)
- CrowdTangle Academic (account list search/stream)

##### Requirements:

- Angular 13

##### Deploying the UI:

1. Run `npm install`.
2. Adjust the config file at `src/config.json` if necessary.
3. Run `ng serve` to deploy the UI.

##### Notes:

- This is a prototype. Although it has successfully executed long-running queries and query recovery works fine, things might break.
- Documentation is scarce, and some things are solved more elegantly than others.
- If you want to make use of the vitrivr integration, make sure you check out the setup documentation of [Cineast](https://github.com/vitrivr/cineast), [vitrivr-ng](https://github.com/vitrivr/vitrivr-ng), and [Cottontail DB](https://github.com/vitrivr/cottontaildb).
- The Cineast version to be used is currently on a [fork](https://github.com/simonpeterhans/cineast), with a pull request to the main repo coming soon.
- Contributions are more than welcome!
