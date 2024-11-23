// is the "home page"
// search bar to search for products
// card display to show products

function SearchBar() {
  return (
    <>
      <div className="flex items-center justify-center border border-amber-500 w-screen">
        <form>
          <input
            type="text"
            placeholder="Search for items in store here..."
            className="min-w-[375px] sm:w-[500px] p-2 border border-gray-300 rounded-md focus:border-blue-500"/>
        </form>
      </div>
    </>
  )
}

// function

function SearchAndDisplay() {
  return (
    <>
      <SearchBar/>
    </>
  )
}

export default SearchAndDisplay;