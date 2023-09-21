import { URL } from "./config";



export const getUserCartById = async (id,jwtToken) => {
    // let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/cart/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${jwtToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
        return err;
    }
};


export const deleteUserCartById = async (id,jwtToken) => {
    // let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/cart/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${jwtToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
        return err;
    }
};
