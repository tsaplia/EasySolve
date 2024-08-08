export interface KeyboardLayout {
    name: string
    icon?: string
    keys: Key[]
}

export interface Key {
    text: string[] // displayed text; 0 - general letter, 1 - capital letter
    command: string[] // 0 - general letter, 1 - capital letter
    colClass: string
}
