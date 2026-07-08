import { useState, useEffect } from 'react'
import { fetchMenu } from '../api.js'

// keep the sections in the same order as the old hardcoded menu
const SECTION_ORDER = ["Starters", "Main Courses", "Desserts", "Drinks"]

function Menu({ addToCart }) {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // load the menu from MongoDB (through the API) when the page opens
  useEffect(() => {
    fetchMenu()
      .then((items) => {
        setMenuItems(items)
        setLoading(false)
      })
      .catch(() => {
        setError("Could not load the menu. Is the server running?")
        setLoading(false)
      })
  }, [])

  // group the flat list of items from the database back into sections
  const sections = []
  SECTION_ORDER.forEach((title) => {
    const items = menuItems.filter((item) => item.section === title)
    if (items.length > 0) {
      sections.push({ title: title, items: items })
    }
  })
  // in case someone adds an item with a brand new section name in the DB
  menuItems.forEach((item) => {
    if (!SECTION_ORDER.includes(item.section)) {
      let found = sections.find((s) => s.title === item.section)
      if (!found) {
        found = { title: item.section, items: [] }
        sections.push(found)
      }
      if (!found.items.includes(item)) {
        found.items.push(item)
      }
    }
  })

  return (
    <div className="w-fit max-w-[95%] mx-auto my-10 px-3 sm:px-12 py-6 sm:py-[30px] bg-[#fffdd0] border-4 border-[#B07C4C] text-center text-[#103852]">
      <h1 className="mb-5 text-[#B07C4C] text-[32px]">Our Menu</h1>

      {loading && <p className="text-[#103852]">Loading menu...</p>}
      {error && <p className="text-[#c0392b]">{error}</p>}

      {/* loop over each section (Starters, Mains, etc.) */}
      {sections.map((section) => (
        <div key={section.title} className="mb-[30px]">
          <h2 className="text-[#B07C4C] mb-3.5 text-[22px]">{section.title}</h2>

          <table className="w-full border-collapse mt-2.5">
            <tbody>
              <tr>
                <th className="bg-[#103852] text-[#B07C4C] px-2.5 sm:px-4 py-2.5 text-left text-sm sm:text-base">Item</th>
                <th className="bg-[#103852] text-[#B07C4C] px-2.5 sm:px-4 py-2.5 text-left text-sm sm:text-base">Description</th>
                <th className="bg-[#103852] text-[#B07C4C] px-2.5 sm:px-4 py-2.5 text-left text-sm sm:text-base">Price</th>
                <th className="bg-[#103852] text-[#B07C4C] px-2.5 sm:px-4 py-2.5 text-left"></th>
              </tr>

              {/* loop over each item in the section */}
              {section.items.map((item) => (
                <tr key={item._id} className="even:bg-[#f5f0c0]">
                  <td className="px-2.5 sm:px-4 py-2.5 border-b border-[#B07C4C] text-left text-sm sm:text-base">{item.name}</td>
                  <td className="px-2.5 sm:px-4 py-2.5 border-b border-[#B07C4C] text-left text-sm sm:text-base">{item.description}</td>
                  <td className="px-2.5 sm:px-4 py-2.5 border-b border-[#B07C4C] text-left text-sm sm:text-base">${item.price.toFixed(2)}</td>
                  <td className="px-2.5 sm:px-4 py-2.5 border-b border-[#B07C4C] text-left">
                    <button
                      className="bg-[#103852] text-[#B07C4C] border-2 border-[#B07C4C] px-3.5 py-1.5 cursor-pointer text-sm whitespace-nowrap hover:bg-[#B07C4C] hover:text-white"
                      onClick={() => addToCart(item.name, item.price)}
                    >
                      + Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default Menu
