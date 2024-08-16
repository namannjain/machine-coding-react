import React, { useContext } from 'react';
import { FeatureFlag, FeatureFlagProvider } from '../contexts/FeatureFlag';
//using context api

const Example = () => {
  return (
    <>
      <Feature feature="isGooglePayEnabled" value={true}>Google Pay</Feature>
      <Feature feature="isApplePayEnabled" value={true}>Apple Pay</Feature>
    </>
  )
};

const Feature = ({feature, children, value}) => {
  const { features } = useContext(FeatureFlag);
  return features[feature] === value ? children : null;
};

const FeatureFlagLearnersBucket = () => {
  return (
    <FeatureFlagProvider>
      <Example/>
    </FeatureFlagProvider>
  )
}

export default FeatureFlagLearnersBucket