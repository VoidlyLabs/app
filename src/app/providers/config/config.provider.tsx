'use client';

import React, { useEffect, useMemo } from 'react';
import {
  ConfigContext,
  defaultConfiguration,
} from '@/app/providers/config/config.context';
import { useConfiguration } from '@/shared/api/services/configuration/configuration.queries';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider.tsx';

export interface ConfigProviderProps {
  children?: React.ReactNode;
}

const setCssVar = (name: string, value?: string) => {
  if (!value) {
    return;
  }

  document.documentElement.style.setProperty(name, value);
};

const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const configurationQuery = useConfiguration();

  const config = useMemo(
    () => ({
      ...defaultConfiguration,
      ...(configurationQuery.data?.data.body ?? {}),
    }),
    [configurationQuery.data],
  );

  useEffect(() => {
    setCssVar('--accent', config.accentColor);
    setCssVar('--background', config.backgroundColor);
    setCssVar('--secondary', config.secondaryColor);

    if (config.name) {
      document.title = config.name;
    }
  }, [config]);

  return (
    <FetchProvider
      queryObject={configurationQuery}
      loaderSize={32}
      loaderClassName={'w-full h-screen flex items-center justify-center'}
    >
      {(response) => (
        <ConfigContext.Provider
          value={{
            config: response.data.body,
          }}
        >
          {children}
        </ConfigContext.Provider>
      )}
    </FetchProvider>
  );
};

export default ConfigProvider;
