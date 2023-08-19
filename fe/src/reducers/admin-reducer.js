const initialState = {
    admin: null
}

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "adminsuccessLogin":
            return {
                admin: action.payload
            }
        case "adminerrorLogin":
            return initialState;
        default:
            return state;
    }
}
