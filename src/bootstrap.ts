import { BinanceTransport, TinkoffTransport } from '@debut/community-core';
import { cli } from '@debut/plugin-utils';
import { DebutOptions, WorkingEnv } from '@debut/types';
import { SpikesGOptions } from './strategies/spikes-grid/bot';

// Create a transport layer for working with a broker
// Note! The token is required in the ./.tokens.json file
const binanceTransport = new BinanceTransport();
// const tinkoffTransport = new TinkoffTransport();

const getTransport = (cfg: DebutOptions) => {
    if (cfg.broker === 'binance') {
        return binanceTransport;
        // } else {
        //     return tinkoffTransport;
    }
};

const bootSettings = {
    // Choose a strategy
    strategyName: 'SpikesG',
    // Select a ticker, which exists in the cfgs.ts file
    tickName: 'BTCUSDT',
    // Choose the number of days for training
    learnDays: 14,
};

// Main function for launching a trading strategy
async function bootstrap() {
    // Request meta information to create a bot based on the SpikesG strategy, by its name in the schema.json file
    // And also available strategy configurations from cfgs.ts files
    const { meta, configs }: cli.BotData = cli.getBotData(bootSettings.strategyName);

    // If the configuration does not exist, throw it away
    if (!configs[bootSettings.tickName]) {
        console.log(`${bootSettings.tickName} not found in cfgs.ts. Shutdowning...`);
        return process.exit(0);
    }

    // Take the required field from the available configurations
    const config = configs[bootSettings.tickName] as SpikesGOptions;
    // Create a robot in Production mode
    const bot = await meta.create(getTransport(config), config, WorkingEnv.production);

    // Start prelaunch strategy training, for a smooth transition to combat mode,
    // at $(bootSettings.learnDays)[14] days of history until the current moment
    await bot.learn(bootSettings.learnDays);

    console.log('Bot initialized and learned, starting...');

    // Subscribe to data from the exchange in real time to work
    // Calling the start method, returns the stop function, which, when called,
    // will delete the strategy and close active positions on it
    const dispose = await bot.start();

    // Stop trading
    // dispose()
}

// Good Luck 🍀
bootstrap();
