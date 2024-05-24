import React, { useEffect } from 'react';
import { useConfig, ConfigType } from '../hooks/Config';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { allowedModels, ModelType } from '../types/ModelType';

export default function ConfigComponent({
  closeConfig,
}: {
  closeConfig: () => void;
}) {
  const [apiKey, setApiKey] = React.useState<ConfigType['apiKey']>(
    '' as ConfigType['apiKey'],
  );
  const [model, setModel] = React.useState<ModelType>(allowedModels[0]);
  const { config, setConfig } = useConfig();

  useEffect(() => {
    setApiKey(config.apiKey);
    setModel(config.model);
  }, [config]);

  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value as ConfigType['model']);
  };

  const handleSave = () => {
    setConfig({
      apiKey,
      model,
      conversationId: config.conversationId,
    });
    closeConfig();
  };

  return (
    <div
      style={{
        minWidth: 300,
        padding: 10,
      }}
    >
      <TextField
        style={{ marginBottom: 20 }}
        label="Api Key"
        variant="outlined"
        fullWidth
        value={apiKey}
        onChange={(event) => setApiKey(event.target.value)}
      />
      <FormControl fullWidth style={{ marginBottom: 20 }}>
        <InputLabel id="chat-label">Chat</InputLabel>
        <Select
          labelId="chat-label"
          id="chat"
          value={model}
          label="Model"
          onChange={handleModelChange}
        >
          {allowedModels.map((model) => (
            <MenuItem key={model} value={model}>
              {model}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          style={{
            marginTop: 10,
            marginBottom: 20,
            cursor: 'pointer',
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
