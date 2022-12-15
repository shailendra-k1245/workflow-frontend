import { SAVE_TEXTNODE_DATA } from "./action";


export const reducer = (store, { type, payload }) => {
    switch (type) {
        case SAVE_TEXTNODE_DATA:
            return { ...store, textNodeData: payload };
        default:
            return store;
    }
}