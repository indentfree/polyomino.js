import QUnit from 'qunit';

import * as  polyomino from './polyomino';

import {nextPermutation,rotation,Tile,Board} from './polyomino';




/**
 * Permutation
 */
QUnit.module( "Permutation" );
QUnit.test("nextPermutation good order",function(assert){
    var list=[1,2,3];


    list=polyomino.nextPermutation(list);
    assert.deepEqual(list,[1,3,2],'permutation #2');

    list=polyomino.nextPermutation(list);
    assert.deepEqual(list,[2,1,3],'permutation #3');

    list=polyomino.nextPermutation(list);
    assert.deepEqual(list,[2,3,1],'permutation #4');

    list=polyomino.nextPermutation(list);
    assert.deepEqual(list,[3,1,2],'permutation #5');

    list=polyomino.nextPermutation(list);
    assert.deepEqual(list,[3,2,1],'permutation #6');

    list=polyomino.nextPermutation(list);
    assert.deepEqual(list,null,"permutation #7 does'nt exists")
})

QUnit.test("nextPermutation good number",function(assert){

    var list=[1,2,3,4,5,6,7,8,9];
    var nb=0;
    while(list) {
        nb++;
        list=nextPermutation(list);
    }
    assert.equal(nb,1*2*3*4*5*6*7*8*9,1*2*3*4*5*6*7*8*9+" permutations of 9 elements exists")
})


/**
 * Rotation
 */
QUnit.module( "Rotation" );
QUnit.test("Rotation 90° width height==width",function(assert){

    var shape=[
        ['A','B','C'],
        ['D','.','.'],
        ['.','.','.']
    ];
    var shapeExpected=[
        ['.','D','A'],
        ['.','.','B'],
        ['.','.','C']
    ];

    var shape90=rotation(shape) ;
    assert.deepEqual(shape90,shapeExpected,"Rotation 90° OK")
})

/**
 * Rotation
 */
QUnit.test("Rotation 90° width height<width",function(assert){

    var shape=[
        ['#','#','#'],
        ['#','.','.']
    ];
    var shapeExpected=[
        ['#','#'],
        ['.','#'],
        ['.','#']
    ];

    var shape90=rotation(shape) ;
    assert.deepEqual(shape90,shapeExpected,"Rotation 90° OK")
})


/**
 * Rotation
 */
QUnit.test("Rotation 90° width height>width",function(assert){

    var shape=[
        ['#','.'],
        ['#','.'],
        ['#','#']
    ];
    var shapeExpected=[
        ['#','#','#'],
        ['#','.','.']
    ];

    var shape90=rotation(shape) ;
    assert.deepEqual(shape90,shapeExpected,"Rotation 90° OK")
})


/**
 * Rotation
 */
QUnit.test("Rotation with variable width 1/4",function(assert){
    var udf = undefined;
    var shape=[
        ['#'],
        ['#','#'],
        ['#','#','#']
    ];
    var shapeExpected=[
        ['#','#','#'],
        ['#','#',udf],
        ['#',udf,udf]
    ];

    var shape90=rotation(shape) ;
    assert.deepEqual(shape90,shapeExpected,"Rotation 90° OK")
});


/**
 * Rotation
 */
QUnit.test("Rotation with variable width 2/4",function(assert){
    var udf = undefined;

    var shape=[
        ['#','#','#'],
        ['#','#'],
        ['#',udf]
    ];
    var shapeExpected=[
        ['#','#','#'],
        [udf,'#','#'],
        [udf,udf,'#']

    ];
    var shape90=rotation(shape) ;
    assert.deepEqual(shape90,shapeExpected,"Rotation 90° OK")
});

/**
 * Rotation
 */
QUnit.test("Rotation with variable width 3/4",function(assert){
    var udf = undefined;

    var shape=[
        ['#','#','#'],
        [udf,'#','#'],
        [udf,udf,'#']
    ];
    var shapeExpected=[
        [udf,udf,'#'],
        [udf,'#','#'],
        ['#','#','#']

    ];
    var shape90=rotation(shape) ;
    assert.deepEqual(shape90,shapeExpected,"Rotation 90° OK")
});

