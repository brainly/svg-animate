// @flow strict

export type CompilationType = {
  fileTimestamps: Map<string, number>,
  fileDependencies: Set<string>,
  ...
};

export type SupportedElementAttrs = {
  [elementName: string]: Array<string>,
};

export type AnimatedElement = {
  id: string,
  element: string,
  attrs: {[attr: string]: Array<string>},
};

export type AnimatedFrame = Array<AnimatedElement>;

export type OptionsType = $ReadOnly<{
  alternateDirection: boolean,
}>;

export type ConfigType = $ReadOnly<{
  [elementName: string]: {
    duration?: string,
    delay?: string,
  }
}>;
