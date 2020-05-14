// @flow strict

export type CompilationType = {
  fileTimestamps: Map<string, number>,
  fileDependencies: Set<string>,
  ...
};

export type SupportedElementAttrs = {
  [elementName: string]: Array<string>,
  ...
};

export type AnimatedElement = {
  id: string,
  element: string,
  attrs: {
    [attr: string]: Array<string>,
    ...
  },
};

export type AnimatedFrame = Array<AnimatedElement>;

export type OptionsType = {
  alternateDirection: boolean,
  pathPrecision?: number,
};

export type ConfigType = {
  [elementName: string]: {
    duration?: string,
    delay?: string,
    easing?: string
  },
  ...
};
