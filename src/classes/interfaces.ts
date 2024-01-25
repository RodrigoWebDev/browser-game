export interface IAction {
  name: string;
  click: (...args: any) => void;
}
