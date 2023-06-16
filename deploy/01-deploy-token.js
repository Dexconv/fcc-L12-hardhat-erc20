const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat.config")

const initial_supply = ethers.parseEther("50").toString()

module.exports = async ({ getNamedAccounts, deployments, utils }) => {
    //get the deployer account
    const { deployer } = await getNamedAccounts()
    //get the deploy and log functions
    const { deploy, log } = deployments

    //check if it's on a development chain
    if (developmentChains.includes(network.name)) {
        log("development chain found")
        log("deploying with the initial supply of: ", initial_supply)

        //deploy the contract
        await deploy("OurToken", {
            args: [initial_supply],
            from: deployer,
            log: true,
        })
    }
}

module.exports.tags = ["all", "token"]
