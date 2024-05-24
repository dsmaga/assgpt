import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import PlusIcon from '@mui/icons-material/Add';
import { useHistory } from '../hooks/History';
import { useConfig } from '../hooks/Config';
import { v4 as uuidv4 } from 'uuid';
import { OpenAiResponseType, useOpenAi } from '../hooks/OpenAi';

export default function InputComponent({
  openConfig,
  setPreloader,
}: {
  openConfig: () => void;
  setPreloader: (value: boolean) => void;
}) {
  const [input, setInput] = React.useState('');
  const history = useHistory();
  const config = useConfig();
  const openai = useOpenAi();
  const handleSubmit = (event: React.FormEvent) => {
    let _history = [
      ...history.history,
      {
        who: 'User',
        what: input,
        when: new Date().toISOString(),
      },
    ];
    event.preventDefault();
    history.setHistory(_history);
    setInput('');
    setPreloader(true);
    openai
      .completions(
        _history.map((item) => ({
          role: item.who === 'User' ? 'user' : 'assistant',
          content: item.what,
        })),
      )
      .then((response: OpenAiResponseType) => {
        _history = [
          ..._history,
          {
            who: 'GPT',
            what: response.choices[0].message.content,
            when: new Date().toISOString(),
          },
        ];
        history.setHistory(_history);
      })
      .finally(() => {
        setPreloader(false);
      });
  };

  const onPlusCallback = () => {
    config.setConfig({
      ...config.config,
      conversationId: uuidv4(),
    });
    setInput('');
  };

  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={openConfig}>
        <MenuIcon />
      </IconButton>
      <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={onPlusCallback}>
        <PlusIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSubmit(event);
          }
        }}
        placeholder="Type something..."
        sx={{ ml: 1, flex: 1 }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
