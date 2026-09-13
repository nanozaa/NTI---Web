function calculateShipping(weight) {
    return new Promise((resolve, reject) => {
        if (weight <= 0) {
            reject(new Error("Invalid weight"));
        } else {
            resolve(weight * 5);
        }
    });
}

calculateShipping(10)
    .then(cost => console.log(`Shipping cost: ${cost}`))
    .catch(error => console.log(error.message));

calculateShipping(-2)
    .then(cost => console.log(`Shipping cost: ${cost}`))
    .catch(error => console.log(error.message));
