// TODO // http://ariya.ofilabs.com/2013/10/code-coverage-of-qunit-tests-using-istanbul-and-karma.html
// TODO // Logger
// TODO // html render

/*
from : http://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order

There are many ways to systematically generate all permutations of a given sequence.
One classical algorithm, which is both simple and flexible, is based on finding the next permutation in lexicographic ordering, if it exists.
It can handle repeated values, for which case it generates the distinct multiset permutations each once.
Even for ordinary permutations it is significantly more efficient than generating values for the Lehmer code in lexicographic order (possibly using the factorial number system) and converting those to permutations.

To use it :
one starts by sorting the sequence in (weakly) increasing order (which gives its lexicographically minimal permutation),
and then repeats advancing to the next permutation as long as one is found.
The method goes back to Narayana Pandita in 14th century India, and has been frequently rediscovered ever since.

The following algorithm generates the next permutation lexicographically after a given permutation. It changes the given permutation in-place.

STEP 1 : Find the largest index k such that a[k] < a[k + 1]. If no such index exists, the permutation is the last permutation.
STEP 2 : Find the largest index l greater than k such that a[k] < a[l].
STEP 3 : Swap the value of a[k] with that of a[l].
STEP 4 : Reverse the sequence from a[k + 1] up to and including the final element a[n].

For example, given the sequence [1, 2, 3, 4] which starts in a weakly increasing order, and given that the index is zero-based, the steps are as follows:

Index k = 2, because 3 is placed at an index that satisfies condition of being the largest index that is still less than a[k + 1] which is 4.
Index l = 3, because 4 is the only value in the sequence that is greater than 3 in order to satisfy the condition a[k] < a[l].
The values of a[2] and a[3] are swapped to form the new sequence [1,2,4,3].
The sequence after k-index a[2] to the final element is reversed. Because only one value lies after this index (the 3), the sequence remains unchanged in this instance. Thus the lexicographic successor of the initial state is permuted: [1,2,4,3].
Following this algorithm, the next lexicographic permutation will be [1,3,2,4], and the 24th permutation will be [4,3,2,1] at which point a[k] < a[k + 1] does not exist, indicating that this is the last permutation.
*/
export  function nextPermutation(list) {
    var k,l;

    /* STEP 1 : Find the largest index k such that a[k] < a[k + 1]. */
    for (var i=0; i< list.length; i++) {
        if (list[i] < list[i+1]) {
            k=i;
        }
    }

    /* If no such index exists, the permutation is the last permutation. */
    if (k==null) {
        return null;
    }

    /* STEP 2 : Find the largest index l greater than k such that a[k] < a[l]. */
    for (var i=0; i< list.length; i++) {
        if (list[k] < list[i]) {
            l=i;
        }
    }

    /* STEP 3 : Swap the value of a[k] with that of a[l]. */
    var item_k=list[k];
    var item_l=list[l];
    list[k]=item_l;
    list[l]=item_k;

    /* STEP 4 : Reverse the sequence from a[k + 1] up to and including the final element a[n]. */
    var begList=list.slice(0,k+1);
    var endList=list.slice(k+1);
    return begList.concat(endList.reverse());
}

/**
 * Effectue une rotation horaire de 90° avec un tableau imbriqué à 2 dimensions
 *
 * exemple avec en entrée:
 *   array=[
 *       ['A','B'],
 *       ['C','D'],
 *       ['E','F']
 *   ]
 * retourne
 *   [
 *       ['E','C','A'],
 *       ['F','D','B']
 *   ]
 *
 */
export function rotation(array) {
    var res=[];

    var height=array.length;
    var width=array[0].length;

    /* initialisation à vide */
    for (var x=0; x<width; x++) {
        res.push([]);
        for (var y=0;y<height;y++){
            width=Math.max(width,array[y].length);
            res[x].push([]);
        }
    }

    /* calcul de la rotation */
    for (var y=0;y<height;y++){
        //width=array[y].length;
        for (var x=0; x<width; x++) {
            /* Rotation horaire */
            res[x][y]=array[height-y-1][x]
            /* Rotation anti-horaire */
            // res[x][y]=array[y][width-x-1]
            /* Transposition or tranlation ?*/
            // res[x][y]=array[height-y-1][width-x-1]
        }
    }
    return res;
}


/* TODO : optimisation de rotation
O(n^2) time and O(1) space algorithm ( without any workarounds and hanky-panky stuff! )

Rotate by +90:

Transpose
Reverse each row
Rotate by -90:

Transpose
Reverse each column
Rotate by +180:

Method 1: Rotate by +90 twice

Method 2: Reverse each row and then reverse each column

Rotate by -180:

Method 1: Rotate by -90 twice

Method 2: Reverse each column and then reverse each row

Method 3: Reverse by +180 as they are same
*/



