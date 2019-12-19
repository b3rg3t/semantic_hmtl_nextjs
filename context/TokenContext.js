import React, {createContext} from 'react';

export const TokenContext = createContext();

const TokenContextProvider = () =>{
    return (
        <TokenContext.provider value={{token: "token"}}>
            {...props}
        </TokenContext.provider>
    )
}
export default TokenContextProvider;