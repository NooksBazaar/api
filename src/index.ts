import {NooksBazaarApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {NooksBazaarApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new NooksBazaarApplication(options);
  await app.boot();
  if (options.autoMigrate) {
    await app.migrateSchema();
  }
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
