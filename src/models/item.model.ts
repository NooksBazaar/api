import {Entity, model, property} from '@loopback/repository';
import {
  Catalog,
  Category,
  CeilingType,
  CurtainType,
  Items,
  LightingType,
  PaneType,
  PrimaryShape,
  SecondaryShape,
  Size,
  SpeakerType,
  Style,
  Variant,
  Version,
  VfxType,
  WindowColor,
  WindowType,
} from '@nooksbazaar/acdb/items';
import {ItemVariations} from './item-variations.model';
import {enumValues} from '../util/enum-values';

@model({
  settings: {
    indexes: {
      uniqueName: {
        keys: {
          name: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Item extends Entity implements Items {
  @property({
    type: String,
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: String,
  })
  albumImage: string | null;

  @property({
    type: String,
  })
  artist: string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Catalog),
    },
  })
  catalog: Catalog;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Category),
    },
  })
  category: Category;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(CeilingType),
    },
  })
  ceilingType: CeilingType | null;

  @property({
    type: String,
  })
  curtainColor: string | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(CurtainType),
    },
  })
  curtainType: CurtainType | null;

  @property({
    type: Number,
  })
  customizationKitCost: number | null;

  @property({
    type: Boolean,
  })
  customize: boolean | null;

  @property({
    type: Boolean,
  })
  diy: boolean | null;

  @property({
    type: Boolean,
  })
  doorDeco: boolean;

  @property({
    type: String,
  })
  framedImage: string | null;

  @property({
    type: Boolean,
  })
  interact: boolean;

  @property({
    type: Number,
  })
  kitCost: number | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(LightingType),
    },
  })
  lightingType: LightingType | null;

  @property({
    type: String,
  })
  name: string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(PaneType),
    },
  })
  paneType: PaneType | null;

  @property({
    type: Boolean,
  })
  patternCustomize: boolean | null;

  @property({
    type: String,
  })
  patternTitle: string | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(PrimaryShape),
    },
  })
  primaryShape: PrimaryShape;

  @property({
    type: String,
  })
  realArtworkTitle: string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(SecondaryShape),
    },
  })
  secondaryShape: SecondaryShape | null;

  @property({
    type: String,
  })
  series: string | null;

  @property({
    type: String,
  })
  set: string | null;

  @property({
    type: String,
  })
  size: Size;

  @property({
    type: String,
  })
  sourceNotes: string | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Category),
    },
  })
  sourceSheet: Category;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(SpeakerType),
    },
  })
  speakerType: SpeakerType | null;

  @property({
    type: String,
  })
  style: Style;

  @property({
    type: String,
  })
  tag: string | null;

  @property({
    type: Number,
  })
  uses: number;

  @property.array(ItemVariations)
  variants: Variant[];

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Version),
    },
  })
  version: Version;

  @property({
    type: Boolean,
  })
  vfx: boolean | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(VfxType),
    },
  })
  vfxType: VfxType | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(WindowColor),
    },
  })
  windowColor: WindowColor | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(WindowType),
    },
  })
  windowType: WindowType | null;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
