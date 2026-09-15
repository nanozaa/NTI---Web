const products = {
    1: "Laptop",
    2: "Phone",
    3: "Tablet"
};

function getProduct(id) {
    return new Promise((resolve, reject) => {
        const product = products[id];

        if (product) {
            resolve(product);
        } else {
            reject(new Error("Product not found"));
        }
    });
}

getProduct(2)
    .then(product => console.log(product))
    .catch(error => console.log(error.message));

getProduct(4)
    .then(product => console.log(product))
    .catch(error => console.log(error.message));
