export interface CreateBookDto{
    title: string,
    author: string,
    publication_year: number,
    status: string,
    user_id: number
}

export interface BookDto{
    id: number,
    title: string,
    author: string,
    publication_year: number,
    status: string,
    created_at: Date ,
    updated_at: Date,
    user_id: number
}

export interface UpdateBookDto{
    title: string,
    author: string,
    publication_year: number,
    status: string,
    user_id: number
}