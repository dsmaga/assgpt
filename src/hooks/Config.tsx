import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { allowedModels, ModelType } from '../types/ModelType';

export type ConfigType = {
  apiKey: string | null;
  model: ModelType;
  conversationId: string;
};

const defaultConfig: ConfigType = {
  apiKey: null,
  model: allowedModels[0],
  conversationId: uuidv4(),
};

const getFromStorage = () => {
  const config = localStorage.getItem('config');
  if (config) {
    return JSON.parse(config) as ConfigType;
  }
  return defaultConfig;
};

const setToStorage = (config: ConfigType) => {
  localStorage.setItem('config', JSON.stringify(config));
};

const ConfigContext = React.createContext<{
  config: ConfigType;
  setConfig: (config: ConfigType) => void;
}>({
  config: getFromStorage(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setConfig: () => {},
});

export const useConfig = () => {
  return React.useContext(ConfigContext);
};

export const ConfigProvider = ({ children }: any) => {
  const [config, setConfig] = React.useState<ConfigType>(getFromStorage());

  const saveConfig = (config: ConfigType) => {
    setConfig(config);
    setToStorage(config);
  };

  return (
    <ConfigContext.Provider value={{ config, setConfig: saveConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
