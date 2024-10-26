import { ref } from 'vue'

const boards = ref([])

const loadBoards = () => {
  const storedBoards = localStorage.getItem('boards')
  if (storedBoards) {
    boards.value = JSON.parse(storedBoards)
  }
}

const saveBoards = () => {
  localStorage.setItem('boards', JSON.stringify(boards.value))
}

const addBoard = () => {
  const newBoard = {
    id: Date.now(),
    title: 'Новая доска',
    notes: [],
  }
  boards.value.push(newBoard)
  saveBoards() 
}

const deleteBoard = boardId => {
  boards.value = boards.value.filter(board => board.id !== boardId)
  saveBoards() 
}

const addNote = (boardId, color) => {
  const newNote = {
    id: Date.now(),
    title: 'Текст заметки',
    bgColor: color,
    position: { x: 0, y: 0 }, 
    isMoveable: true,
  }

  const board = boards.value.find(board => board.id === boardId)
  if (board) {
    board.notes.push(newNote)
    saveBoards()
  }
}

const deleteNote = (boardId, noteId) => {
  const board = boards.value.find(board => board.id === boardId)
  if (board) {
    board.notes = board.notes.filter(note => note.id !== noteId)
    saveBoards() 
  }
}

loadBoards()

export { boards, addBoard, deleteBoard, addNote, deleteNote, saveBoards }
