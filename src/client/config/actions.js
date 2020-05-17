// @flow strict

export type ActionType =
  | {
      type: 'setElementParam',
      payload: {
        name: string,
        paramName: string,
        paramValue: string,
      },
    }
  | {
      type: 'setElementInvalid',
      payload: {
        name: string,
        invalid: boolean,
      },
    };

export const setElementParam = (payload: {
  name: string,
  paramName: string,
  paramValue: string,
}): ActionType => ({
  type: 'setElementParam',
  payload,
});

// prettier-ignore
export const setElementInvalid = (payload: {
  name: string,
  invalid: boolean,
}): ActionType => ({
  type: 'setElementInvalid',
  payload,
});
