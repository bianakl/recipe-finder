import { usePremium } from '../hooks/usePremium';
import { LockedFeaturePrompt } from './LockedFeaturePrompt';

export function PremiumGate({ featureId, children }) {
  const { canAccessFeature } = usePremium();

  if (canAccessFeature(featureId)) {
    return children;
  }

  return <LockedFeaturePrompt featureId={featureId} />;
}
