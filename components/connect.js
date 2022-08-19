import { useEffect, useState } from "react"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"


export default function Connect() {

  const [web3Api, setWeb3Api] = useState({
    web3: null,
    provider: null,
    isProviderLoaded: false,
  })

  const [balance, setBalance] = useState(0)
  const [account, setAccount] = useState(null) 

  const setAccountListener = provider => {
    provider.on("accountsChanged", _ => window.location.reload())
    provider.on("chainChanged", _ => window.location.reload())
  }

  useEffect(() => {
      const loadProvider = async () =>{
        const provider = await detectEthereumProvider()
      
        if(provider) {
          setAccountListener(provider)
          setWeb3Api({
            web3: new ethers.providers.Web3Provider(provider),
            provider,
            isProviderLoaded: true
          })
        } else {
          setWeb3Api({...web3Api, isProviderLoaded: false})
          console.error("Please, install Metamask")
        }
      }
      loadProvider()  
  }, [])

  useEffect(() =>{
    const getAccount= async () => {
      const accounts = await web3Api.web3.listAccounts()
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccount()
  }, [web3Api.web3])

  useEffect(() => {
    const loadBalance = async () => {
      const accounts = await web3Api.web3.listAccounts()
      const balance = await web3Api.web3.getBalance(accounts[0])
      balance = ethers.utils.formatEther(balance)
      setBalance(balance)
    }
    account && loadBalance()
  }, [web3Api.web3, account, balance])

  

  if(!web3Api.isProviderLoaded) 
    return (
      <div className="grid justify-center mt-60">
        <div className="bg-red-300  rounded-xl shadow-2xl py-5 px-5 ">
            Please install Metamask
            <a 
              rel="noopener noreferrer"
              target='_blank' 
              href='https://docs.metamask.io'>
              Install Metamask
            </a>
        </div>
      </div>
    )

  return (
    <div className="grid justify-center mt-60">
      <div className="bg-white  rounded-xl shadow-2xl py-5 px-5 ">
      {account ? (
          <>
            <div className="grid">
              <span className="">Your address: {account}</span>
              <span>Your current balance: {balance} ETH</span>
            </div>
          </>
        ):(
          <>
          <div>
                <span className="ml-3 block mb-3 text-xl">Connect to your Metamask Wallet</span>
                <button className="inline-flex ml-20 bg-purple-700 py-3 px-3 rounded-xl text-2xl text-white hover:bg-pink-600
                              transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={() => web3Api.provider.request({method: "eth_requestAccounts" })}
                >
                  <img src="./metamask.svg" alt="" className="h-8 w-8"/>
                  <span className="ml-3">Connect</span>
                </button> 
          </div>
          </>
        )
      }
      </div>
    </div>
  )
}

