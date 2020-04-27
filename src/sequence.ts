import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext, Response,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import { createHash } from 'crypto';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, [...args, response]);

      response.setHeader('Access-Control-Expose-Headers', 'Pagination-Count, Pagination-Max-Limit, Pagination-Offset')

      this.cacheControl(result, response);

      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }

  private cacheControl(result: unknown, response: Response) {
    if (! result) {
      return;
    }

    try {
      const buffer = Buffer.from(JSON.stringify(result));
      const hash = createHash('sha256').update(buffer).digest();

      response.setHeader('ETag', JSON.stringify(hash.toString('hex')));

      if (!response.hasHeader('Cache-Control')) {
        response.setHeader('Cache-Control', 'max-age=60');
      }
    } catch (e) {
      console.log(e);
      // ignore, not too concerned if this isn't set
    }
  }
}
