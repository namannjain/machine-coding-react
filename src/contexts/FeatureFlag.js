import React, { createContext, useState } from 'react';

export const FeatureFlag = createContext({});

export const FeatureFlagProvider = ({ children }) => {
  const [features, setFeatures] = useState({
    isGooglePayEnabled: true,
    isApplePayEnabled: false,
  });

  return (
    <FeatureFlag.Provider value={{features}} >{children}</FeatureFlag.Provider>
  )
}