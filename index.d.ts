declare type Update = {
    [key: string]: any
    update_id: number
    message?: Message
}

declare type Message = {
    [key: string]: any
    message_id: number
    from: User
    chat: Chat
    date: number
    text: string
}

declare type User = {
    id: number
    first_name: string
    username: string
    [key: string]: any
}

declare type Chat = {
    id: number
    title: string
    type: "private" | "group" | "supergroup" | "channel"
    [key: string]: false
}
