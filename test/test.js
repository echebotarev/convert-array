let assert = require('assert');
let convert = require('../convert-array-for-trend');

describe('convert', function() {

    it('преобразовывает [1,2,3,4,5,6,7,8] ->"1-8"', function() {
        assert.equal(convert([1,2,3,4,5,6,7,8]), '1-8');
    });

    it('преобразовывает [1,3,4,5,6,7,8] -> "1,3-8"', function() {
        assert.equal(convert([1,3,4,5,6,7,8]), '1,3-8');
    });

    it('преобразовывает [1,3,4,5,6,7,8,10,11,12] -> "1,3-8,10-12"', function() {
        assert.equal(convert([1,3,4,5,6,7,8,10,11,12]), '1,3-8,10-12');
    });

    it('преобразовывает [1,2,3] -> "1-3"', function() {
        assert.equal(convert([1,2,3]), '1-3');
    });

    it('преобразовывает [1,2] -> "1,2"', function() {
        assert.equal(convert([1,2]), '1,2');
    });

    it('преобразовывает [1,2,4] -> "1,2,4"', function() {
        assert.equal(convert([1,2,4]), '1,2,4');
    })

});