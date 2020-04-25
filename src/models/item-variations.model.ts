import {Entity, model, property} from '@loopback/repository';
import {
  BodyTitle,
  Color,
  LabelTheme,
  Theme,
  Variant,
  VariantID,
} from '@nooksbazaar/acdb/all';
import {enumValues} from '../util/enum-values';

@model()
export class ItemVariations extends Entity implements Variant {
  @property({
    type: Boolean,
  })
  bodyCustomize: boolean | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(BodyTitle),
    },
  })
  bodyTitle: BodyTitle | null;

  @property({
    type: Number,
  })
  buy: number;

  @property({
    type: String,
  })
  closetImage: string;

  @property.array(String, {
    jsonSchema: {
      enum: enumValues(Color),
    },
  })
  colors: Color[];

  @property({
    type: String,
  })
  filename: string;

  @property({
    type: Boolean,
  })
  genuine: boolean;

  @property({
    type: String,
  })
  highResTexture: null;

  @property({
    type: String,
  })
  image?: string;

  @property({
    type: Number,
  })
  internalId: number;

  @property.array(String, {
    jsonSchema: {
      enum: enumValues(LabelTheme),
    },
  })
  labelThemes: LabelTheme[];

  @property({
    type: String,
  })
  pattern: string | null;

  @property({
    type: Number,
  })
  sell: number | null;

  @property.array(String)
  source: string[];

  @property(String)
  storageImage: string;

  @property.array(String, {
    jsonSchema: {
      enum: enumValues(Theme),
    },
  })
  themes: Theme[];

  @property()
  uniqueEntryId: string;

  @property({
    type: String,
  })
  variantId: VariantID | null;

  @property({
    type: String,
  })
  variation: number | string | null;

  constructor(data?: Partial<ItemVariations>) {
    super(data);
  }
}
