if (!Array.prototype.count){
    Array.prototype.count = function (fn) {
        'use strict';
        if ( ! ((typeof fn === 'Function' || typeof fn === 'function') && this) )
        throw new TypeError();

        return this.filter(fn).length
    };
}

if (!Array.prototype.isEmpty){
    Array.prototype.isEmpty = function () {
        'use strict';
        if (!this)
        throw new TypeError();

        return this.length === 0
    };
}