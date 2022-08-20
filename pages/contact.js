import Head from 'next/head'


export default function Contacts() {

    return (
      <div className="flex justify-center mt-40">
        <Head>
          <title>Contacts</title>
        </Head>
        <div className="grid bg-white rounded-xl shadow-xl py-5 px-5">
          <span className="text-2xl font-bold font-sans ml-12 mb-2">My Contacts</span>
            <button className="inline-flex bg-black rounded-xl px-7 py-3 mb-2 
                        transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    onClick={() => window.open('https://github.com/dreamLogicc')}             
            >
              <img src='/github.gif' alt='' className="h-10 w-10 rounded-full"/>
              <span className="text-white ml-3 text-xl py-1">GitHub Profile</span>
            </button> 
            <button className="inline-flex bg-black rounded-xl px-7 py-3 mb-2 
                          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}              
            >
              <img src='/vklogo.svg' alt='' className="h-10 w-10"/>
              <span className="text-white ml-3 text-xl py-1">VK Profile</span>
            </button>
            <button className="inline-flex bg-black rounded-xl px-7 py-3 mb-2 
                          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    onClick={() => window.open('https://t.me/kripochek9')} 
            >
              <img src='/tglogo.svg' alt='' className="h-10 w-10 mr-1"/>
              <span className="text-white ml-3 text-xl py-1">Telegram</span>
            </button>
        </div>
      </div>
    )
  }