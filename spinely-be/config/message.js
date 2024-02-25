const msgInsertOne = (namespace, rowId) => {
    return `${namespace} : A row has been inserted with row ID ${rowId}`
}

export default {
    msgInsertOne
}