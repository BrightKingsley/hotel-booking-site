type AnimateInOutType = {
  children: React.ReactNode;
  className?: string;
  // animate?: { opacity?: number; x?: number | string; y?: number | string };
  // init: { opacity?: number; x?: number | string; y?: number | string };
  // out?: { opacity?: number; x?: number | string; y?: number | string };
  animate: { [key: string]: any };
  init: { [key: string]: any };
  out: { [key: string]: any };
  show?: boolean;
};
