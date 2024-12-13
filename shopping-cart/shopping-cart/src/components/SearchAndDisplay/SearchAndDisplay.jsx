// is the "home page"
// search bar to search for products
// card display to show products

import Navbar from "../Navbar/Navbar.jsx";

function Search({numProducts=50} ) {
  return (
    <>
      <div className="searchbar-container">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-x-8 md:gay-y-2">
          <div
            className="flex items-center min-w-[20rem] text-2xl">Search results {numProducts > 0 ? `(${numProducts})` : ''}</div>
          <form className="w-full sm:col-span-2 md:col-span-2">
            <input
              type="text"
              placeholder="Search for items in store here..."
              className="w-full p-2 border border-gray-300 rounded-md text-slate-700 placeholder:text-slate-400 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
          </form>
        </div>
      </div>
    </>
  )
}

function Card({imgSrc, title = "Title", description = "description", category = "category"}) {
  return (
    <>
      <div
          className="card-container border rounded-lg shadow-md pb-8 w-full max-w-[20rem] group/default hover:bg-slate-100">
        <div className="group-hover/default:hidden">
          <img src={imgSrc} alt={`${title} image`} className="w-full min-h-[13.5rem] object-cover rounded-t-lg"/>
          <div className="info mt-5 px-4 min-h-[12rem] max-h-[12rem]">
            <div className="title font-medium text-xl">{title}</div>
            <div className="description mt-1 text-gray-600 line-clamp-5 min-h-[7.5rem]">{description}</div>
            <div className="category mt-8 text-sm text-gray-600 italic">{category}</div>
          </div>
        </div>

        <div className="transition-opacity duration-300 ease-in opacity-0 group-hover/default:opacity-100">
          <div className="hidden group-hover/default:flex items-center justify-center h-full min-h-[26.5rem] md:min-h-[24.5rem]">
            <div className="flex flex-col items-center justify-center space-y-4">
              <button className="add-to-cart-btn w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Add to cart</button>
              <button className="remove-from-cart-btn w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out">Remove from cart</button>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

function CardsDisplay() {
  return (
      <>
        <div className="display-container mt-8">
          <div className="cards-container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <Card imgSrc="https://placehold.co/600x400"
                  description="Lorem ipsum odor amet, consectetuer adipiscing elit. Metus natoque tempor lobortis vivamus suspendisse nisl; etiam ultricies ad. Risus est ex consequat libero enim dui venenatis interdum." />
          <Card imgSrc="https://placehold.co/1920x1080" />
          <Card imgSrc="https://placehold.co/1280x720" />
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
      <div>
        <Navbar />
        <div className="flex flex-col justify-center items-center gap-1 p-8 lg:p-20">
          <Search />
          <CardsDisplay />
        </div>
      </div>
    </>
  )
}

export default SearchAndDisplay;