'use client';

import React from 'react';
import { ConfigContext } from '@/app/providers/config/config.context';

export interface ConfigProviderProps {
  children?: React.ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps) => {
  return (
    <ConfigContext.Provider value={{ name: 'Voidly' }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
