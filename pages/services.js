import { useCallback, useEffect, useState } from "react"
import detectEthereumProvider from "@metamask/detect-provider"
import { DT_CONTRACT as contractAddress } from "../contract"
import dreamToken from '../build/contracts/DreamToken.json'
import { BigNumber, ethers } from "ethers"
import Head from 'next/head'


export default function Services() {

  const [web3Api, setWeb3Api] = useState({
    web3: null,
    provider: null,
    isProviderLoaded: false,
    contract: null,
    signer: null
  })

  const [factor, setFactor] = useState()
  const [balance, setBalance] = useState(0)
  const [account, setAccount] = useState(null)
  const [value, setValue] = useState() 
  const [shouldReload, reload] = useState(false)

  const reloadEffect = () => reload(!shouldReload)

  const setAccountListener = provider => {
    provider.on("accountsChanged", _ => window.location.reload())
    provider.on("chainChanged", _ => window.location.reload())
    provider.on('confirmation', _ => window.location.reload())
  }

  useEffect(() => {
      const loadProvider = async () =>{
        const detectedProvider = await detectEthereumProvider()
        if(detectedProvider) {
          setAccountListener(detectedProvider)
          const provider = new ethers.providers.Web3Provider(detectedProvider)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, dreamToken.abi, signer)
          setWeb3Api({
            web3: provider,
            provider: detectedProvider,
            isProviderLoaded: true,
            signer: signer,
            contract: contract
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

  useEffect(()=>{
    const loadBalance = async () => { 
      const accounts = await web3Api.web3.listAccounts()
      const balance = await web3Api.contract.balanceOf(accounts[0])
      balance = ethers.utils.formatUnits(balance, 18)
      // balance = ethers.utils.formatEther(balance)
      setBalance(balance.toString())
    }

    account && web3Api.contract && loadBalance()
  }, [web3Api, balance, shouldReload, account])

  useEffect(() => {
    const loadFactor = async () => { 
      const factor = await web3Api.contract.factor()
      factor = ethers.utils.formatEther(factor)
      setFactor(factor)
    }
    account && web3Api.contract && loadFactor()
  },[web3Api.contract, factor, shouldReload, account] )

  const buy = useCallback( async (value) => {
    value = BigNumber.from(value)
    const factor = await web3Api.contract.factor()
    const payment = value.mul(factor)
    
    try{
      await web3Api.contract.buy(value, {
        from: account, 
        value: payment
      })
    } catch (e) {
      console.log(e.message)
    }
    
    reloadEffect()
  }, [web3Api.contract, account, shouldReload, balance])

  const sell = useCallback(async (value) => {
    try{
      await web3Api.contract.sell(value, {
        from: account, 
      })
    } catch (e) {
      console.log(e.message)
    }
    
    reloadEffect()
  }, [web3Api.contract, account, balance])

  const handlesubmit = () => {
    form.current.reset()
  }


  if(!account) 
    return (
      <div className="grid justify-center mt-40">
        <Head>
          <title>Services</title>
        </Head>
        <div className="grid bg-white rounded-xl shadow-xl py-3 px-5 mb-2">
          <span>To use Services, please connect to your Metamask Wallet</span>
        </div>
      </div>
    )
  
  return (
    <div className="grid justify-center mt-32">
      <Head>
          <title>Services</title>
      </Head>
      <div className="grid bg-white rounded-xl shadow-xl py-3 px-5 mb-2 text-2xl font-bold">
        Your Token balance: {balance} DT
      </div>
      <div className="grid bg-white rounded-xl shadow-xl py-3 px-5 mb-2 text-2xl font-bold">
        Current course: {factor} ETH per DT
      </div>
      <div className="grid bg-white rounded-xl shadow-xl py-3 px-5 mb-2">
        <input className="border-2 rounded-xl focus:border-purple-500 border-purple-600 py-5 px-5 mb-3" 
               placeholder="Your amount"
               onChange={(e) => setValue(e.target.value)}
               onSubmit = {handlesubmit}
        />
        <button className="bg-purple-700 px-3 py-3 rounded-2xl text-white text-xl hover:bg-pink-600
                    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    onClick={(e) => buy(value)}
        > 
          Buy Token
        </button>
      </div>
      <div className="grid bg-white rounded-xl shadow-xl py-3 px-5">
        <input className="border-2 rounded-xl focus:border-purple-500 border-purple-600 py-5 px-5 mb-3" 
               placeholder="Your amount"
               onChange={(e) => setValue(e.target.value)}
               onSubmit = {handlesubmit}
               />
        <button className="bg-purple-700 px-3 py-3 rounded-2xl text-white text-xl hover:bg-pink-600
                    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                onClick={(e) => sell(value)}
          >
          Sell Token
        </button>
      </div>
    </div>
  )
}