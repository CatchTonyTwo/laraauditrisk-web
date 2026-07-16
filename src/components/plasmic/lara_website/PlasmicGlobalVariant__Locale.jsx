/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import * as React from "react";

export const LocaleContext = React.createContext(
  "PLEASE_RENDER_INSIDE_PROVIDER"
);

export function LocaleContextProvider(props) {
  return (
    <LocaleContext.Provider value={props.value}>
      {props.children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return React.useContext(LocaleContext);
}

export default LocaleContext;
/* prettier-ignore-end */
