const msgInsertOne = (namespace, rowId) => {
    return `${namespace} : A row has been inserted with row ID ${rowId}`;
}

const msgGen = (namespace, whatever) => {
    return `${namespace} : ${whatever}`;
}

export default {
    msgInsertOne,
    msgGen
}