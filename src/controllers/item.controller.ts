import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef, Response, HttpErrors} from '@loopback/rest';
import {Item} from '../models';
import {ItemRepository} from '../repositories';

export class ItemController {
  constructor(
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) {}

  @get('/items/count', {
    responses: {
      '200': {
        description: 'Item model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Item) where?: Where<Item>): Promise<Count> {
    return this.itemRepository.count(where);
  }

  @get('/items', {
    responses: {
      '200': {
        description: 'Array of Item model instances',
        headers: {
          'Pagination-Count': {
            description: 'Total number of items',
            schema: {
              type: 'integer',
            }
          },
          'Pagination-Offset': {
            description: 'Current offset',
            schema: {
              type: 'integer',
            }
          },
          'Pagination-Max-Limit': {
            description: 'Maximum number of returned items allowed',
            schema: {
              type: 'integer',
            }
          },
        },
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Item, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Item) filter: Filter<Item> = { limit: 100 }, res?: Response): Promise<Item[]> {
    const {count} = await this.count(filter?.where);
    const offset = (filter.offset ?? filter.skip) ?? 0;

    if ((filter.limit || 0) > 100) {
      throw new HttpErrors.BadRequest('Pagination limit is higher than the allowed value of 100');
    }

    if (!filter.limit) {
      filter.limit = 100;
    }

    res?.setHeader('Pagination-Count', count);
    res?.setHeader('Pagination-Offset', offset);
    res?.setHeader('Pagination-Max-Limit', 100);

    return this.itemRepository.find(filter);
  }

  @get('/items/{id}', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Item, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Item, {exclude: 'where'}) filter?: FilterExcludingWhere<Item>,
  ): Promise<Item> {
    return this.itemRepository.findById(id, filter);
  }
}
