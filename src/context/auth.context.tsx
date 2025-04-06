import { iUser } from '@/interfaces';
import api from '@/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';

interface iAuth {
  user: iUser.user;
  signIn: (v: iUser.user) => Promise<void>;
  signOut: VoidFunction;
}

export const AuthContext = createContext<iAuth>({} as iAuth);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<iUser.user>({} as iUser.user);

  const signIn = async (values: iUser.user) => {
    await AsyncStorage.setItem('@user', JSON.stringify(values)).catch((error) =>
      console.log('erro ao salvar no storage'),
    );
    setUser(values);
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    api.defaults.headers['Authorization'] = '';

    setUser({} as iUser.user);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
