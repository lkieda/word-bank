Array.prototype.getRandomElement = function(){
    return this[Math.floor(Math.random()*this.length)];
}