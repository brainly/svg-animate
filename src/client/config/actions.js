// @flow strict

export type ActionType = SetElementParamType;

type SetElementParamType = {
  type: 'setElementParam',
  payload: {
    name: string,
    paramName: string,
    paramValue: string,
  },
};

export const setElementParam = (payload: {
  name: string,
  paramName: string,
  paramValue: string,
}): SetElementParamType => ({
  type: 'setElementParam',
  payload,
});
