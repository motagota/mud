const {Entity, EntityDB} = require('./Entity.js');

const ItemType =[WEAPON, ARMOR, HEALING]

class Item extends Entity {
    constructor(type, max, min, speed, price, attributes){
        this.m_type = type;
        this.m_max = max;
        this.m_min = min;
        this.m_speed = speed;
        this.m_price = price;
        this.m_atttributes = attributes;
    }
}

class ItemDB extends EntityDB{

}

module.exports = {
    Item,
    ItemDB
}