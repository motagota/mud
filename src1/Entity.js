'use strict';
class Entity{
    constructor(){
        this.name = "UNDEFINED";
        this.id = -1;
        
    }

    CompName(){ return this.name.toLowerCase()}
    FullMatch(p_name){ return this.CompName() == p_name.toLowerCase();}
    Match( p_name){ 
      
        const regex = new RegExp(`\\b${p_name.toLowerCase()}`, 'i'); // \b matches word boundaries, 'i' for case-insensitive
        return regex.test(this.CompName());
    
    }
}

class EntityDB{
    has(entity_id){};
    has(entity_str){};
    hasfull(entity_str){};
    find(entity_id){};
    find(entity_str){};
    findfull(entity_str){};
    get(entity_id){};
    size(){};
}

module.exports = {
    Entity,
    EntityDB
}