import assert from 'assert';

const { MONGO_URI } = process.env;

assert(MONGO_URI, 'MONGO_URI');

export const mongoUri = MONGO_URI as string;
