module.exports = {
  indexTemplate: componentName => `import * as React from 'react';

export default function ${componentName}() {
  return <div />;
}
`,
  modelTemplate: () => `import * as reducers from './reducers';
import effects from './effects';
import selectors from './selectors';

export default {
  state: {},
  reducers,
  effects,
  selectors,
};
`,
  reducersTemplate: (isTypescript = false) =>
    isTypescript
      ? `export function set(state: any, value: any): any {
  return {
    ...state,
    value,
  };
}
`
      : `export function set(state, value) {
  return {
    ...state,
    value,
  };
}`,
  effectsTemplate: (isTypescript = false) =>
    isTypescript
      ? `export default function Effects(dispatch: any) {
  return {
    initialize(): Promise<any> {
      return new Promise((resolve: any) => {
        resolve();
      });
    },
  };
}
`
      : `export default function Effects(dispatch) {
  return {
    initialize() {
      return new Promise(resolve => {
        resolve();
      });
    },
  };
}`,
  selectorsTemplate: (isTypescript = false) =>
    isTypescript
      ? `export default function Selectors(slice: any, createSelector: Function) {
  return {
    get() {
      return createSelector(
        slice,
        (state: any) => state
      );
    },
  };
}
`
      : `export default function Selectors(slice, createSelector) {
  return {
    get() {
      return createSelector(
        slice,
        state => state
      );
    },
  };
}
`,
};
