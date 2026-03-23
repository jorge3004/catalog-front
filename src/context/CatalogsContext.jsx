import React, { createContext, useContext } from 'react';
import useCatalogs from '../hooks/catalog/useCatalogs';

const CatalogsContext = createContext(null);

export const CatalogsProvider = ({ children }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const catalogsState = useCatalogs(token);
    return (
        <CatalogsContext.Provider value={catalogsState}>
            {children}
        </CatalogsContext.Provider>
    );
};

export const useCatalogsContext = () => useContext(CatalogsContext);