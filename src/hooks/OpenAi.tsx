import React, { useEffect } from 'react';
import { useConfig } from './Config';
import { ModelType } from '../types/ModelType';

export type OpenAiMessageType = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

export type OpenAiRequestType = {
  model: ModelType;
  messages: OpenAiMessageType[];
};

export type OpenAiResponseType = {
  choices: {
    index: number;
    message: OpenAiMessageType;
  }[];
};

const callCompletions = async (request: OpenAiRequestType, apiKey: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(request),
  });
  return (await response.json()) as OpenAiResponseType;
};

const OpenAiContext = React.createContext<{
  completions: (messages: OpenAiMessageType[]) => Promise<OpenAiResponseType>;
}>({
  completions: async (messages: OpenAiMessageType[]) => {
    throw new Error('No OpenAiProvider');
  },
});

export const useOpenAi = () => {
  return React.useContext(OpenAiContext);
};

export const OpenAiProvider = ({ children }: any) => {
  const [apiKey, setApiKey] = React.useState<string | null>(null);
  const { config } = useConfig();

  useEffect(() => {
    setApiKey(config.apiKey);
  }, [config]);

  const callCompletionsProxy = async (messages: OpenAiMessageType[]) => {
    if (!apiKey) {
      throw new Error('No API key set');
    }
    return await callCompletions(
      {
        model: config.model,
        messages,
      } as OpenAiRequestType,
      apiKey,
    );
  };

  return (
    <OpenAiContext.Provider value={{ completions: callCompletionsProxy }}>
      {children}
    </OpenAiContext.Provider>
  );
};
