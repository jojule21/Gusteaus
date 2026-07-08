function Cart({ cartItems, isOpen, onClose, onChangeQty, onRemove, onClear, onCheckout }) {
  // work out the total price of everything in the cart
  let total = 0
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].qty
  }

  return (
    <>
      {/* Dark overlay behind the panel */}
      <div
        className={
          (isOpen ? "block" : "hidden") +
          " fixed inset-0 bg-black/50 z-[900]"
        }
        onClick={onClose}
      ></div>

      {/* Slide-out panel */}
      <div
        className={
          "fixed top-0 right-0 w-[380px] max-w-[95vw] h-full bg-[#fffdd0] " +
          "border-l-4 border-[#B07C4C] z-[1000] flex flex-col overflow-hidden " +
          "transition-transform duration-300 ease-in-out " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        {/* Header */}
        <div className="bg-[#103852] text-[#B07C4C] px-5 py-[18px] flex items-center justify-between border-b-[3px] border-[#B07C4C]">
          <h2 className="text-[22px]">&#128722; Your Cart</h2>
          <button
            className="bg-transparent border-none text-[#B07C4C] text-[28px] cursor-pointer leading-none"
            onClick={onClose}
          >
            &#215;
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-[#103852] text-base mt-10 opacity-60">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-3 border-b border-[#B07C4C] gap-2.5"
              >
                <div className="flex-1">
                  <div className="font-bold text-[#103852] text-[15px]">{item.name}</div>
                  <div className="text-[#B07C4C] text-[14px] mt-0.5">
                    ${(item.price * item.qty).toFixed(2)} (${item.price.toFixed(2)} each)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="bg-[#103852] text-[#B07C4C] border-none w-7 h-7 text-lg cursor-pointer flex items-center justify-center leading-none hover:bg-[#B07C4C] hover:text-white"
                    onClick={() => onChangeQty(item.name, -1)}
                  >
                    &#8722;
                  </button>
                  <span className="text-base min-w-5 text-center text-[#103852]">{item.qty}</span>
                  <button
                    className="bg-[#103852] text-[#B07C4C] border-none w-7 h-7 text-lg cursor-pointer flex items-center justify-center leading-none hover:bg-[#B07C4C] hover:text-white"
                    onClick={() => onChangeQty(item.name, 1)}
                  >
                    &#43;
                  </button>
                </div>

                <button
                  className="bg-transparent border-none text-[#c0392b] text-xl cursor-pointer px-1 hover:opacity-70"
                  title="Remove"
                  onClick={() => onRemove(item.name)}
                >
                  &#215;
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with total + actions */}
        <div className="p-4 border-t-[3px] border-[#B07C4C] bg-[#f5f0c0]">
          <div className="text-xl font-bold text-[#103852] mb-3.5 text-right">
            Total: <span className="text-[#B07C4C]">${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 p-3 bg-white text-[#c0392b] border-2 border-[#c0392b] text-[15px] cursor-pointer hover:bg-[#c0392b] hover:text-white"
              onClick={onClear}
            >
              Clear Cart
            </button>
            <button
              className="flex-1 p-3 bg-[#103852] text-[#B07C4C] border-2 border-[#B07C4C] text-[15px] cursor-pointer hover:bg-[#B07C4C] hover:text-white"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