/**********************************************************************************/
/**********************************************************************************/

/**
 *
 * config.txtShape :
 * texte décrivant la forme de la piece sous forme de liste de texte
 *     exemple  (un L):
 *        [ '#.',
 *          '#.',
 *          '##']
 *     exemple  (un Carré):
 *        [ '##',
 *          '##']
 *     exemple  (un T):
 *        [ '###',
 *          '.#.']
 */
export function Tile(config) {
    /* default args */
    config = config ||{};
    config.txtShape = config.txtShape || [];
    this._color = config.color || "green";

    /* shape : liste de block à 2 dimensions shape[y][x] */
    this._shape    = [[]];
    /* largeur et hauteur de la pièce */
    this._width   = null;
    this._height  = null;
    /* nombre de blocs non vide */
    this._nbBlock = null;
    /* delta pour que le bloc à la position {x:0,y:0} ne soit jamais vide */
    this._delta   = null;

    /* initialisation */
    this._shape=this.getShape(config.txtShape);
    this._delta=this.getDelta();
}
/*
 * Constantes Static
 */
Tile.EMPTY_BLOCK=".";
Tile.NON_EMPTY_BLOCK="#";

/**
 * initialise l'attribut shape
 * construit un tableau à 2 dimensions à partir d'une liste de chaine
 *
 * txtShape=[
 *  ['abc'],
 *  ['.d.']
 * ]
 * donne
 * [
 *  ['a','b','c'],
 *  ['.','d','.']
 * ]
 *
 */
Tile.prototype.getShape = function(txtShape) {
    var thisTile=this;

    this._shape=[];

    txtShape.forEach(function(line){
        var blocks=[];
        line.split('').forEach(function(block){
            blocks.push(block);
        });
        thisTile._shape.push(blocks);
    });

    return this._shape;
};

/**
 * Calcul et renvoi le nombre de block non vide
 */
Tile.prototype.getNbBlock = function() {
   if (this._nbBlock) {
       return this._nbBlock;
   }
   var thisTile=this;

   thisTile._nbBlock=0;

   this._shape.forEach(function(line){
       line.forEach(function(block){
          if ( block != Tile.EMPTY_BLOCK) {
             thisTile._nbBlock++;
         }
     });
   });

   return thisTile._nbBlock;
};

/**
 * Calcul et renvoi le Delta à appliquer sur la coordonnée X
 * le block {x:0,y:0} ne doit jamais être vide
 * si shape[0][0] est vide on doit calculer un décalage jusqu'à obtenir un block non vide
 */
Tile.prototype.getDelta = function() {
    if (this._delta) {
        return this._delta;
    }
    var thisTile=this;

    for (var y=0;y<thisTile.getHeight();y++){
        for (var x=0; x<thisTile.getWidth(); x++) {
            if (thisTile._shape[y][x]!=Tile.EMPTY_BLOCK) {
                return {x:-x,y:-y};
            }
        }
    }
    throw new Error("Error on Tile.prototype.getDelta(), No block detected !");
};

/**
 * renvoi le block à la position logique voulue
 * (en tenant compte du delta technique)
 * position.x
 * position.y
 */
Tile.prototype.getBlock = function (position) {
    return this._shape[position.y- this._delta.y][position.x - this._delta.x];
};
/**
 * renvoi la liste des positions contenant un bloc non vide
 */
Tile.prototype.getBlockPosition = function() {
    if (this._blockPosition) {
        return this._blockPosition;
    }
    var thisTile=this;

    thisTile._blockPosition=[];

    var x=0;
    var y=0;

    /* rotation */
    this._shape.forEach(function(line){
        line.forEach(function(block){
            if ( block != Tile.EMPTY_BLOCK) {
                thisTile._blockPosition.push({
                    x:x+thisTile._delta.x,
                    y:y+thisTile._delta.y
                });
            }
            x++;
        });
        x=0;
        y++;
   });

   return thisTile._blockPosition;
};

/**
 * Calcul et renvoi la largeur de la forme
 */
 Tile.prototype.getWidth = function() {
    if (this._width) {
        return this._width;
    }
    var thisTile=this;
    this._width=0;
    this._shape.forEach(function(line){
        thisTile._width=Math.max(thisTile._width,line.length)
    });
    return this._width;
}

/**
 * Calcul et renvoi la hauteur de la forme
 */
Tile.prototype.getHeight = function() {
    this._height=this._shape.length;
    return this._height;
};


