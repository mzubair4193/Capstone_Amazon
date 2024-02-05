const GET_ALL_PRODUCTS_CATEGORY = "category/getAllProductsCategory"

const getAllProductsCategory = (products) => {
    return {
        type: GET_ALL_PRODUCTS_CATEGORY,
        products
    }
}

export const thunkGetProductsForCategory = (category) => async(dispatch) => {

    const response = await fetch(`/api/products/category/${category}`);

    if (response.ok) {
        const products = await response.json();

        dispatch(getAllProductsCategory(products));

        return products;
    } else {
        return { errors: "Could not get products by category" };
    }
}

function categoryReducer(state= {}, action){
    switch(action.type) {
        case GET_ALL_PRODUCTS_CATEGORY: {
            let products = action.products.products;
            let category = action.products.Category;

            const newState = { ...state };
            newState[category] = [...products]

            return newState;

        }
        default:
            return state;
    }
}

export default categoryReducer