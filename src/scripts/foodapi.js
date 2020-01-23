fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            console.log(food);
            const foodAsHTML = foodFactory(food)
            addFood(foodAsHTML)
        })
    });


const foodFactory = (food) => {
    return `
    <div class="foodCard">
    <h2>${food.name}</h2>
    <h4>${food.category}</h4>
    <h4>${food.ethnicity}</h4>
    </div>
    `;
}

const addFood = (foodHtml) => {
    const containter = document.querySelector('.foodList');
    // const foodHtml = foodFactory(food);
    containter.innerHTML += foodHtml;
}