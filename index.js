var $start = document.querySelector('#start')
    $game = document.querySelector('#game')
    $time = document.querySelector('#time')
    $timeHeader = document.querySelector('#time-header')
    $resultHeader = document.querySelector('#result-header')
    $result = document.querySelector('#result')
    $gameTime = document.querySelector('#game-time')

    var score = 0 
        isGameStarted = false
        colors = ['red', 'blue', 'green', 'yellow']
    

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
  }

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

    var interval = setInterval(function() {
        var time = parseFloat($time.textContent)
      if(time <=0 ) {
          clearInterval(interval)
          endGame()
      } else ($time.textContent = (time - 0.1).toFixed(1))
    }, 100)
    
    renderBox()
    
}

function handleBoxClick(event) {
    if(!isGameStarted) {
        return
    }
    if(event.target.dataset.box) {
        score++
        renderBox()
    }
    
}

function renderBox () {
    
    $game.innerHTML= ''
    var boxSize = getRandom(30, 100)
    var box = document.createElement('div')
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var randomColorIndex = getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0,maxTop)+'px'
    box.style.left = getRandom(0,maxLeft)+'px'
    box.style.cursor='pointer'
    box.setAttribute('data-box', 'true')
    $game.insertAdjacentElement( 'afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function endGame() {
 isGameStarted = false
 setGameScore()
 show($start)
 $game.style.backgroundColor = '#ccc'
 $game.innerHTML = ''
 $timeHeader.classList.add('hide')
 show($resultHeader)
 $gameTime.removeAttribute('disabled')
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime () {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}