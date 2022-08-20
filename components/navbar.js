import Link from 'next/link'

export default function Navbar() {


    return (
        <div>
          <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
              <a href="https://dream-token.vercel.app/" className="flex items-center">
                  <img src='./logo.svg' className="mr-3 h-6 sm:h-12 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:fill-purple-600"/>
              </a>
              <div className="flex">
                <ul className="flex flex-row p-4 md:flex-row md:space-x-8">
                  <li>
                    <Link href="/">
                      <a className="block py-2 pr-4 pl-3 text-black md:p-0 
                                  hover:text-purple-700
                                  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...
                                  ">
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services">
                    <a className="block py-2 pr-4 pl-3 text-black md:p-0 
                                  hover:text-purple-800
                                  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...
                                  ">
                        Services
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                    <a className="block py-2 pr-4 pl-3 text-black md:p-0 
                                  hover:text-purple-800
                                  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...
                                  ">
                        Contacts
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    )
}