import { getEmployees } from './modules/init.js'

// GET DOM ELEMENTS
let empTable = document.querySelector('#employees')
let empCount = document.querySelector('#empCount')

// LOAD THE EMPLOYEES ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    getEmployees().then(data => buildGrid(data))
  })

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
  
  if (e.target.classList.contains('delete')) {

    // CONFIRM THE DELETE
    if (confirm('Are you sure you want to delete this employee?')) {

      // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
      let rowIndex = e.target.parentNode.parentNode.rowIndex

      // REMOVE EMPLOYEE FROM TABLE
      empTable.deleteRow(rowIndex)
      
      // UPDATE EMPLOYEE COUNT
      empCount.value = empTable.rows.length - 1
    }
  }
})

// BUILD THE EMPLOYEES GRID
function buildGrid(data) {

  // UPDATE EMPLOYEE COUNT
  empCount.value = data.length

  // REBUILD THE TBODY FROM SCRATCH
  let tbody = document.createElement('tbody')

  // LOOP THROUGH THE ARRAY OF EMPLOYEES
  for (let i = 0; i < data.length; i++) {

    // CREATE THE ROW
    let row = document.createElement('tr')

    // ADD THE COLUMNS
    row.innerHTML = `
      <td>${data[i].id}</td>
      <td>${data[i].name}</td>
      <td>${data[i].ext}</td>
      <td>${data[i].email}</td>
      <td>${data[i].department}</td>
      <td><button class="btn btn-sm btn-danger delete">X</button></td>
    `

    // APPEND THE ROW TO THE TBODY
    tbody.appendChild(row)
  }

  // UPDATE THE EMPLOYEE TABLE WITH THE NEW TBODY
  empTable.appendChild(tbody)
}
