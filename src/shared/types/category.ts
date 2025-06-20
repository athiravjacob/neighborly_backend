export interface category{
    _id:string,
    category:string
}

export interface subCategory{
    _id:string,
    categoryId: string,
    subCategory: string,
    minDuration: number,
    maxDuration:number
}