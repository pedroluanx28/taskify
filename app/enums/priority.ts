export enum priority {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}

export const priorityMessages = {
    [priority.LOW]: "Baixa",
    [priority.MEDIUM]: "Média",
    [priority.HIGH]: "Alta",
}

export const priorityColors = {
    [priority.LOW]: "#dabdee",
    [priority.MEDIUM]: "#BA83DE",
    [priority.HIGH]: "#A239CA",
}