/**
 * Rotation
 */
QUnit.test("Rotation with variable width 4/4",function(assert){
    var udf = undefined;

    var shape=[
        [udf,udf,'#'],
        [udf,'#','#'],
        ['#','#','#']
    ];
    var shapeExpected=[
        ['#',udf,udf],
        ['#','#',udf],
        ['#','#','#']
    ];
    var shape90=rotation(shape) ;
    assert.deepEqual(shape90,shapeExpected,"Rotation 90° OK")
});

/**
 * Rotation
 */
QUnit.test("Rotation 180°",function(assert){

    var shape=[
        ['#',],
        ['#',],
        ['#',],
        ['#',],
        ['#',]
    ];
    var shapeExpected=[
        ['#','#','#','#','#']
    ];

    var shape90=rotation(shape) ;
    assert.deepEqual(shape90,shapeExpected,"Rotation 90° OK")

    var shape90=rotation(shape90) ;
    assert.deepEqual(shape90,shape,"Rotation 180° OK")
});

/**
 * Test des pièces
 */
QUnit.module( "Tiles" );
QUnit.test("Tile L",function(assert){
    var tile = new Tile({
        txtShape: [
            '###',
            '#..'
        ]
    });
    assert.equal(tile.getNbBlock(),4,"getNbBlock()");
    assert.equal(tile.getWidth(),3,"getWidth()");
    assert.equal(tile.getHeight(),2,"getHeight()");
    assert.propEqual(tile.getDelta(),{x:0,y:0},"getDelta");

    var blockPos=[
        {x:0 , y:0} ,
        {x:1 , y:0} ,
        {x:2 , y:0} ,
        {x:0 , y:1 }
    ];
    assert.deepEqual(tile.getBlockPosition(),blockPos,"getBlockPosition()");

    /* {x:0 ,y:0} ne doit jamais être vide */
    assert.notEqual(tile.getBlock({x:0 ,y:0}),Tile.EMPTY_BLOCK,"getBlock");

    assert.equal(tile.getBlock({x:0,y:0}),"#","getBlock");
    assert.equal(tile.getBlock({x:1,y:0}),"#","getBlock");
    assert.equal(tile.getBlock({x:0,y:1}),"#","getBlock");
    assert.equal(tile.getBlock({x:1,y:1}),".","getBlock");
});

/**
 * Test des pièces
 *//*
QUnit.test("Tile L with rotation",function(assert){
    var tile = new Tile({
        txtShape: [
            '###',
            '#..'
        ]
    });
    assert.equal(tile.getNbBlock(),4,"getNbBlock()");
    assert.equal(tile.getWidth(),3,"getWidth()");
    assert.equal(tile.getHeight(),2,"getHeight()");
    assert.propEqual(tile.getDelta(),{x:0,y:0},"getDelta");

    var blockPos=[
        {x:0 , y:0} ,
        {x:1 , y:0} ,
        {x:1 , y:1} ,
        {x:1 , y:2}
    ];
    assert.deepEqual(tile.getBlockPosition(90),blockPos,"getBlockPosition()");

    // {x:0 ,y:0} ne doit jamais être vide
    assert.notEqual(tile.getBlock({x:0 ,y:0}),Tile.EMPTY_BLOCK,"getBlock");

    assert.equal(tile.getBlock({x:0,y:0},90),"#","getBlock");
    assert.equal(tile.getBlock({x:1,y:0},90),"#","getBlock");
    assert.equal(tile.getBlock({x:1,y:1},90),"#","getBlock");
    assert.equal(tile.getBlock({x:0,y:1},90),".","getBlock");
});*/

