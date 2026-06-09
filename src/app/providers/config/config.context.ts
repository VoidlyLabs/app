'use client';

import { createContext, useContext } from 'react';
import { BasicConfiguration } from '@/shared/api/services/configuration/configuration.model';

export const defaultConfiguration: BasicConfiguration = {
  name: 'Voidly',
  description: '',
  logoUrl: '',
  accentColor: '#AD46FF',
  backgroundColor: '#ffffff',
  secondaryColor: '#f3f4f6',
  phoneNumber: '+380 (44) 123-45-67',
  email: 'info@voidly.ua',
  createdAt: '',
  updatedAt: '',
};

export interface ConfigContextProps {
  config: BasicConfiguration;
}

export const ConfigContext = createContext<ConfigContextProps>({
  config: defaultConfiguration,
});

export const useConfig = () => useContext(ConfigContext);

