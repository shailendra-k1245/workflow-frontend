export const SAVE_TEXTNODE_DATA = "SAVE_TEXTNODE_DATA"

export const saveTextNodeData = (data) => {
    return {
        type: SAVE_TEXTNODE_DATA,
        payload: data
    }
}