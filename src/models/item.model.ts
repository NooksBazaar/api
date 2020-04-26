import {Entity, model, property} from '@loopback/repository';
import {
  ActiveHour,
  ActiveMonths,
  Catalog,
  Category,
  CeilingType,
  Color,
  CurtainType,
  Gender,
  Hobby,
  Item as AcdbItem,
  LightingType,
  PaneType,
  Personality,
  PrimaryShape,
  Rarity,
  SeasonalAvailability,
  SecondaryShape,
  Size,
  SourceSheet,
  SpeakerType,
  Style,
  Variant,
  Version,
  VfxType,
  Weather,
  WindowColor,
  WindowType,
} from '@nooksbazaar/acdb/all';
import {ItemVariations} from './item-variations.model';
import {enumValues} from '../util/enum-values';

@model({
  settings: {
    indexes: {
      uniqueName: {
        keys: {
          name: 1,
          sourceSheet: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Item extends Entity implements AcdbItem {
  @property({
    type: String,
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(SourceSheet),
    },
  })
  sourceSheet: SourceSheet;

  @property({
    type: String,
  })
  name: string;

  @property({
    type: String,
  })
  patternTitle?: null | string;

  @property({
    type: Boolean,
  })
  diy?: boolean;

  @property({
    type: Boolean,
  })
  patternCustomize?: boolean | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Size),
    },
  })
  size?: Size;

  @property({
    type: String,
  })
  sourceNotes?: null | string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Version),
    },
  })
  version?: Version;

  @property({
    type: Boolean,
  })
  interact?: boolean;

  @property({
    type: String,
  })
  tag?: null | string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(SpeakerType),
    },
  })
  speakerType?: SpeakerType | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(LightingType),
    },
  })
  lightingType?: LightingType | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Catalog),
    },
  })
  catalog?: Catalog;

  @property({
    type: String,
  })
  set?: null | string;

  @property({
    type: String,
  })
  series?: null | string;

  @property({
    type: Number,
  })
  customizationKitCost?: number | null;

  @property.array(ItemVariations)
  variants?: Variant[];

  @property({
    type: Boolean,
  })
  doorDeco?: boolean;

  @property({
    type: Boolean,
  })
  vfx?: boolean | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(VfxType),
    },
  })
  vfxType?: VfxType | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(WindowColor),
    },
  })
  windowType?: WindowType | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(WindowColor),
    },
  })
  windowColor?: WindowColor | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(PaneType),
    },
  })
  paneType?: PaneType | null;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(CurtainType),
    },
  })
  curtainType?: CurtainType | null;

  @property({
    type: String,
  })
  curtainColor?: null | string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(CeilingType),
    },
  })
  ceilingType?: CeilingType | null;

  @property({
    type: Boolean,
  })
  customize?: boolean;

  @property({
    type: Number,
  })
  uses?: number;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(SeasonalAvailability),
    },
  })
  seasonalAvailability?: SeasonalAvailability;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Style),
    },
  })
  style?: Style;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(PrimaryShape),
    },
  })
  primaryShape?: PrimaryShape;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(SecondaryShape),
    },
  })
  secondaryShape?: SecondaryShape | null;

  @property({
    type: String,
  })
  framedImage?: null | string;

  @property({
    type: String,
  })
  albumImage?: null | string;

  @property({
    type: String,
  })
  inventoryImage?: string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Category),
    },
  })
  category?: Category | null;

  @property({
    type: String,
  })
  realArtworkTitle?: string;

  @property({
    type: String,
  })
  artist?: string;

  @property({
    type: String,
  })
  museumDescription?: string;

  @property({
    type: Number,
  })
  num?: number;

  @property({
    type: Number,
  })
  sell?: number;

  @property({
    type: String,
  })
  whereHow?: string;

  @property({
    type: String,
  })
  shadow?: string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Rarity),
    },
  })
  rarity?: Rarity;

  @property({
    type: Boolean,
  })
  rainSnowCatchUp?: boolean;

  @property({
    type: String,
  })
  critterpediaFilename?: string;

  @property({
    type: String,
  })
  furnitureFilename?: string;

  @property({
    type: Number,
  })
  internalId?: number | null;

  @property({
    type: String,
  })
  uniqueEntryId?: string;

  @property.array(String, {
    jsonSchema: {
      enum: enumValues(Color),
    },
  })
  colors?: Color[];

  @property({
    type: String,
  })
  specialSell?: number;

  @property.array(Array, {
    itemType: String,
  })
  activeHours?: Array<ActiveHour[]>;

  @property({
    type: Object,
  })
  activeMonths?: ActiveMonths;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Weather),
    },
  })
  weather?: Weather;

  @property({
    type: String,
  })
  inventoryFilename?: null | string;

  @property({
    type: String,
  })
  image?: string;

  @property({
    type: Number,
  })
  nookMiles?: number | null;

  @property({
    type: String,
  })
  filename?: null | string;

  @property({
    type: String,
  })
  sources?: null | string;

  @property({
    type: Object,
  })
  materials?: {[key: string]: number};

  @property({
    type: String,
  })
  species?: string;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Gender),
    },
  })
  gender?: Gender;

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Personality),
    },
  })
  personality?: Personality;

  @property({
    type: String,
  })
  birthday?: string;

  @property({
    type: String,
  })
  catchphrase?: string;

  @property.array(String, {
    jsonSchema: {
      enum: enumValues(Style),
    },
  })
  styles?: Style[];

  @property({
    type: Number,
  })
  buy?: number;

  @property.array(String)
  source?: string[];

  @property({
    type: String,
    jsonSchema: {
      enum: enumValues(Hobby),
    },
  })
  hobby: Hobby;

  @property({
    type: String,
  })
  type: string;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
