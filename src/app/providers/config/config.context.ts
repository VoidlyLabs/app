import {createContext, useContext} from "react";

export interface ConfigContextProps {
    name: string;
}

export const ConfigContext = createContext<ConfigContextProps>({} as ConfigContextProps);

export const useConfig = () => useContext(ConfigContext);