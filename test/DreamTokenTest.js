
const DreamToken = artifacts.require("DreamToken")
const { assert } = require('chai');
const truffleAssert = require('truffle-assertions');

contract("DreamToken", (accounts) =>{
    
    let factor = 10000;

    it("Deploy test", async ()=>{
        const instance = await DreamToken.new(factor)

        const address = await instance.address

        assert.notEqual(address, '')
    })


    it("supply test", async () => {
        const instance = await DreamToken.new(factor)

        const owner = await instance.owner()

        assert.equal(1000*1000*10**18, await instance.balanceOf(owner))
    })

    it("buy func test", async () => {

        const instance = await DreamToken.new(factor)
        
        await instance.buy(10, {from: accounts[1], value: 10*factor})
        assert.equal(10, await instance.balanceOf(accounts[1]))
    })

    it("sell func test", async () => {

        const instance = await DreamToken.new(factor)
        
        await instance.buy(35, {from: accounts[1], value: 35*factor})
        await instance.sell(5, {from: accounts[1]})

        assert.equal(30, await instance.balanceOf(accounts[1]))
    })

    it('only owner can set new factor', async () => {

        const instance = await DreamToken.new(factor)

        let user = accounts[2]
        let newFactor = 1000000

        await truffleAssert.reverts(instance.setFactor(newFactor, {from: user}), "You are not owner")
    })

    it('set new factor then buy tokens', async () => {

        const instance = await DreamToken.new(factor)
        let newFactor = 1000000
        const owner = await instance.owner() 

        await instance.setFactor(newFactor, {from: owner})

        await truffleAssert.reverts(instance.buy(35, {from: accounts[1], value: 35*factor}), 
                                    "Not enough funds to buy your amount of tokens")
                                   
        await instance.buy(35, {from: accounts[1], value: 35*newFactor})

        assert.equal(35, await instance.balanceOf(accounts[1]))

    })
})