QUnit.test("Tile T",function(assert){
    var tile = new Tile({
        txtShape: [
            '####',
            '.#..'
        ]
    });
    assert.equal(tile.getNbBlock(),5,"getNbBlock()");
    assert.equal(tile.getWidth(),4,"getWidth()");
    assert.equal(tile.getHeight(),2,"getHeight()");
    assert.propEqual(tile.getDelta(),{x:0,y:0},"getDelta");

    var blockPos=[
        {x:0 , y:0} ,
        {x:1 , y:0} ,
        {x:2 , y:0} ,
        {x:3 , y:0} ,
        {x:1 , y:1}
    ];
    assert.propEqual(tile.getBlockPosition(),blockPos,"getBlockPosition()");

    /* {x:0 ,y:0} ne doit jamais être vide */
    assert.notEqual(tile.getBlock({x:0 ,y:0}),Tile.EMPTY_BLOCK,"getBlock");

    assert.equal(tile.getBlock({x:0,y:0}),"#","getBlock");
    assert.equal(tile.getBlock({x:1,y:0}),"#","getBlock");
    assert.equal(tile.getBlock({x:0,y:1}),".","getBlock");
    assert.equal(tile.getBlock({x:1,y:1}),"#","getBlock");
});

QUnit.test("Tile with Negative delta.x",function(assert){
    var tile = new Tile({
        txtShape: [
            '.A',
            '.B',
            '.C',
            'DE'
        ]
    });
    assert.equal(tile.getNbBlock(),5,"getNbBlock()");
    assert.equal(tile.getWidth(),2,"getWidth()");
    assert.equal(tile.getHeight(),4,"getHeight()");
    assert.propEqual(tile.getDelta(),{x:-1,y:0},"getDelta");

    var blockPos=[
        {x:0  , y:0} ,
        {x:0  , y:1} ,
        {x:0  , y:2} ,
        {x:-1 , y:3},
        {x:0  , y:3}
    ];
    assert.propEqual(tile.getBlockPosition(),blockPos,"getBlockPosition()");

    /* {x:0 ,y:0} ne doit jamais être vide */
    assert.notEqual(tile.getBlock({x:0 ,y:0}),Tile.EMPTY_BLOCK,"getBlock");

    assert.equal(tile.getBlock({x:0 ,y:0}),"A","getBlock");
    assert.equal(tile.getBlock({x:0 ,y:1}),"B","getBlock");
    assert.equal(tile.getBlock({x:-1,y:3}),"D","getBlock");
    assert.equal(tile.getBlock({x:-1,y:0}),".","getBlock");
});


/**
 * Test du plateau
 */
QUnit.module( "Board" );
QUnit.test("board",function(assert){
    var board = new Board();

    var tile = new Tile({
        txtShape: [
            '####',
            '.#..'
        ]
    });


    var tryOk=board.tryTile({
        tile:tile,
        position : {x:0,y:0}
    });
    assert.ok(tryOk,"tryTile ok with empty board");


    board.playTile({
        tile:tile,
        position : {x:0,y:0}
    });
    var tryKo=board.tryTile({
        tile:tile,
        position : {x:0,y:0}
    });
    assert.ok(!tryKo,"tryTile ko after play");


    board.removeTile({
        tile:tile,
        position : {x:0,y:0}
    });
    var tryOk2=board.tryTile({
        tile:tile,
        position : {x:0,y:0}
    });
    assert.ok(tryOk2,"tryTile ok after remove");
});


QUnit.test("board",function(assert){
    var board = new Board();

    var tile = new Tile({
        txtShape: [
            '.zz',
            'zzz'
        ]
    });

    board.print();

    console.log(JSON.stringify(
        tile.getBlockPosition()
    ));

    var tryOk=board.tryTile({
        tile:tile,
        position : {x:1,y:0}
    });

    assert.ok(
        tryOk,
        "tryTile ok with empty board");

    var tryKo=board.tryTile({
        tile:tile,
        position : {x:0,y:0}
    });

    assert.ok(
        !tryKo,
        "tryTile ko @(0,0) with delta -1");
});


QUnit.test("board try limit",function(assert){
    var board = new Board();

    var tileSimple = new Tile({
        txtShape: ['#']
    });

    console.log("getBlockPosition",tileSimple.getBlockPosition());

     var tryKoX=board.tryTile({
        tile:tileSimple,
        position : {x:5,y:0}
    });

    assert.ok(
        !tryKoX,
        "tryTile ko X");

     var tryKoY=board.tryTile({
        tile:tileSimple,
        position : {x:1,y:3}
    });

    assert.ok(
        !tryKoY,
        "tryTile ko Y");
});





