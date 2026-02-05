import React, { createContext, useCallback, useContext, useState } from 'react';

export type UserType = 'caregiver' | 'facility' | 'innovator' | null;

export interface OnboardingSurveyState {
  userType: UserType;
  adoptionReadiness: string[];
  engagementIntent: string[];
  technologyCategories: string[];
  careSetting: string[];
  riskTolerance: string | null;
  // Innovators & Companies survey
  technologyStage: string | null;
  seekingThroughPlatform: string[];
  innovatorTechnologyCategories: string[];
  deploymentSetting: string[];
  readinessForEngagement: string[];
}

const initialState: OnboardingSurveyState = {
  userType: null,
  adoptionReadiness: [],
  engagementIntent: [],
  technologyCategories: [],
  careSetting: [],
  riskTolerance: null,
  technologyStage: null,
  seekingThroughPlatform: [],
  innovatorTechnologyCategories: [],
  deploymentSetting: [],
  readinessForEngagement: [],
};

type SurveyContextValue = {
  state: OnboardingSurveyState;
  setUserType: (t: UserType) => void;
  setAdoptionReadiness: (v: string[]) => void;
  setEngagementIntent: (v: string[]) => void;
  setTechnologyCategories: (v: string[]) => void;
  setCareSetting: (v: string[]) => void;
  setRiskTolerance: (v: string | null) => void;
  setTechnologyStage: (v: string | null) => void;
  setSeekingThroughPlatform: (v: string[]) => void;
  setInnovatorTechnologyCategories: (v: string[]) => void;
  setDeploymentSetting: (v: string[]) => void;
  setReadinessForEngagement: (v: string[]) => void;
  reset: () => void;
};

const SurveyContext = createContext<SurveyContextValue | null>(null);

export function OnboardingSurveyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingSurveyState>(initialState);

  const setUserType = useCallback((userType: UserType) => {
    setState((s) => ({ ...s, userType }));
  }, []);

  const setAdoptionReadiness = useCallback((adoptionReadiness: string[]) => {
    setState((s) => ({ ...s, adoptionReadiness }));
  }, []);

  const setEngagementIntent = useCallback((engagementIntent: string[]) => {
    setState((s) => ({ ...s, engagementIntent }));
  }, []);

  const setTechnologyCategories = useCallback((technologyCategories: string[]) => {
    setState((s) => ({ ...s, technologyCategories }));
  }, []);

  const setCareSetting = useCallback((careSetting: string[]) => {
    setState((s) => ({ ...s, careSetting }));
  }, []);

  const setRiskTolerance = useCallback((riskTolerance: string | null) => {
    setState((s) => ({ ...s, riskTolerance }));
  }, []);

  const setTechnologyStage = useCallback((technologyStage: string | null) => {
    setState((s) => ({ ...s, technologyStage }));
  }, []);

  const setSeekingThroughPlatform = useCallback((seekingThroughPlatform: string[]) => {
    setState((s) => ({ ...s, seekingThroughPlatform }));
  }, []);

  const setInnovatorTechnologyCategories = useCallback((innovatorTechnologyCategories: string[]) => {
    setState((s) => ({ ...s, innovatorTechnologyCategories }));
  }, []);

  const setDeploymentSetting = useCallback((deploymentSetting: string[]) => {
    setState((s) => ({ ...s, deploymentSetting }));
  }, []);

  const setReadinessForEngagement = useCallback((readinessForEngagement: string[]) => {
    setState((s) => ({ ...s, readinessForEngagement }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <SurveyContext.Provider
      value={{
        state,
        setUserType,
        setAdoptionReadiness,
        setEngagementIntent,
        setTechnologyCategories,
        setCareSetting,
        setRiskTolerance,
        setTechnologyStage,
        setSeekingThroughPlatform,
        setInnovatorTechnologyCategories,
        setDeploymentSetting,
        setReadinessForEngagement,
        reset,
      }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useOnboardingSurvey() {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error('useOnboardingSurvey must be used within OnboardingSurveyProvider');
  return ctx;
}
