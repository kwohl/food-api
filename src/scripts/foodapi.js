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
    <h3>${food.name}</h3>
    <ul>
    <li>${food.category}</li>
    <li>${food.ethnicity}</li>
    </ul>
    </div>
    `;
}

const addFood = (foodHtml) => {
    const containter = document.querySelector('.foodList');
    // const foodHtml = foodFactory(food);
    containter.innerHTML += foodHtml;
}