//***UI

/**
 * Calcul et renvoi le path SVG de la forme
 */
Tile.prototype.getKineticPath = function() {
    var thisTile=this,
        pathSVG="";

    var pxPerUnit=25;

    this.getBlockPosition().forEach(function(block){
        var X=block.x *pxPerUnit,
            Y=block.y *pxPerUnit;
        pathSVG+="M "+X+" "+Y+
                 "h" +pxPerUnit+
                 "v" +pxPerUnit+
                 "h-"+pxPerUnit+
                 "v-"+pxPerUnit+
                 "z";
    });


    return {
          x: 100,
          y: 50,
          data : pathSVG,
          fill: Kinetic.Util.getRandomColor(), //this._color,
          stroke: '#002244',
          strokeWidth: 4,
          draggable: true,
          dragDistance: 1,
          dragBoundFunc:function(pos){
              console.log(Math.round(this.getAbsolutePosition().x/25)*25);
              return {
                //x: Math.round(this.getAbsolutePosition().x/25)*25,
                x: Math.round(pos.x/25)*25,
                y: Math.round(pos.y/25)*25
              };
          },
          scale: 1
    };
};


/**********************************************************************************/
/**********************************************************************************/

function TileUI () {
    Tile.call(this);
}


/**********************************************************************************/
/**********************************************************************************/

export function Board(config) {
    /* Default Args */
    config=config||{}
    config.width = config.width || 5
    config.height = config.height || 3

    /*
     * Constantes
     */

    /*
     * Shape : liste de block à 2 dimensions shape[x][y]
     */
     this.tiles    = [];
     this.permutationInitiale = [];
     this._width   = config.width;
     this._height  = config.height;
     this.boardShape =[];
     this.initBoard();

     /*
      * Stats calculées par this.solve()
      */
    this.duration=null;
    this.durationFirst;
    this.nbGoodSolution=0;
    this.nbBadSolution=0;
    this.permutationSolution=[];

 }

/**
 * remplit le plateau de block vide
 */
Board.prototype.initBoard = function() {
    this.boardShape = [];
    for (var y=0;y<this._height;y++){
        this.boardShape[y]=[];
        for (var x=0; x<this._width; x++) {
            this.boardShape[y][x]=Tile.EMPTY_BLOCK;
        }
    }
};

/**
 * renvoi la prochaine position vide sur le plateau
 */
Board.prototype.getNextEmptyPosition = function() {
    for (var y=0;y<this._height;y++){
        for (var x=0; x<this._width; x++) {
            if (this.boardShape[y][x]==Tile.EMPTY_BLOCK) {
                return {x:x,y:y};
            }
        }
    }
};

/**
 * Ajoute une pièce au jeu
 */
Board.prototype.addTile = function(tile) {
    this.permutationInitiale.push(this.tiles.length);
    this.tiles.push(tile);
};

/**
 * Essaye de placer une piece <tile> à la position donnée
 * config.tile
 * config.position.x // abscisse en nombre de blocs
 * config.position.y // ordonnée en nombre de blocs
 * config.rotation   // angle de rotation en degrés (uniquement 0,90,190,270)
 *
 * return true si l'action est possible false sinon
 */
Board.prototype.tryTile = function(config) {
    var result=true;
    var thisBoard=this;
    var rotation = config.rotation||0;

    config.tile.getBlockPosition().forEach(function(position){
        var x = config.position.x + position.x;
        var y = config.position.y + position.y;

        /* si {x:x,y:y} hors du plateau
           OU
           si une position du plateau est déjà occupé */
        if (x >= thisBoard._width  ||
            x < 0                  ||
            y >= thisBoard._height ||
            y < 0                  ||
            thisBoard.boardShape[y][x] != Tile.EMPTY_BLOCK) {
            result=false;
        }
    });
    return result;
};

/**
 * Place une piece <tile> à la position donnée
 *
 * config.tile
 * config.position
 *
 * throw Error si l'action est impossible
 */
Board.prototype.playTile = function(config) {
    var thisBoard=this;
    config.tile.getBlockPosition().forEach(function(position){
        var x = config.position.x + position.x;
        var y = config.position.y + position.y;
        if (thisBoard.boardShape[y][x]!=Tile.EMPTY_BLOCK) {
            throw new Error("Error on Board.prototype.playTile(), Non empty block detected !");
        }
        thisBoard.boardShape[y][x] = config.tile.getBlock(position);
    });
};

/**
 * Retir une piece <tile> à la position donnée
 *
 * config.tile
 * config.position
 *
 * throw Error si l'action est impossible
 */
