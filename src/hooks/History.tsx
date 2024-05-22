import React, { useState, useEffect } from 'react';
import { useConfig } from './Config';

export type HistoryItemType = {
  who: string;
  what: string;
  when: string;
};

export type HistoryType = Array<HistoryItemType>;

const getFromStorage = (id: string): HistoryType => {
  const history = localStorage.getItem(id);
  return history ? (JSON.parse(history) as HistoryType) : [];
};

const setToStorage = (id: string, history: HistoryType) => {
  localStorage.setItem(id, JSON.stringify(history));
};

const HistoryContext = React.createContext<{
  history: HistoryType;
  setHistory: (history: HistoryType) => void;
}>({
  history: [],
  setHistory: (history: HistoryType) => {},
});

export const useHistory = () => {
  return React.useContext(HistoryContext);
};

export const HistoryProvider = ({ children }: any) => {
  const [history, setHistory] = useState<HistoryType>([]);
  const { config } = useConfig();

  useEffect(() => {
    setHistory(getFromStorage(config.conversationId));
  }, [config]);

  const saveHistory = (history: HistoryType) => {
    setHistory(history);
    setToStorage(config.conversationId, history);
  };

  return (
    <HistoryContext.Provider value={{ history, setHistory: saveHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
