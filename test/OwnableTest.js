const Ownable = artifacts.require("Ownable");
const truffleAssert = require('truffle-assertions');


contract("Ownable", (accounts) => {

    it("deploy test", async () => {

        const instance = Ownable.new()
        const address = await instance.address;

        assert.notEqual(address, '')
    })

    it("onlyOwner test", async () => {

        const instance = await Ownable.new()
        const user = accounts[3]
        const newOwner = accounts[4]
        
        await truffleAssert.reverts(instance.transferOwnership(newOwner, {from: user}), "You are not owner")

        await truffleAssert.reverts(instance.renounceOwnership({from: user}), "You are not owner")
    })

    it("transferOwnership test", async () => {

        const instance = await Ownable.new()
        const oldOwner = await instance.owner()
        const newOwner = accounts[3]

        await instance.transferOwnership(newOwner, {from: oldOwner})

        assert.equal(newOwner, await instance.owner())
    })

    it("renounceOwnership test", async () => {

        const instance = await Ownable.new()

        await instance.renounceOwnership()

        assert.equal(await instance.owner(), "0x0000000000000000000000000000000000000000")
    })
})