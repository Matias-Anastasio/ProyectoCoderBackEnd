import fs from 'fs/promises'

export class ProductsManager{
    
    constructor(){
        this.filePath = "./data/products.json"
    }

    async productId(){
        const products = await this.getProducts()
        if(products.length === 0) return 1 
        const IDs = products.map(product=>product.id)
        const max = Math.max(...IDs)
        return max+1
    }

    async writeFile(products){
        const productsJson = JSON.stringify(products)
        try{
            await fs.writeFile(this.filePath,productsJson,'utf-8')
        }catch(error){
            console.log("error de escritura: ", error)
        }
    }

    async getProducts(limit){
        try {
            let products = []
            if(await fs.access(this.filePath).then(()=>true).catch(()=>false)){
                const fileContent = await fs.readFile(this.filePath,"utf8")
                products = JSON.parse(fileContent)
                if(limit){
                    products = products.slice(0,limit)
                }
                return products
            }
        }catch(error){
            console.log("error al leer el archivo")
        }
        return []
    }

    async getProductById(id){
        const products = await this.getProducts()
        const productFound = products.find(product => product.id === id)
        if(productFound){
            return productFound
        }else{
            return "Not found"
        }
    }

    async addProduct(prod){
        const products = await this.getProducts()

        if(!prod.title || !prod.description || !prod.price || prod.status===undefined || !prod.category || !prod.code || !prod.stock){
            return "Todos los campos son obligatorios"
        }else if(products.some(product => product.code === prod.code)){
            return "El codigo del producto es repetido"
        }else{
            prod.status = prod.status ?? true
            const product = {...prod,"id": await this.productId()}
            products.push(product)
        }
        this.writeFile(products)
        return {message:"producto agregado con éxito"}
    }

    async updateProduct(id,updatedProduct){
        const products = await this.getProducts()
        const product = await this.getProductById(id)
        const index = products.findIndex(product=>product.id===id)
        if(product==="Not found"){
            return "Not found"
        }
        product.title = updatedProduct.title || product.title
        product.description = updatedProduct.description || product.description
        product.price = updatedProduct.price || product.price
        product.thumbnail = updatedProduct.thumbnail || product.thumbnail
        product.code = updatedProduct.code || product.code
        product.stock = updatedProduct.stock || product.stock
        product.status = updatedProduct.status || product.status
        product.category = updatedProduct.category || product.category
        
        products.splice(index,1,product)
        this.writeFile(products)
        return {message:"producto modificado con éxito"}
    }

    async deleteProduct(id){
        const products = await this.getProducts()
        const product = await this.getProductById(id)
        const index = products.findIndex(product=>product.id===id)

        if(product==="Not found"){
            return "Not found"
        }

        products.splice(index,1)
        this.writeFile(products)
        return {message:"producto eliminado con éxito"}
    }

}
