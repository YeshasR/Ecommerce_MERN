const initialState = {
    user: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "usersuccessLogin":
            console.log("Payload:", action.payload);
            return {
                user: action.payload,
            }
        case "usererrorLogin":
            return initialState;
        default:
            return state;
    }
}
