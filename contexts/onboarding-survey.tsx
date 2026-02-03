import React, { createContext, useCallback, useContext, useState } from 'react';

export type UserType = 'caregiver' | 'facility' | 'innovator' | null;

export interface OnboardingSurveyState {
  userType: UserType;
  adoptionReadiness: string[];
  engagementIntent: string[];
  technologyCategories: string[];
  careSetting: string[];
  riskTolerance: string | null;
}

const initialState: OnboardingSurveyState = {
  userType: null,
  adoptionReadiness: [],
  engagementIntent: [],
  technologyCategories: [],
  careSetting: [],
  riskTolerance: null,
};

type SurveyContextValue = {
  state: OnboardingSurveyState;
  setUserType: (t: UserType) => void;
  setAdoptionReadiness: (v: string[]) => void;
  setEngagementIntent: (v: string[]) => void;
  setTechnologyCategories: (v: string[]) => void;
  setCareSetting: (v: string[]) => void;
  setRiskTolerance: (v: string | null) => void;
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
