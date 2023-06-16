const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { getContract, assert } = require("ethers")
const { developmentChains } = require("../../helper-hardhat.config")
const { expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("OurToken", () => {
          let token, deployer, accounts
          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              const tokenContract = await deployments.get("OurToken")
              token = await ethers.getContractAt(tokenContract.abi, tokenContract.address)
          })
          describe("constructor", () => {
              it("sets up initial supply correctly", async () => {
                  const supply = await token.balanceOf(deployer)
                  expect(supply.toString()).to.equal(ethers.parseEther("50").toString())
              })
              it("has correrct numbre of decimals", async () => {
                  const decimals = await token.decimals()
                  expect(decimals.toString()).to.be.equal("18")
              })
          })
          describe("transfer", () => {
              it("transfers to given account correctly", async () => {
                  const user = accounts[1].address
                  const amount = ethers.parseEther("1").toString()
                  await token.transfer(user, amount)
                  const finalBalance = await token.balanceOf(user)
                  expect(finalBalance).to.equal(amount)
              })
          })
      })
