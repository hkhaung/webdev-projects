// is the "home page"
// search bar to search for products
// card display to show products

function SearchBar() {
  return (
    <>
      <div className="searchbar-container">
        <div
          className="grid grid-cols-3 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border border-amber-500 p-4">
          <div className="border border-red-500 min-w-[20rem]">Products</div>
          <form className="col-span-2 border border-red-500">
            <input
              type="text"
              placeholder="Search for items in store here..."
              className="min-w-[375px] sm:w-[500px] p-2 border border-gray-300 rounded-md focus:border-blue-500"/>
          </form>
        </div>
      </div>
    </>
  )
}

function Card({imgSrc, title = "Title", description = "description", category = "category"}) {
  return (
    <>
      <div className="card-container border rounded-lg shadow-md pb-8 min-w-[20rem] max-w-[20rem]">
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
      <div className="display-container border border-red-500">
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
      <div className="flex flex-col justify-center items-center gap-8 p-20">
        <SearchBar/>
        <CardsDisplay />
      </div>
    </>
  )
}

export default SearchAndDisplay;