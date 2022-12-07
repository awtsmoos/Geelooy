//B"H
var chayim = new (function() {
    
    function dvar(op={}) {
        this.color = "green"
        this.border = "1px solid black"
        var start = (op={}) => {
            this.x=num(op.x);
            this.y=num(op.y);

            this.width = (s=>s?s:size)(num(op.width))
            this.height = (s=>s?s:size)(num(op.height))

        }
        var size = op.tileSize||op.size
        this.tileSize=size
        start({
            ...op,
            x:(tx=>tx?tx*size:0)(num(op.tileX)),
            y:(ty=>ty?ty*size:0)(num(op.tileY))
        })

        
    }

    function htmler(op={}) {
        dvar.call(this,op)
        this.shape = "html"
        this.html = op.html || document.createElement("div")
    }

    function ayin(op={}) {
        dvar.call(this,op)
        this.zoom = 1;
        this.pivotX = 0
        this.pivotY = 0
    }

    function tree(op={}) {
        dvar.call(this,op)
        this.meen = "eelan"
        this.layer =1 
    }

    function player(op={}) {
        dvar.call(this,op)
        this.color = "blue"
        this.meen = "player"
        var dx = 0;
        var dy = 0;
        var speed = 13;
        this.layer = 2
        var following = true;
        var down = []
        this.collisionLayers = [1]
        var curTile;
        var mcl
        var mx;
        var my;
        var string = ""
        var logged = false
        
        this.checkTile = (main) => {

            if(
                main.grid[curTile.y]
            ) {
                
                
                mcl = main.grid[curTile.y][curTile.x]
                if(mcl && mcl.type != this.meen) {
                    return true;
                } 
                return false;
            }
            return false;
        }

        this.heesHawvoos = (me, main) => {
            dx = 0;
            dy = 0;
            if(
                main.keys[
                    37//left
                ]
            ) {
                dx = -1
            }

            if(
                main.keys[
                    39
                ]
            ) {
                dx = 1
            }

            if(
                main.keys[
                    40
                ]
            ) {
                dy = 1
            }


            if(
                main.keys[
                    38
                ]
            ) {
                dy = -1
            }


            mx = dx * speed;
            my = dy * speed;

            /*
                check tile to left
            */
          
            
            if(dx < 0) {
                curTile = tile(
                    this.x + dx,
                    this.y,
                    this.tileSize
                    
                )
                if(this.checkTile(main)) {
                    
                    mx = 0

                    this.x = curTile.x * this.tileSize +
                        mcl.width
                    
                }

                curTile = tile(
                    this.x + dx,
                    this.y + this.tileSize-1,
                    this.tileSize
                    
                )
                if(this.checkTile(main)) {
                    mx = 0

                    this.x = curTile.x * this.tileSize +
                        mcl.width
                }
            }
            /*
                from top left corner of player, check one corner
                to right
            */
            
            if(dx > 0) {
                curTile = tile(
                    this.x + this.tileSize + dx,
                    this.y,
                    this.tileSize
                    
                )
                if(this.checkTile(main)) {
                    mx = 0

                    this.x = curTile.x * this.tileSize -
                        mcl.width
                }

                curTile = tile(
                    this.x + this.tileSize + dx,
                    this.y + this.tileSize-1,
                    this.tileSize
                    
                )
                if(this.checkTile(main)) {
                    mx = 0

                    this.x = curTile.x * this.tileSize -
                        mcl.width
                }
            }

            /*
                if moving upwards,
                check tile above
            */
            if(dy < 0) {
                curTile = tile(
                    this.x,
                    this.y + dy,
                    this.tileSize
                    
                )
                if(this.checkTile(main)) {
                    my = 0

                    this.y = curTile.y * this.tileSize +
                        mcl.height
                }

                curTile = tile(
                    this.x + this.tileSize-1,
                    this.y + dy,
                    this.tileSize
                    
                )
                if(this.checkTile(main)) {
                    my = 0

                    this.y = curTile.y * this.tileSize +
                        mcl.height
                }
            }


            /*
                if moving downwards,
                check tile below
            */
                if(dy > 0) {
                    curTile = tile(
                        this.x,
                        this.y + this.tileSize + dy,
                        this.tileSize
                        
                    )
                    if(this.checkTile(main)) {
                        my = 0
    
                        this.y = curTile.y * this.tileSize -
                            mcl.height
                    }

                    curTile = tile(
                        this.x + this.tileSize-1,
                        this.y + this.tileSize + dy,
                        this.tileSize
                        
                    )
                    if(this.checkTile(main)) {
                        my = 0
    
                        this.y = curTile.y * this.tileSize -
                            mcl.height
                    }
                }
            /*
            string =  "Hi. " + curTile.y + ":"
            +curTile.x

           */

            logs.innerHTML = string

            this.x += mx;
            this.y += my;

            if(
                main.keys[
                    68
                ]
            ) {
                main.ayin.zoom -= 0.05
            }


            if(
                main.keys[
                    70
                ]
            ) {
                main.ayin.zoom += 0.05
            }


            if(
                main.keys[86]
            ) {
                if(!following) {
                    following = true;
                    down[86] = true
                } else {
                    following = false;
                    down[86] = true
                }
                
            } else {
                if(following) {
                    if(down[86]) {
                        down[86] = false
                    }
                }
            }


            if(following) {
                main.ayin.pivotX = this.x+ (this.width/2)
                main.ayin.pivotY = this.y+ (this.height/2)
            }
            main.video.x = this.x;
            main.video.y = this.y

        }


    }


    this.dvar = dvar;
    this.ayin=ayin;
    this.tree=tree;
    this.player=player;
    this.htmler = htmler
    this.map = {
        "t":tree,
        "p":player
    }
    this.num=num
    function num(n) {
        return typeof(n) == "number" ? n : 0
    }
    function tile(x,y,tileSize) {
        return {
            x: Math.floor(
                x/tileSize
            ),
            y: Math.floor(
                y/tileSize
            )
        }
    }
})();
