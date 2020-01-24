// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
//             console.log(food);
//             const foodAsHTML = foodFactory(food)
//             addFood(foodAsHTML)
//         })
//     });


    fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }
                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                    } else {
                        food.coutries = "no countries listed"
                    }
                    if (productInfo.product.nutriments['energy-kcal_value']) {
                        food.calories = productInfo.product.nutriments['energy-kcal_value']
                    } else {
                        food.calories = "no calorie information available"
                    }
                    if (productInfo.product.nutriments.fat_serving) {
                        food.fat = productInfo.product.nutriments.fat_serving
                    } else {
                        food.fat = "no fat information available"
                    }
                    if (productInfo.product.nutriments.sugars_serving) {
                        food.sugar = productInfo.product.nutriments.sugars_serving
                    } else {
                        food.sugar = "no sugar content information available"
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFood(foodAsHTML)
                })
        })
    })



const foodFactory = (food) => {
    return `
    <div class="foodCard">
    <h3>${food.name}</h3>
    <ul>
    <li><strong>Category:</strong> ${food.category}</li>
    <li><strong>Ethnicity:</strong> ${food.ethnicity}</li>

    <li><strong>Ingredients:</strong> ${food.ingredients}</li>
    <li><strong>Country of Origin:</strong> ${food.countries}</li>
    <li><strong>Calories:</strong> ${food.calories}</li>
    <li><strong>Fat per Serving:</strong> ${food.fat}</li>
    <li><strong>Sugar per Serving:</strong> ${food.sugar}</li>
    </ul>
    </div>
    `;
}

const addFood = (foodHtml) => {
    const containter = document.querySelector('.foodList');
    // const foodHtml = foodFactory(food);
    containter.innerHTML += foodHtml;
}