"use strict"

const WALL = "#"
const FOOD = "."
const EMPTY = " "
const SUPER_FOOD = "🍕"

const gGame = {
  score: 0,
  isOn: false,
}
var gBoard
var gFoodCount = 0

function onInit() {
  gBoard = buildBoard()
  createPacman(gBoard)
  createGhosts(gBoard)
  renderBoard(gBoard)
  gGame.score = 0
  gGame.isOn = true
  gDeadGhosts = []
  closeModal()
}

function buildBoard() {
  const size = 10
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD
      gFoodCount++

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL
        gFoodCount--
      }
    }
  }
  board[1][1] = SUPER_FOOD
  board[1][size - 2] = SUPER_FOOD
  board[size - 2][1] = SUPER_FOOD
  board[size - 2][size - 2] = SUPER_FOOD

  // console.log('board:', board)
  console.table(board)
  return board
}

function renderBoard(board) {
  var strHTML = ""
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>"
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j]
      const className = `cell cell-${i}-${j}`

      var cellContent = typeof cell === "object" ? getGhostHTML(cell) : cell

      strHTML += `<td class="${className}">${cellContent}</td>`
    }
    strHTML += "</tr>"
  }
  document.querySelector(".board").innerHTML = strHTML
}

function renderCell(location, value) {
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)

  if (typeof value === "object") {
    elCell.innerHTML = getGhostHTML(value)
  } else {
    elCell.innerHTML = value
  }
}

function updateScore(diff) {
  // update both the model and the dom for the score
  gGame.score += diff
  document.querySelector("h2 span").innerText = gGame.score

  if (gGame.score === gFoodCount) {
    gameOver("Winner!")
  }
}

function gameOver(message = "Game Over!") {
  console.log("Game Over")
  gGame.isOn = false
  renderCell(gPacman.location, EMPTY)
  clearInterval(gIntervalGhosts)

  openModal(message)
}

function openModal(message) {
  var modal = document.querySelector(".modal")
  var h2 = document.querySelector(".modal h2")
  modal.style.display = "block"

  h2.innerText = message
}

function closeModal() {
  var modal = document.querySelector(".modal")
  if (modal.style.display === "block") {
    modal.style.display = "none"
  }
}
