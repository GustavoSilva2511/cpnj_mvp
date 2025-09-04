export const getCredits = async () => {
    const url = 'https://api.listacnae.com.br/v1/creditosAtivos';
    const bearerToken: string | undefined = import.meta.env.VITE_TOKEN_API;

    const q = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${bearerToken}`
        }
    };
    try {
        const response = await fetch(url,q);
        const data = await response.json();
        const credits = data.creditos.disponivel;
        return credits;
    } catch (error) {
        console.log(error)
        return 0;
    }
}