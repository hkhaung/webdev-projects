// is the "home page"
// search bar to search for products
// card display to show products

function Search( {numProducts=50} ) {
  return (
    <>
      <div className="searchbar-container">
        <div
            className="grid grid-cols-3 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
          <div
              className="place-content-center min-w-[20rem] text-2xl">Search results {numProducts > 0 ? `(${numProducts})` : ''}</div>
          <form className="w-full col-span-2">
            <input
                type="text"
                placeholder="Search for items in store here..."
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500"/>
          </form>
        </div>
      </div>
    </>
  )
}

function Card({imgSrc, title = "Title", description = "description", category = "category"}) {
  return (
    <>
      <div className="card-container border rounded-lg shadow-md pb-8">
        <div className="border-amber-500">
          <img src={imgSrc} alt={`${title} image`} className="w-full min-h-[10rem] object-cover rounded-t-lg" />
        </div>
        <div className="info mt-5 px-4 min-h-[12rem] max-h-[12rem]">
          <div className="title font-medium text-xl">{title}</div>
          <div className="description mt-1 text-gray-600">{description}</div>
          <div className="category mt-2 text-sm text-gray-600 italic">{category}</div>
        </div>
      </div>
    </>
  )
}

function CardsDisplay() {
  return (
    <>
      <div className="display-container">
        <div className="cards-container grid grid-cols-3 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
          <Card imgSrc="https://placehold.co/600x400" description="Lorem ipsum odor amet, consectetuer adipiscing elit. Metus natoque tempor lobortis vivamus suspendisse nisl; etiam ultricies ad. Risus est ex consequat libero enim dui venenatis interdum." />
          <Card imgSrc="https://placehold.co/600x400" />
          <Card imgSrc="https://placehold.co/600x400" />
          <Card imgSrc="https://placehold.co/600x400" />
          <Card imgSrc="https://placehold.co/600x400" />
          <Card imgSrc="https://placehold.co/600x400" />
          <Card imgSrc="https://placehold.co/600x400" />
          <Card imgSrc="https://placehold.co/600x400" />
        </div>
      </div>
    </>
  )
}


function SearchAndDisplay() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-1 p-20">
        <Search />
        <CardsDisplay />
      </div>
    </>
  )
}

export default SearchAndDisplay;