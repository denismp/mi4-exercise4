const Funding = artifacts.require("Funding");

const FINNEY = 10**15;

contract("Funding", async accounts => {
    let firstAccount = accounts[0];
    let secondAccount = accounts[1];

    it("javascript test keeps track of donator balance", async () => {
        let funding = await Funding.new();
        await funding.donate({from: firstAccount, value: 5*FINNEY});
        await funding.donate({from: secondAccount, value: 15*FINNEY});
        await funding.donate({from: secondAccount, value: 3*FINNEY});
        assert.equal(await funding.balances.call(firstAccount), 5*FINNEY);
        assert.equal(await funding.balances.call(secondAccount), 18*FINNEY);
    });

    it("javascript test accepts donations", async () => {
        let funding = await Funding.deployed();
        await funding.donate({from: firstAccount, value: 10*FINNEY});
        await funding.donate({from: secondAccount, value: 20*FINNEY});
        assert.equal(await funding.raised.call(), 30*FINNEY);
    });

    it("javascript test sets an owner", async () => {
        let funding = await Funding.deployed();
        assert.equal(await funding.owner.call(), firstAccount);
    });
});