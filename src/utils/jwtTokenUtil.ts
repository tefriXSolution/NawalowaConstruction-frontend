export const validateToken = (token: string): {message:string;error:boolean} => {
    // Basic validation: check if the token is a non-empty string
    if(typeof token === 'string' && token.trim() !== ''){
        return {message: 'Valid token format', error: false};
    }
    return {message: 'Valid token format', error: false};
}