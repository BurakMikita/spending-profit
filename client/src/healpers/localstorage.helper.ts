export function getTokenFromLocalStorege (): string{
    const data = localStorage.getItem("token")
       const token = data ?  JSON.parse(data) : ""

       return token
}

export function setTokenToLocaStorege (key: string, token: string){
   localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorege(key: string){
    localStorage.removeItem(key)
}