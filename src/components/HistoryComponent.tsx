import React, { useEffect, useRef } from 'react';
import HistoryItemComponent from './HistoryItemComponent';
import { useHistory } from '../hooks/History';

export default function HistoryComponent() {
  const history = useHistory();
  const historyEndRef = useRef(null);

  useEffect(() => {
    const ref = historyEndRef.current as any;
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div style={{ padding: 10 }}>
      {history.history.map((historyItem, index) => (
        <HistoryItemComponent key={index} {...historyItem} />
      ))}
      <div ref={historyEndRef} />
    </div>
  );
}
