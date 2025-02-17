export interface IComponentConfig {
  x?: number
  y?: number
  direction: 'vert' | 'horyz'
}

export type IConfig = Omit<IComponentConfig, 'direction'>

export interface ITextBlock {
  width: number;
  height: number;
  color?: string;
  text: string;
  background?: string;
}

export type ISlot = (config: IConfig) => IReturnComponent;

export type IComponent = {
  marginLeft?: number;
  marginTop?: number;
  // fill: ITextBlock | ISlot
  click?: () => void;
} & (
  | {
      textBlock: ITextBlock;
    }
  | { slot: ISlot }
);

export interface IReturnComponent {
  width: number,
  height: number
}