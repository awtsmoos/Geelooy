//B"H
var Renderer2D = function(opts={}) {
    var can = opts.canvas;
    if(!can) return;
    var ctx = can.getContext("2d");
    var defaultSize = 32
    Object.defineProperties(this, {
        clear: {
            get: ()=> ()=> {
                ctx.clearRect(
                    0,0,
                    ctx.canvas.width,
                    ctx.canvas.height
                )
            }
        },
        renderHTML: {
            get: () => (html={}, camera={}) => {
                
            }
        },
        renderDvar: 
        {
            get: () => (opts={}, camera={}) => {
                var x = null;
                var y = null;
                if(opts.x||opts.x===0) {
                    x = opts.x;
                }

                if(opts.y||opts.y===0) {
                    y= opts.y;
                }

                if(!(x !== null && y !== null)) {
                    return;
                }

                var color = opts.color || "blue";
                var border = opts.border || ""
                var shape = opts.shape || "square"

                var shapeFunc = shapeMap[shape];
                if(!shapeFunc)
                    return console.log("Nop");
                
                
                
                if(typeof(camera.x) != "number")
                    camera.x = 0
                
                if(typeof(camera.y) != "number")
                camera.y = 0
                
                if(typeof(camera.zoom) != "number")
                    camera.zoom = 1;
                
                if(typeof(opts.width) != "number") {
                    opts.width = defaultSize
                }


                if(typeof(opts.height) != "number") {
                    opts.height = defaultSize
                }

                ctx.fillStyle = color;
                if(border) {
                    
                    ctx.strokeStyle = opts.border;
                }

                shapeFunc(opts, camera)

                if(border) {
                    ctx.stroke()
                }

                ctx.fillStyle = "black"
                ctx.strokeStyle = "black"
            }
        }
    })

    function startUp(opts={},camera={}) {

    }

    var shapeMap = {
        square(opts, camera) {
            
            

            ctx.fillRect(
                cx(opts.x,camera),
                cy(opts.y,camera),
                opts.width * camera.zoom,
                opts.height * camera.zoom
            )
            
        },
        circle(opts, camera) {
            
            
            ctx.beginPath()
            ctx.arc(
                cx(opts.x,camera),
                cy(opts.y,camera),
                (opts.width/2) * camera.zoom,
                0,
                Math.PI*2
            )
            ctx.fill()
            
        },
        html(opts, camera) {
            opts.html.style.position="absolute"
            opts.html.style.left = (
                cx(opts.x,camera)
            ) + "px"
            opts.html.style.top = (
                cy(opts.y,camera)
            ) + "px"
            opts.html.style.width = (
                opts.width * camera.zoom
            )
            opts.html.style.height= (
                opts.height*camera.zoom
            )
        }
    }

    function cx(x,camera) {
        return (
            (x-camera.x)-
            camera.pivotX
        ) * camera.zoom+ctx.canvas.width / 2 
    }

    function cy(y,camera) {
        return (
            (y-camera.y)

            - 
            camera.pivotY
        ) * camera.zoom+ctx.canvas.height / 2
    }
    function isNum(n) {
        return typeof(n) == "number"
    }
}