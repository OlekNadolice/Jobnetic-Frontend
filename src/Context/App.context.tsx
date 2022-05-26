import { createContext, FC, useReducer, Dispatch } from "react";

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface InitialState {
  isLoggedIn: boolean;
  isSendCvModalOpen: boolean;
  isAddNewAdvertismentModalOpen: boolean;
  dispatch: Dispatch<any>;
}

const initialState: InitialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  isSendCvModalOpen: false,
  isAddNewAdvertismentModalOpen: false,
  dispatch: () => {},
};

export const appContext = createContext<InitialState>({
  isLoggedIn: false,
  isSendCvModalOpen: false,
  isAddNewAdvertismentModalOpen: false,
  dispatch: () => {},
});

const reducer = (state: InitialState, action: any) => {
  switch (action.type) {
    case "HANDLE_LOGIN":
      return { ...state, isLoggedIn: action.payload };

    case "HANDLE_ADVERTISEMENT_MODAL":
      return { ...state, isAddNewAdvertismentModalOpen: action.payload };

    case "HANDLE_CV_MODAL":
      return { ...state, isSendCvModalOpen: action.payload };

    default:
      return { ...state };
  }
};

const AppContextProvider: FC<AppContextProviderProps> = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <appContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
