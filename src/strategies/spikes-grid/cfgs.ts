import { SpikesGOptions } from './bot';

export const BTCUSDT: SpikesGOptions = {
    instrumentType: 'MARGIN',
    fee: 0.1,
    lotsMultiplier: 1,
    equityLevel: 1,
    broker: 'binance',
    ticker: 'BTCUSDT',
    currency: 'USDT',
    interval: '15min',
    amount: 500,
    eventExpireBars: 11,
    takeProfit: 3.48,
    step: 5.66,
    levelsCount: 4,
    martingale: 1.76,
    fibo: true,
    barsTrend: 33,
    bandsPeriod: 75,
    bandsDev: 3.13,
    usePeaks: true,
    buyOnly: false,
    useClose: false,
    id: 4,
};

export const FILUSDT: SpikesGOptions = {
    instrumentType: 'MARGIN',
    broker: 'binance',
    ticker: 'FILUSDT',
    currency: 'USDT',
    interval: '15min',
    amount: 500,
    fee: 0.1,
    eventExpireBars: 67,
    takeProfit: 1.56,
    stopLoss: 30,
    step: 2.43,
    levelsCount: 3,
    martingale: 1.77,
    fibo: false,
    barsTrend: 35,
    bandsPeriod: 57,
    bandsDev: 2.03,
    usePeaks: true,
    buyOnly: false,
    useClose: false,
};
