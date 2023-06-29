type AnimateInOutType = {
  children: React.ReactNode;
  className?: string;
  animate: { opacity?: number; x?: number | string; y?: number | string };
  init: { opacity?: number; x?: number | string; y?: number | string };
  out: { opacity?: number; x?: number | string; y?: number | string };
  show: boolean;
};
