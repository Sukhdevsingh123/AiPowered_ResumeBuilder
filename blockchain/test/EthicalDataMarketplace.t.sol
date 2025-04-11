// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/EthicalDataMarketplace.sol";

contract EthicalDataMarketplaceTest is Test {
    EthicalDataMarketplace marketplace;
    address owner = address(0x123);
    address buyer = address(0x456);

    function setUp() public {
        marketplace = new EthicalDataMarketplace();
    }

    function testUploadDataset() public {
        vm.prank(owner);
        marketplace.uploadDataset("cid_example", 1 ether);

        (address datasetOwner, string memory cid, uint256 price, bool purchased) = marketplace.datasets(0);
        assertEq(datasetOwner, owner);
        assertEq(cid, "cid_example");
        assertEq(price, 1 ether);
        assertEq(purchased, false);
    }

    function testBuyDataset() public {
        vm.prank(owner);
        marketplace.uploadDataset("cid_example", 1 ether);

        vm.prank(buyer);
        vm.deal(buyer, 1 ether);
        marketplace.buyDataset{value: 1 ether}(0);

        (, , , bool purchased) = marketplace.datasets(0);
        assertEq(purchased, true);
    }
}