Board.prototype.removeTile = function(config) {
    var thisBoard=this;
    config.tile.getBlockPosition().forEach(function(position){
        var x = config.position.x + position.x;
        var y = config.position.y + position.y;
        if (thisBoard.boardShape[y][x]==Tile.EMPTY_BLOCK) {
            throw new Error("Error on Board.prototype.removeTile(), Empty block detected !");
        }
        thisBoard.boardShape[y][x] = Tile.EMPTY_BLOCK;
    });
};

/**
 * Retourne le plateau sous forme de chaine
 */
Board.prototype.toString = function() {
    var strBoard="\n";
    for (var y=0;y<this._height;y++){
        strBoard+= "|";
        for (var x=0; x<this._width; x++) {
            strBoard+=this.boardShape[y][x];
        }
        strBoard+="|\n";
    }
    return strBoard;
};

/**
 * Affiche le plateau sous forme de chaine
 */
Board.prototype.print = function() {
   console.log(this.toString());
};


/**
 * Tente de resoudre le jeu
 * Mets à jour les statistiques
 * return : le nombre de solutions trouvées
 */
Board.prototype.solve = function() {
    var thisBoard=this;

    this.permutationSolution=[];
    this.permutationSolutionString=[];

    var dtStart=Date.now();
    var dtFirstSolution=null;
    var dtEnd=null;
    var nbTry=0;
    var nbTryFirst=0;

    var nbGoodSolution=0;
    var nbBadSolution=0;

    var tileIndexPermutation = this.permutationInitiale;

    // optimisation 3 un tri judicieux...
    //thisBoard.tiles.sort(function(a,b){
    //    console.log(a.getNbBlock(),"<?>",b.getNbBlock())
    //    return (a.getNbBlock()-b.getNbBlock());
    //});

    var goodSolution=true,
        currentSolution=[]
    /* on commence par essayer de placer les pions dans l'ordre 0,1,2,3.... */
    while (tileIndexPermutation) {

        /* si tileIndexPermutation commence par currentSolution et que goodSolution==false, ce n'est pas bon */
        // optimisation 2 : inutile d'essayer toutes les permutations commençant par un cas impossible
        if (goodSolution ||
            tileIndexPermutation.toString().indexOf(
                currentSolution.toString()
            )!=0
        ) {
            goodSolution=true;
            currentSolution=[];
        }


        /* on essai de placer toutes les pieces dans l'ordre de la permutation en cours */
        tileIndexPermutation.forEach(function(tileIndex) {
            if (!goodSolution) {
                // Optimisation 1 : inutile de continuer avec cette permutation
                return
            }
            currentSolution.push(tileIndex);

            var tile= thisBoard.tiles[tileIndex];
            var pos = thisBoard.getNextEmptyPosition();

            nbTry++
            if (thisBoard.tryTile({tile:tile,position:pos})) {
                /* tant que çà marche on continu */
                thisBoard.playTile({tile:tile,position:pos});
            } else {
                /* Arrrrrh ... pas bon .... cette permutation n'est pas bonne */
                goodSolution=false;
                /* toutes les solutions commençànt par currentSolution sont mauvaise */
            }
        });

        if  (goodSolution)  {
            /* on a un bonne solution !*/
            nbGoodSolution++;
            thisBoard.permutationSolution.push(JSON.stringify(tileIndexPermutation));
            thisBoard.permutationSolutionString.push(thisBoard.toString());
            if (nbGoodSolution==1) {
                dtFirstSolution=Date.now();
                nbTryFirst=nbTry;
            }
            console.log("goodSolution : "+goodSolution+"\n\n");
            thisBoard.print();
            console.log("\n\n")
        } else {
            nbBadSolution++
            if(nbBadSolution%100000==0) { // TODO Timer 1 affichage toutes les x secondes
                console.log("nbBadSolution : "+nbBadSolution+"\n\n");
            }
        }
        /* on vide le plateau et on essai avec l'itération suivante 0,1,2,3 ==> 0,1,3,2 */
        thisBoard.initBoard();
        tileIndexPermutation = nextPermutation(tileIndexPermutation);


    }
    dtEnd=Date.now();
    this.duration=dtEnd-dtStart;
    this.durationFirst=dtFirstSolution-dtStart;
    console.log("nbGoodSolution =  "+nbGoodSolution+"/"+(nbGoodSolution+nbBadSolution))
    console.log("elapsed time ="+(this.duration)+" ms nbTry="+nbTry+", first solution in "+(this.durationFirst)+" ms nbTry="+nbTryFirst)
    return nbGoodSolution;
}