QUnit.test("Level Normal 170",function(assert){

    var T0 = new Tile({
        txtShape: [
            '000',
						'.0'
        ]
    });
    var T1 = new Tile({
        txtShape: [
            '1',
            '1'
        ]
    });
    var T2 = new Tile({
        txtShape: [
            '.22',
            '22'
        ]
    });
    var T3 = new Tile({
        txtShape: [
            '33333'
        ]
    });
    var T4 = new Tile({
        txtShape: [
            '4444444'
        ]
    });
    var T5 = new Tile({
        txtShape: [
            '555',
            '..5'
        ]
    });
    var T6 = new Tile({
        txtShape: [
            '6666'
        ]
    });


    var board = new Board({width:10,height:3});
    board.addTile(T0);
    board.addTile(T1);
    board.addTile(T2);
    board.addTile(T3);
    board.addTile(T4);
    board.addTile(T5);
    board.addTile(T6);

    var nbsolution=board.solve();
    assert.equal(nbsolution,1,'Board with 1 solution');
    assert.equal(board.permutationSolution[0],"[0,6,5,1,2,3,4]","valid permutation");

    console.log(board.permutationSolution);
});

QUnit.test("Level Normal 173",function(assert){

    var T0 = new Tile({
        txtShape: [
            '00000'
        ]
    });
    var T1 = new Tile({
        txtShape: [
            '11',
            '.111'
        ]
    });
    var T2 = new Tile({
        txtShape: [
            '2222'
        ]
    });
    var T3 = new Tile({
        txtShape: [
            '.3',
            '333'
        ]
    });
    var T4 = new Tile({
        txtShape: [
            '44',
            '44'
        ]
    });
    var T5 = new Tile({
        txtShape: [
            '5',
            '55'
        ]
    });
    var T6 = new Tile({
        txtShape: [
            '666',
            '.66'
        ]
    });


    var board = new Board({width:10,height:3});
    board.addTile(T0);
    board.addTile(T1);
    board.addTile(T2);
    board.addTile(T3);
    board.addTile(T4);
    board.addTile(T5);
    board.addTile(T6);

    var nbsolution=board.solve();
    assert.equal(nbsolution,1,'Board with 1 solution');
    assert.equal(board.permutationSolution[0],"[2,3,6,4,5,1,0]","valid permutation");

    console.log(board.permutationSolution);
});


QUnit.test("Level Normal 224",function(assert){

    var T0 = new Tile({
        txtShape: [
            '0',
            '00',
            '.0',
            '.0'
        ]
    });
    var T1 = new Tile({
        txtShape: [
            '1',
            '1',
            '1'
        ]
    });
    var T2 = new Tile({
        txtShape: [
            '22',
            '22'
        ]
    });
    var T3 = new Tile({
        txtShape: [
            '..3',
            '333'
        ]
    });
    var T4 = new Tile({
        txtShape: [
            '4',
            '4',
            '4',
            '4'
        ]
    });
    var T5 = new Tile({
        txtShape: [
            '.5',
            '55',
            '5'
        ]
    });
    var T6 = new Tile({
        txtShape: [
            '666',
            '.6'
        ]
    });


    var board = new Board({width:4,height:7});
    board.addTile(T0);
    board.addTile(T1);
    board.addTile(T2);
    board.addTile(T3);
    board.addTile(T4);
    board.addTile(T5);
    board.addTile(T6);

    var nbsolution=board.solve();
    assert.equal(nbsolution,1,'Board with 1 solution');
    assert.equal(board.permutationSolution[0],"[6,4,1,5,0,2,3]","valid permutation");

    console.log(board.permutationSolution);
});



