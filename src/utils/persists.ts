export const AddToken = (access_token: string) =>{
    localStorage.setItem("access_token", access_token)
};

export const RemoveToken = () => {
    localStorage.removeItem("access_token")
};

export const GetToken = () => {
    return localStorage.getItem("access_token")
};

export const IsAuth = () =>{
    return GetToken() ? true : false
};
