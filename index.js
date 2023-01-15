const { useState, useEffect, useContext, useRef } = React;

function App() {

// STYLE FOR SELECTED BUTTON

const selectedButtonStyle = {width: '50px', height: '50px', backgroundColor: "brown", color: 'white'}

// REVERSED DATA

const array = []

for(let i = 50; i >= 0; i--){
  array[i] = i;
}

const data = array.reverse()

// SETTING UP LOGIC FOR DISPLAYING SPECIFIC NUMBER OF POSTS PER PAGE

const [currentPage, setCurrentPage] = useState(1)
const [postsPerPage, setpostsPerPage ] = useState(5)

const lastPostIndex = currentPage * postsPerPage
const firstPostIndex = lastPostIndex - postsPerPage
const currentPosts = data.slice(firstPostIndex, lastPostIndex)

// CREATING PAGE NUMBERS

const totalPosts = data.length

let pages = []

for (let i = 0; i <= Math.ceil(totalPosts/postsPerPage); i++){
    pages.push(i)
}

// VARIABLE FOR NUMBER OF PAGE NUMBERS ON BOTH SIDES OF THE CHOSEN ONE (IF 2 TOTAL PAGE NUMBER = 5)

const siblingCount = 2

// PAGINATION LOGIC

const [firstPagesIndex, setFirstPagesIndex] = useState(1)
const [lastPagesIndex, setLastPagesIndex] = useState(6)

const pagesSliced = pages.slice(firstPagesIndex, lastPagesIndex)

useEffect(() => 
  currentPage > siblingCount ? 
  currentPage > pages.length - siblingCount - 1 ?
  (setFirstPagesIndex(pages.length - ((siblingCount*2) + 1)),
  setLastPagesIndex(pages.length)) :
  (setFirstPagesIndex(currentPage - siblingCount),
  setLastPagesIndex(currentPage + siblingCount + 1)) :
  (setFirstPagesIndex(1),
  setLastPagesIndex((siblingCount*2) + 2)), [currentPage])

return <main>

  {currentPosts.map((x, index)=>{
    return <h1 key={index}>{x}</h1>
  })}

  {currentPage > 1 ? <button onClick={()=>setCurrentPage(x=>x-1)}>Prev</button> : null}

  {currentPage > siblingCount + 1 ? <><button onClick={() => setCurrentPage(1)}>1</button><>...</></> : null}

  {pagesSliced.map((x, index) => {return <>
      <button className='test' style={x === currentPage ? selectedButtonStyle : {}}
        disabled={x === 0 || x > Math.ceil(totalPosts/postsPerPage)} onClick={() => setCurrentPage(x)}
        key={index}>{x}</button></>
        })}

  {currentPage < pages.length - siblingCount - 1 ? 
    <>
      <>...</>
      <button onClick={() => setCurrentPage(pages.length - 1)}>{pages.length - 1}</button>
    </>
      : null}

  {currentPage < pages.length - 1 ? <button onClick={()=>setCurrentPage(x=>x+1)}>Next</button> : null}
  
  </main>

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
