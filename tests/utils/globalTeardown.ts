import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from './logger';

export default async function globalTeardown(_: FullConfig) {
  console.log('Running global teardown...');

  // Clean up state.json file
  const stateFilePath = path.join(
    __dirname,
    '..',
    'fixture',
    'storageState',
    'state.json',
  );

  try {
    if (fs.existsSync(stateFilePath)) {
      fs.writeFileSync(stateFilePath, '{}');
      logger.info('state.json reset to {}');
    } else {
      logger.warn(`state.json file not found at: ${stateFilePath}`);
    }
  } catch (error) {
    logger.error(`Failed to clear state: ${error}`);
  }
  logger.info('Global teardown completed');
}

