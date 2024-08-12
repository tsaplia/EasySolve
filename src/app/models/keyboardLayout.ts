export interface KeyboardLayout {
    name: string
    keys: Key[]
}

export interface Key {
    config: KeyConfig[] 
    colClass: string
}

export interface KeyConfig { 
    label?: string, // default value - <text>
    text: string, 
    cmd?: "cmd" | "write" | "keystroke" // default value - "cmd"
}