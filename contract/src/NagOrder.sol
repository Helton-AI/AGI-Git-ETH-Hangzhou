// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NagOrder {
    struct Order {
        uint256 orderId;
        uint8 status; // 0: Created, 1: Taken, 2: Confirmed, 3: Completed, 4: Failed
        uint256 modelHash;
        uint256[] relayPubkeyList;
        uint256 down;
        uint256 cost;
        uint256 tip;
        address taker;
        uint256 product;
    }

    mapping(address => Order[]) public orderLists;
    IERC20 public aptosCoin;

    event Pull(
        address indexed userAddress,
        uint256 indexed orderId,
        uint256 modelHash,
        uint256[] relayPubkeyList,
        uint256 down,
        uint256 cost,
        uint256 tip
    );

    event RaisePayment(
        address indexed userAddress,
        uint256 indexed orderId,
        uint256 modelHash,
        uint256[] relayPubkeyList,
        uint256 down,
        uint256 cost,
        uint256 tip
    );

    event TakeOrder(
        address indexed relayAddress,
        uint256 indexed orderId,
        address indexed orderAddress
    );

    event CompleteOrder(
        address indexed orderAddress,
        uint256 indexed orderId,
        uint256 prime1,
        uint256 prime2
    );

    constructor(address _aptosCoin) {
        aptosCoin = IERC20(_aptosCoin);
    }

    function pull(
        uint256 modelHash,
        uint256[] memory relayPubkeyList,
        uint256 down,
        uint256 cost,
        uint256 tip
    ) external {
        uint256 sum = down + cost + tip;
        require(aptosCoin.transferFrom(msg.sender, address(this), sum), "Payment failed");
        
        uint256 orderId = uint256(orderLists[msg.sender].length);
        orderLists[msg.sender].push(Order({
            orderId: orderId,
            status: 0,
            modelHash: modelHash,
            relayPubkeyList: relayPubkeyList,
            down: down,
            cost: cost,
            tip: tip,
            taker: address(0),
            product: 0
        }));

        emit Pull(msg.sender, orderId, modelHash, relayPubkeyList, down, cost, tip);
    }

    function raisePayment(
        uint256 orderId,
        uint256 down,
        uint256 cost,
        uint256 tip
    ) external {
        Order storage order = orderLists[msg.sender][orderId];
        require(order.status == 0, "Invalid status");

        uint256 sum = down + cost + tip;
        require(aptosCoin.transferFrom(msg.sender, address(this), sum), "Payment failed");

        order.down += down;
        order.cost += cost;
        order.tip += tip;

        emit RaisePayment(msg.sender, orderId, order.modelHash, order.relayPubkeyList, down, cost, tip);
    }

    function takeOrder(
        uint256 orderId,
        address orderAddress,
        uint256 relayPubkey,
        uint256 x
    ) external {
        Order storage order = orderLists[orderAddress][orderId];
        require(order.status == 0, "Invalid status");
        require(contains(order.relayPubkeyList, relayPubkey), "Invalid relay key");

        order.status = 1;
        order.taker = msg.sender;
        order.product = x;
        
        require(aptosCoin.transfer(msg.sender, order.down), "Down payment failed");

        emit TakeOrder(msg.sender, orderId, orderAddress);
    }

    function confirmReceived(uint256 orderId) external {
        Order storage order = orderLists[msg.sender][orderId];
        require(order.status == 1, "Invalid status");
        order.status = 2;
    }

    function completeOrder(
        uint256 orderId,
        address orderAddress,
        uint256 prime1,
        uint256 prime2
    ) external {
        Order storage order = orderLists[orderAddress][orderId];
        require(order.status == 2, "Invalid status");

        if (prime1 * prime2 == order.product) {
            order.status = 3;
            uint256 amount = order.cost + order.tip;
            require(aptosCoin.transfer(order.taker, amount), "Payment failed");
            emit CompleteOrder(orderAddress, orderId, prime1, prime2);
        } else {
            order.status = 4;
        }
    }

    function getOrderStatus(address userAddress, uint256 orderId) external view returns (uint8) {
        return orderLists[userAddress][orderId].status;
    }

    function contains(uint256[] memory list, uint256 key) private pure returns (bool) {
        for (uint i = 0; i < list.length; i++) {
            if (list[i] == key) return true;
        }
        return false;
    }
}