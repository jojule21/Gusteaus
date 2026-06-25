import logo from '../assets/Gusteau-transparent.png'

function Header() {
  return (
    <header className="bg-[#FBE18B] text-center pt-4">
      <div className="flex justify-center items-center py-2.5">
        <img
          src={logo}
          alt="Gusteau's Logo"
          className="w-[20%] sm:w-[30%] md:w-[20%] max-w-[300px] min-w-[80px] h-auto"
        />
      </div>
    </header>
  )
}

export default Header
