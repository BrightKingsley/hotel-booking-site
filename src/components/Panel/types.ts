import { KeyboardEvent, KeyboardEventHandler, MouseEventHandler } from "react";

export type PanelType = {
  content: string;
  hide: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
};

export type UserProfileType = {};
