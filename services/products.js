import { URL } from "./config";



export const getFeaturedProduct = async () => {
    let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/product/features`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        const data = await response.json();
        return data
    } catch (err) {
        console.error('Error fetching data:', err);
        return err
    }
}

export const getTrandingProducts = async () => {
    let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/product/trending`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        const data = await response.json();
        return data
    } catch (err) {
        console.error('Error fetching data:', err);
        return err
    }
}


export const getProducts = async (query,jwtToken) => {
    console.log("sericie",query)
    try {
        const response = await fetch(`${URL}/user/product?${query}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        const data = await response.json();
        return data
    } catch (err) {
        console.error('Error fetching data:', err);
        return err
    }
}

export const getSortProduct = async (data) => {
    console.log("service",data)
    let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/product/${data}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        const data = await response.json();
        return data
    } catch (err) {
        console.error('Error fetching data:', err);
        return err
    }
}

export const getProductByColor = async (value) => {
    console.log("service",value)
    let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/product/by-color/${value}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        const data = await response.json();
        return data
    } catch (err) {
        console.error('Error fetching data:', err);
        return err
    }
}


export const getProductByID = async (value,jwtToken) => {
    console.log("service",value)
    // let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/product/details/${value}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        const data = await response.json();
        return data
    } catch (err) {
        console.error('Error fetching data:', err);
        return err
    }
}


export const getProductReviewByID = async (value,jwtToken) => {
    console.log("service",value)
    // let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/review//${value}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
        const data = await response.json();
        return data
    } catch (err) {
        console.error('Error fetching data:', err);
        return err
    }
}


export const createRating = async (userData) => {
    let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/review/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(userData),
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


export const addToCart = async (userData) => {
    let jwtToken = localStorage.getItem('jwtToken')
    try {
        const response = await fetch(`${URL}/user/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(userData),
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
