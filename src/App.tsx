import { useState  } from 'react'
import './App.css'


interface CardProps {
  id: number
  title: string
}

interface TableProps {
  id: number
  title: string
  items: CardProps[]
}

function App() {
  const [table, setTable] = useState<TableProps[]>([
    { id: 1, title: "Надо сделать", items: [{ id: 1, title: "Card 1" }, { id: 2, title: "Card 2" }] },
    { id: 2, title: "В разработке", items: [{ id: 3, title: "Card 3" }] },
    { id: 3, title: "Выполнено", items: [] },
  ])

  const [currentTable, setCurrnetTable] = useState<TableProps | null>(null)
  const [currentCard, setCurrnetCard] = useState<CardProps | null>(null)

  function onDragOverFn(e: any) {
    e.preventDefault()
    if (e.target.className == "card") {
      e.target.style.boxShadow = "0px 0px 5px red"
    }
  }

  function onDragStartFn(e: any, table: TableProps, item: CardProps) {
    setCurrnetTable(table)
    setCurrnetCard(item)
  }

  function onDragLeaveFn(e: any) {
    e.target.style.boxShadow = "none"

  }

  function onDragEndFn(e: any) {
    e.target.style.boxShadow = "none"

  }

  function onDropFn(e: any, tableCr: TableProps, cardCr: CardProps) {
    e.preventDefault()
    if (currentTable != null && currentCard != null) {
      const currentIndex = currentTable.items.indexOf(currentCard)
      currentTable.items.splice(currentIndex, 1)

      const dropIndex = tableCr.items.indexOf(cardCr)
      tableCr.items.splice(dropIndex + 1, 0, currentCard)

      setTable(table.map(t => {
        if (t.id == tableCr.id) {
          return tableCr
        }

        if (t.id == currentTable.id) {
          return currentTable
        }

        return t
      }))
    }

  }

  function dropCardFn(e: any, tableCr: TableProps) {
    if (currentTable != null && currentCard != null) {
      tableCr.items.push(currentCard)
      const currentIndex = currentTable.items.indexOf(currentCard)
      currentTable.items.splice(currentIndex, 1)
      setTable(table.map(t => {
        if (t.id == tableCr.id) {
          return tableCr
        }

        if (t.id == currentTable.id) {
          return currentTable
        }

        return t
      }))
    }
  }

  return (
    <>
      <div className='tables'>
        {
          table?.map((table: TableProps) => {
            return (
              <div key={table.id} className='table'
                onDragOver={e => onDragOverFn(e)}
                onDrop={e => dropCardFn(e, table)}
              >
                <h2>{table.title}</h2>
                <hr />
                {
                  table?.items?.map((card: CardProps) => {
                    return (
                      <div
                        className='card'
                        key={card.id}
                        draggable={true}

                        onDragOver={e => onDragOverFn(e)}
                        onDragStart={e => onDragStartFn(e, table, card)}
                        onDragLeave={e => onDragLeaveFn(e)}
                        onDragEnd={e => onDragEndFn(e)}
                        onDrop={e => onDropFn(e, table, card)}
                      >
                        <h2>{card.title}</h2>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>

    </>
  )
}

export default App
