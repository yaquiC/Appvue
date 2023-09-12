
export interface GetUser {
    id: number
    name: string
    lastName: string
    age: number
    gender: string
    email: string
    password: string
    isActive: boolean
    rol:{
        id:number
        rol:string
        isActive: boolean
    }
    rolId:number

}

export interface CreateUser{
    name:string
    lastName:string
    age:number
    gender:string
    email:string
    password:string
    isActive:boolean
    rolId:number
}

export interface UpdateUser{
    id:number
    name:string
    lastName:string
    age:number
    email:string
    isActive:boolean
    rolId:number
}

export interface PaginationUser {
    users: GetUser[];
    total: number;
    totalPages: number;
    nextPage:number;
    prevPage:number;
    currentPage:number
}

