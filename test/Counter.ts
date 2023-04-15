import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Counter } from '../typechain-types';

describe('Counter', function () {
  let counter: Counter;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory('Counter');
    counter = await Counter.deploy();
    await counter.deployed();
  });

  it('should add correctly', async function () {
    await counter.add(2, 3);
    const [total] = await counter.getValues();
    expect(total).to.equal(5);
  });

  it('should subtract correctly', async function () {
    await counter.subtract(5, 3);
    const [, subtracted] = await counter.getValues();
    expect(subtracted).to.equal(2);
  });

  it('should handle negative results correctly', async function () {
    await expect(counter.subtract(3, 5)).to.be.revertedWith(
      'Subtraction result cannot be negative'
    );
  });

  it('should multiply correctly', async function () {
    await counter.multiply(2, 3);
    const [, , multiplied] = await counter.getValues();
    expect(multiplied).to.equal(6);
  });

  it('should handle zero inputs correctly', async function () {
    await expect(counter.multiply(0, 3)).to.be.revertedWith(
      'One of the inputs is zero'
    );
    await expect(counter.multiply(2, 0)).to.be.revertedWith(
      'One of the inputs is zero'
    );
  });

  it('should divide correctly', async function () {
    await counter.divide(10, 2);
  });

  it('should handle division by zero correctly', async function () {
    await expect(counter.divide(10, 0)).to.be.revertedWith('Division by zero');
  });
});
