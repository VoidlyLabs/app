import { createContext, useContext } from 'react';
import { BasicClient } from '@/shared/api/services/clients/clients.model';

export type OwnUserContextProps = BasicClient;

export const OwnUserContext = createContext<OwnUserContextProps>(
  {} as OwnUserContextProps,
);

export const useOwnUser = () => useContext(OwnUserContext);
