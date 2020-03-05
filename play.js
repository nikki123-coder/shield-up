const canvas = document.querySelector('canvas'); 
const c = canvas.getContext('2d'); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight-200;


var ballR = 10, x = canvas.width / 2, y = canvas.height - 30,
  	    dx = 3, dy = -3, paddleH = 15, paddleW = 200, paddleX = (canvas.width - paddleW) / 2,
        rightKey = false, leftKey = false,paddleX=(canvas.width-paddleW)/2;


addEventListener("click",function(){

  const body = document.querySelector('body');
body.style.backgroundImage = "url('rsz_earth.v1.png')";

        addEventListener("mousemove", function(e) {
          var relativeX = e.clientX - canvas.offsetLeft;
          if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleW/2;
          }
        });

        function drawBall() {
          c.beginPath();
          c.arc(x, y, 20, 0, Math.PI * 2);
          c.fillStyle = "#ffdc34";
          c.shadowBlur = 20;
          c.shadowColor = "#ffdc34";
          c.shadowBlur = 60;
          c.shadowColor = "orange";
          c.fill();
          c.closePath();
        }
        
        function drawPaddle() {
          c.beginPath();
          c.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
          c.fillStyle = "#05dfd7";
          c.fill();
          c.closePath();
        }

        function draw() {
          c.clearRect(0, 0, canvas.width, canvas.height);
          
          drawBall();
          drawPaddle();
          
          
          if (hitSideWall())
            dx = -dx;
            
          if (hitTop()  ||  hitPaddle())
            dy = -dy;
         
          if (gameOver())
            document.location.reload();
            
          var RIGHT_ARROW = 39, LEFT_ARROW = 37;
          
          function hitPaddle() { 
            return hitBottom() && ballOverPaddle();
           }
          function ballOverPaddle() { 
            return x > paddleX  &&  x < paddleX + paddleW;
           }
          function hitBottom() { 
            return y + dy > canvas.height - ballR-10;
           }
          function gameOver() {
            return hitBottom() && !ballOverPaddle(); 
          }
          function hitSideWall() { 
            return x + dx > canvas.width - ballR-10 || x + dx < ballR+10;
           }
          function hitTop() {
             return y + dy < ballR+10;
             }
          function rightPressed(e) { 
            return e.keyCode == RIGHT_ARROW; 
          }
          function leftPressed(e) { 
            return e.keyCode == LEFT_ARROW; 
          }
          function keyDown(e) {
            rightKey = rightPressed(e);
            leftKey = leftPressed(e);
          }
          
          function keyUp(e) {
            rightKey = rightPressed(e) ? false : rightKey;
            leftKey = leftPressed(e) ? false : leftKey;
          }
          
          document.addEventListener("keydown", keyDown, false);
          document.addEventListener("keyup", keyUp, false);
          
          var maxX = canvas.width - paddleW, minX = 0, paddleDelta = rightKey ? 7 : leftKey ? -7 : 0;
          
          paddleX = paddleX + paddleDelta;
          paddleX = Math.min(paddleX, maxX);
          paddleX = Math.max(paddleX, minX);
          
          x += dx;
          y += dy;
        }
        
        setInterval(draw, 10);
      });