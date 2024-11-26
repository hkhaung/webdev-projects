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

function Card( {imgSrc, title="Title", description="description", category="category"} ) {
  return (
    <>
      <div className="card-container border rounded-lg shadow-md pb-6 min-w-[20rem] max-w-[20rem]">
        <div className="border-amber-500">
          <img src={imgSrc} alt={`${title} image`} className="w-full min-h-[10rem] object-cover rounded-t-lg" />
        </div>
        <div className="info mt-5 px-4">
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
      <div className="cards-display-container grid grid-cols-3 sm:gap-4 md:gap-2 lg:gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        <Card imgSrc="https://placehold.co/600x400" description="Lorem ipsum odor amet, consectetuer adipiscing elit. Metus natoque tempor lobortis vivamus suspendisse nisl; etiam ultricies ad. Risus est ex consequat libero enim dui venenatis interdum." />
        <Card imgSrc="https://placehold.co/600x400" />
        <Card imgSrc="https://placehold.co/600x400" />
        <Card imgSrc="https://placehold.co/600x400" />
        <Card imgSrc="https://placehold.co/600x400" />
        <Card imgSrc="https://placehold.co/600x400" />
        <Card imgSrc="https://placehold.co/600x400" />
        <Card imgSrc="https://placehold.co/600x400" />

      </div>
    </>
  )
}


function SearchAndDisplay() {
  return (
    <>
      <div>Products</div>
      <SearchBar/>
      <CardsDisplay />
    </>
  )
}

export default SearchAndDisplay;