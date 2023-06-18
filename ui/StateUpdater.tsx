import React, { useEffect } from 'react';

interface StateUpdaterProps {
  updateState: () => void;
}
export function StateUpdater({ updateState }: StateUpdaterProps) {
  useEffect(() => {
    updateState();
  });
  return <></>;
}
