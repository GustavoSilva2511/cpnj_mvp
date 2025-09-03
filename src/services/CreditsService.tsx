export const getCredits = async () => {
    const url = 'https://api.listacnae.com.br/v1/creditosAtivos';
    const bearerToken: string | undefined = '198EE5B2AC1-7F49DC5513A3927D-3CIH2YN9SSJVDAFWTDT1U5HNS6ZKJECI';

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