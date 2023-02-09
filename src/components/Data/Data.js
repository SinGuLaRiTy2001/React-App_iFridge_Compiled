export const nav = [
    {
        text: "home",
        path: "/",
    },
    {
        text: "Ingredient",
        path: "/Ingredient",
    },
    {
        text: "dish",
        path: "/dish",
    },
    {
        text: "Recipe",
        path: "/Recipe",
    }
]
export const meat = [
    {
        name: "Lamb",
        img: "./image/Lamb.png",
        date: "16 January",
        num: "3"
    },
    {
        name: "Steak",
        img: "./image/Steak.jpg",
        date: "12 January",
        num: "1"
    }
]

export const vege = [
    {
        name: "Cabage",
        img: "./image/Cabage.jpeg",
        date: "17 January",
        num: "2"
    },
    {
        name: "Tomato",
        img: "./image/Tomato.jpg",
        date: "17 January",
        num: "1"
    }
]

export const frui = [
    {
        name: "Apple",
        img: "./image/Apple.jpg",
        date: "15 January",
        num: "3"
    },
    {
        name: "Orange",
        img: "./image/Orange.jpg",
        date: "16 January",
        num: "5"
    }
]

export const dish =[
    {
        name: "Fried Cabbage",
        img: "./image/Fried_Cabbage.jpg",
        description: "Ingredient Needed: Cabbage"
    },
    {
        name: "Pan-fried Steak",
        img: "./image/Pan_fried_Cabbage.jpg",
        description: "Ingredient Needed: Steak"
    }
]
export const dish_like=[
    {
        name: "Tomato Omelette",
        img: "./image/Tomato_Omelette.jpg",
        description: "Ingredient Needed: Tomato, Egg"
    }
]
/*
export default function (state = items, cate, action) {
switch (action.type) {
    case 'addnum':
        let addlist = state.cate
        addlist.map((item, index) => {
            if (item.name == action.name) {
                item.num++
            }
        })
        return Object.assign({}, state, {cate: [...addlist]})
    case 'delnum':
        let dellist = state.cate
        dellist.map((item, index) => {
            if (item.name == action.name) {
                item.num--
            }
        })
        return Object.assign({}, state, {cate: [...dellist]})
}
}*/
