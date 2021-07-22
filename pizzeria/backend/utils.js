const moment = require('moment')

// Transform the Order Object
const transformOrder = (ret_data) =>{
    const return_array = [];
    ret_data.rows.forEach(item=>{
        const exists = return_array.filter(element=>element.id == item.id).length
        const order_items_array = []
        const order_item_object = {
            quantity: item.quantity,
            pizza_name: item.name,
            unit_price: item.unit_price
        }
        if(exists > 0){
            // Means we are appending
            return_array.forEach(element=>{
                if(item.id == element.id){
                    element.order_items.push(order_item_object);
                }
            })
        }else{
            // The order Item
            order_items_array.push(order_item_object)
            // we are creating a new entry
            const return_obj = {
                id: item.id,
                customer_name: item.customer_name,
                gross_total: item.gross_total,
                order_date: moment(item.order_date).format("dddd, MMMM Do YYYY"),
                order_items: order_items_array
            }
            return_array.push(return_obj);
        }
    })
    return return_array;
}

module.exports = { transformOrder }