// import { Principal, Canister, query, update, Variant, text, nat64, Opt, Record, Vec, StableBTreeMap, ic } from "azle";

// // Define Seller Record
// const Seller = Record({
//     companyName: text,
//     contactPerson: text,
//     email: text,
//     passwordHash: text // Consider storing a hash of the password for security
// });

// // Use 'typeof Seller' to refer to the Seller type
// type SellerType = typeof Seller._;

// // Initialize stable storage for sellers
// const sellersStorage = StableBTreeMap<Principal, SellerType>(0, Principal, Seller);

// export default Canister({
//     registerSeller: update((companyName: string, contactPerson: string, email: string, password: string): string => {
//         const caller = ic.caller();
//         const passwordHash = hashPassword(password); // Implement hashPassword function based on your chosen hashing algorithm

//         // Create a seller instance with the provided information
//         const seller: SellerType = {
//             companyName,
//             contactPerson,
//             email,
//             passwordHash
//         };

//         // Insert the seller information into the stable storage
//         sellersStorage.insert(caller, seller);

//         return "Seller registered successfully";
//     }),

//     // Function to retrieve seller information based on Principal
//     getSellerInfo: query((principal: Principal): Opt<SellerType> => {
//         return sellersStorage.get(principal);
//     })
// });

// // Example hashing function (implement a secure hashing mechanism)
// function hashPassword(password: string): string {
//     // Placeholder for hashing functionality
//     return `hashed_${password}`;
// }



import { query, update, text, Principal, Record, Vec, Opt, StableBTreeMap, None, Some, Canister, bool } from "azle";

// Define a Product record with relevant fields
const Product = Record({
    productId: text,
    name: text,
    description: text,
    price: text,
    inStock: bool
});

// Define a Shop record to store shop information and its products
const Shop = Record({
    shopId: text,
    owner: Principal,
    name: text,
    description: text,
    products: Vec(Product)
});

// Stable storage for Shops and Products
const ShopStorage = StableBTreeMap(0, text, Shop);

export default Canister({
    // Register a new shop or update an existing one
    registerShop: update([Principal, text, text, text], text, (owner, shopId, name, description) => {
        const newShop = { shopId, owner, name, description, products: [] };
        ShopStorage.insert(shopId, newShop);
        return "Shop registered or updated successfully";
    }),
    
    // Add a product to a specific shop
    addProductToShop: update([text, Product], text, (shopId, product) => {
        const shopOpt = ShopStorage.get(shopId);
        if (shopOpt === undefined || "None" in shopOpt) {
            return "Shop not found";
        }

        const shop = shopOpt.Some;
        shop.products.push(product);
        ShopStorage.insert(shopId, shop);

        return "Product added to shop successfully";
    }),

    // Get products from a specific shop
    getProducts: query([text], Opt(Vec(Product)), (shopId) => {
        const shopOpt = ShopStorage.get(shopId);
        if (shopOpt === undefined || "None" in shopOpt) {
            return None;
        }

        return Some(shopOpt.Some.products);
    }),

    // Dashboard: Retrieve details and products of a shop
    getShopDetails: query([text], Opt(Shop), (shopId) => {
        return ShopStorage.get(shopId);
    }),

    // Optional: Get all shops - useful for a general overview or administrative purposes
    getAllShops: query([], Vec(Shop), () => {
        return ShopStorage.values();
    })
});


