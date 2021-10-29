import React from 'react';
import PropTypes from 'prop-types';
import en from './en.json';

export const LocaleContext = React.createContext();

export const LocaleProvider = ({ children }) => (
  <LocaleContext.Provider value={{ locale: en }}>
    {children}
  </LocaleContext.Provider>
);

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
