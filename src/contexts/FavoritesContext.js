import React, { useState, createContext } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = props => {
    const [recipeFavorites, setRecipeFavorites] = useState(["I am the favorites provider"]);

    return (
        <FavoritesContext.Provider value={[recipeFavorites, setRecipeFavorites]}>
            {props.children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContext;
