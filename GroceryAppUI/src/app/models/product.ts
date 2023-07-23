export interface Product{
    id: number,
    productName:string,
    productCategory: string,
    productDescription: string,
    productPrice: number,
    productImage?: string,
    availableQuantity: number,
    discount: number,
    specification:string,
    ImageFile?:File

}