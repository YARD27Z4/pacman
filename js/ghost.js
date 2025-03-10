'use strict'

const GHOST_IMAGES = [
    'img/blue-ghost.png',
    'img/red-ghost.png',
    'img/green-ghost.png'
]
const SUPER_GHOST_IMG = 'imgs/yellow-ghost.png'

// const GHOST = '👻'
var gGhosts
var gIntervalGhosts
var gDeadGhosts = []



function createGhost(board) {
    if (gGhosts.length >= GHOST_IMAGES.length) return

    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        imgSrc: GHOST_IMAGES[gGhosts.length]
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = ghost
}


function createGhosts(board) {
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    console.log('gGhosts:', gGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (typeof nextCell === 'object') return

    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)

    ghost.location = nextLocation
    ghost.currCellContent = nextCell

    gBoard[ghost.location.i][ghost.location.j] = ghost

    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<img src="${ghost.imgSrc}" class="ghost">`
}

function activateSuperMode() {
    gPacman.isSuper = true

    for (var ghost of gGhosts) {
        ghost.originalImgSrc = ghost.imgSrc
        ghost.imgSrc = SUPER_GHOST_IMG
        renderCell(ghost.location, getGhostHTML(ghost))
    }

    setTimeout(deactivateSuperMode, 5000)
}

function deactivateSuperMode() {
    gPacman.isSuper = false

    for (var ghost of gGhosts) {
        ghost.imgSrc = ghost.originalImgSrc
        renderCell(ghost.location, getGhostHTML(ghost))
    }

    while (gDeadGhosts.length > 0) {
        var ghost = gDeadGhosts.pop()
        ghost.imgSrc = ghost.originalImgSrc
        gGhosts.push(ghost)
        gBoard[ghost.location.i][ghost.location.j] = ghost
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}
