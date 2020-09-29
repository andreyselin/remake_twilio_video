import React, { createContext, useContext, useReducer, useState } from 'react';
import { TwilioError } from 'twilio-video';
import { settingsReducer, initialSettings, Settings, SettingsAction } from './settingsReducer';

export const StateContext = createContext(null);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks fron being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export function AppStateProvider(props) {
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [activeSinkId, setActiveSinkId] = useState('default');
    const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);

    const fetchToken = async (identity, roomName) => {
        const headers = new window.Headers();
        const params = new window.URLSearchParams({ identity, roomName });
        const url = `${ process.env.REACT_APP_API }/token?${ params }`;
        console.log('url:', url);
        const result = await fetch(url, { headers })
            .then(res => res.text());
        console.log('Result:', result);
        return result;
    };

    const getToken = async (identity, roomName) => {
        setIsFetching(true);
        return fetchToken(identity, roomName)
            .then(res => {
                setIsFetching(false);
                return res;
            })
            .catch(err => {
                setError(err);
                setIsFetching(false);
                return Promise.reject(err);
            });
    };

    const contextValue = {
        error,
        setError,
        isFetching,
        activeSinkId,
        setActiveSinkId,
        settings,
        dispatchSetting,
        getToken
    };

    return <StateContext.Provider value={{ ...contextValue }}>{props.children}</StateContext.Provider>;
}

export function useAppState() {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useAppState must be used within the AppStateProvider');
    }
    return context;
}
