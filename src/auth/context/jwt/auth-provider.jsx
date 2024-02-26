import PropTypes from 'prop-types';
import { useMemo, useState, createContext } from 'react';

import { getAuthInfo } from 'src/utils/AuthUtil';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState(getAuthInfo() || {});

  // ----------------------------------------------------------------------

  const memorizable = useMemo(() => ({ authInfo, setAuthInfo }), [authInfo])

  return <AuthContext.Provider value={memorizable}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