QUnit.test("Level Expert 34",function(assert){

    var T0 = new Tile({
        txtShape: [
            '.0.',
            '000',
            '...'
        ]
    });
    var T1 = new Tile({
        txtShape: [
            '.1',
            '11'
        ]
    });
    var T2 = new Tile({
        txtShape: [
            '2..',
            '2..',
            '2..'
        ]
    });
    var T3 = new Tile({
        txtShape: [
            '33333',
            '.....',
            '.....',
            '.....',
            '.....'
        ]
    });
    var T4 = new Tile({
        txtShape: [
            '44',
            '44'
        ]
    });
    var T5 = new Tile({
        txtShape: [
            '5..',
            '555',
            '...',
        ]
    });
    var T6 = new Tile({
        txtShape: [
            '666',
            '..6',
            '..6'
        ]
    });
    var T7 = new Tile({
        txtShape: [
            '7777'
        ]
    });
    var board = new Board({width:8,height:4});
    board.addTile(T0);
    board.addTile(T1);
    board.addTile(T2);
    board.addTile(T3);
    board.addTile(T4);
    board.addTile(T5);
    board.addTile(T6);
    board.addTile(T7);

    var nbsolution=board.solve();
    assert.equal(nbsolution,'1','Board with 1 solution');
    assert.equal(board.permutationSolution[0],"[2,4,3,1,5,6,0,7]","valid permutation");
    console.log(board.permutationSolution);
});

//QUnit.skip("Level Expert 35",function(assert){
QUnit.test("Level Expert 35",function(assert){

    var T0 = new Tile({
        txtShape: [
            '00'
        ]
    });
    var T1 = new Tile({
        txtShape: [
            '11',
            '11'
        ]
    });
    var T2 = new Tile({
        txtShape: [
            '2',
            '22',
            '2'
        ]
    });
    var T3 = new Tile({
        txtShape: [
            '3',
            '33'
        ]
    });
    var T4 = new Tile({
        txtShape: [
            '.4',
            '444',
            '.4'
        ]
    });
    var T5 = new Tile({
        txtShape: [
            '5',
            '5',
            '5',
            '5'
        ]
    });
    var T6 = new Tile({
        txtShape: [
            '.6',
            '.6',
            '.6',
            '66',
            '.6',
        ]
    });
    var T7 = new Tile({
        txtShape: [
            '777',
            '..7'
        ]
    });

    var board = new Board({width:4,height:8});
    board.addTile(T0);
    board.addTile(T1);
    board.addTile(T2);
    board.addTile(T3);
    board.addTile(T4);
    board.addTile(T5);
    board.addTile(T6);
    board.addTile(T7);

    var nbsolution=board.solve();
    assert.equal(nbsolution,1,'Board with 1 solution');
    //assert.equal(board.permutationSolution[0],"[2,4,3,1,5,6,0,7]","valid permutation");
    assert.equal(board.permutationSolution[0],"[2,7,4,0,6,5,1,3]","valid permutation");

    console.log(board.permutationSolution);
});



QUnit.test("Level Expert 44",function(assert){

    var T0 = new Tile({
        txtShape: [
            '0000'
        ]
    });
    var T1 = new Tile({
        txtShape: [
            '11111'
        ]
    });
    var T2 = new Tile({
        txtShape: [
            '222'
        ]
    });
    var T3 = new Tile({
        txtShape: [
            '3',
            '33',
            '3'
        ]
    });
    var T4 = new Tile({
        txtShape: [
            '.44',
            '44'
        ]
    });
    var T5 = new Tile({
        txtShape: [
            '.5',
            '55'
        ]
    });
    var T6 = new Tile({
        txtShape: [
            '...6',
            '6666'
        ]
    });
    var T7 = new Tile({
        txtShape: [
            '7',
            '7'
        ]
    });


    var board = new Board({width:6,height:5});
    board.addTile(T0);
    board.addTile(T1);
    board.addTile(T2);
    board.addTile(T3);
    board.addTile(T4);
    board.addTile(T5);
    board.addTile(T6);
    board.addTile(T7);

    var nbsolution=board.solve();
    assert.equal(nbsolution,1,'Board with 1 solution');
    assert.equal(board.permutationSolution[0],"[1,7,0,6,3,5,4,2]",board.permutationSolutionString[0]);

    console.log(board.permutationSolution);
});


