export interface IComponent {
  marginLeft?: number;
  marginTop?: number;
  width: number;
  height: number;
  color?: string;
  content?: string;
  background?: string;
  click?: () => void;
}