let uniqueIdCounter = 0;

function uniqueId(): string {
    return "id_" + (++uniqueIdCounter);
}

export { uniqueId };