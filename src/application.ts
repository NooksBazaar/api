import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {ItemRepository} from './repositories';

export class NooksBazaarApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    if (process.env.MONGO_URL) {
      this.bind('datasources.config.mongo').to({
        name: 'mongo',
        connector: 'mongodb',
        url: process.env.MONGO_URL,
      });
    }
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    await super.migrateSchema(options);

    const itemRepo = await this.getRepository(ItemRepository);
    const items = require('@nooksbazaar/acdb/items.json');

    for (const item of items) {
      const filter = {where: {name: item.name}};
      const existingItem = await itemRepo.findOne(filter);

      if (existingItem) {
        for (const key of Object.keys(item)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          existingItem[key] = item[key];
        }

        await itemRepo.update(existingItem);
      } else {
        await itemRepo.create(item);
      }
    }
  }
}
