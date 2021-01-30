import React, { useReducer } from "react";

interface DataCtxArgs<T> {}

const createDataContext: <T>(
  reducer: React.Reducer<any, any>,
  actions: {
    [key: string]: (dispatch: React.Dispatch<any>) => (data: any) => void;
  },
  initialState: T
) => {
  Context: React.Context<{}>;
  Provider: React.FC<{}>;
} = (reducer, actions, initialState) => {
  const Context = React.createContext({});
  const Provider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions = {} as { [key: string]: (data: any) => void };
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};

export default createDataContext;
