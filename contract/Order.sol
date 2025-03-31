// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NagOrder {
    IERC20 public aptosCoin;
    address public resourceAccount;

    struct Order {
        uint256 orderId;
        uint8 status;
        uint64 modelHash;
        uint64[] relayPubkeyList;
        uint64 down;
        uint64 cost;
        uint64 tip;
        address taker;
        uint64 product;
    }

    mapping(address => Order[]) public orderList;

    event Pull(
        address indexed address_,
        uint256 indexed orderId,
        uint64 modelHash,
        uint64[] relayPubkeyList,
        uint64 down,
        uint64 cost,
        uint64 tip
    );

    event RaisePayment(
        address indexed address_,
        uint256 indexed orderId,
        uint64 modelHash,
        uint64[] relayPubkeyList,
        uint64 down,
        uint64 cost,
        uint64 tip
    );

    event TakeOrder(
        address indexed relayAddress,
        uint256 indexed orderId,
        address indexed orderAddress
    );

    event CompleteOrder(
        address indexed orderAddress,
        uint256 indexed orderId,
        uint64 prime1,
        uint64 prime2
    );

    constructor(address _aptosCoin) {
        aptosCoin = IERC20(_aptosCoin);
        resourceAccount = address(this);
    }

    function pull(
        uint64 modelHash,
        uint64[] memory relayPubkeyList,
        uint64 down,
        uint64 cost,
        uint64 tip
    ) external {
        uint256 sum = down + cost + tip;
        require(
            aptosCoin.transferFrom(msg.sender, resourceAccount, sum),
            "Transfer failed"
        );

        uint256 orderId = orderList[msg.sender].length;
        Order memory newOrder = Order({
            orderId: orderId,
            status: 0,
            modelHash: modelHash,
            relayPubkeyList: relayPubkeyList,
            down: down,
            cost: cost,
            tip: tip,
            taker: msg.sender,
            product: 0
        });

        orderList[msg.sender].push(newOrder);

        emit Pull(
            msg.sender,
            orderId,
            modelHash,
            relayPubkeyList,
            down,
            cost,
            tip
        );
    }

    function raisePayment(
        uint256 orderId,
        uint64 down,
        uint64 cost,
        uint64 tip
    ) external {
        Order[] storage userOrders = orderList[msg.sender];
        require(userOrders.length > orderId, "Order does not exist");
        require(userOrders[orderId].status == 0, "Order not in initial state");

        uint256 sum = down + cost + tip;
        require(
            aptosCoin.transferFrom(msg.sender, resourceAccount, sum),
            "Transfer failed"
        );

        userOrders[orderId].down += down;
        userOrders[orderId].cost += cost;
        userOrders[orderId].tip += tip;

        emit RaisePayment(
            msg.sender,
            orderId,
            userOrders[orderId].modelHash,
            userOrders[orderId].relayPubkeyList,
            userOrders[orderId].down,
            userOrders[orderId].cost,
            userOrders[orderId].tip
        );
    }

    // Additional functions for TakeOrder and CompleteOrder would be implemented here

    function takeOrder(
        uint256 orderId,
        address orderAddress,
        uint64 relayPubkey,
        uint256 x
    ) external {
        require(_orderListExists[orderAddress], "OrderList not exists");
        OrderList storage list = _orderLists[orderAddress];
        require(orderId < list.orders.length, "Invalid order ID");

        Order storage order = list.orders[orderId];
        require(order.status == 0, "Order already taken");
        require(order.relayPubkeys[relayPubkey], "Invalid relay pubkey");

        order.status = 1;
        order.taker = msg.sender;
        order.product = x;

        emit TakeOrder(msg.sender, orderId, orderAddress);

        require(
            aptosCoin.transferFrom(owner(), msg.sender, order.down),
            "Transfer failed"
        );
    }

    function getOrderStatus(
        address addr,
        uint256 orderId
    ) external view returns (uint8) {
        require(orderId < orderLists[addr].length, "Order does not exist");
        return orderLists[addr][orderId].status;
    }

    function confirmReceived(uint256 orderId) external nonReentrant {
        require(
            orderId < orderLists[msg.sender].length,
            "Order does not exist"
        );
        Order storage order = orderLists[msg.sender][orderId];
        require(order.status == 1, "Invalid order status");
        order.status = 2;
    }

    function completeOrder(
        uint256 orderId,
        address orderAddress,
        uint64 prime1,
        uint64 prime2
    ) external {
        Order[] storage orders = orderList[orderAddress];
        require(orders.length > orderId, "Order not exist");
        require(
            orders[orderId].status == OrderStatus.Confirmed,
            "Invalid status"
        );

        uint256 product = uint256(prime1) * uint256(prime2);
        Order storage order = orders[orderId];

        if (product == order.product) {
            order.status = OrderStatus.Completed;

            // 转账逻辑（需合约持有足够代币）
            uint256 amount = order.cost + order.tip;
            require(aptosCoin.transfer(msg.sender, amount), "Transfer failed");

            emit CompleteOrder(orderAddress, orderId, prime1, prime2);
        } else {
            order.status = OrderStatus.Failed;
        }
    }
}
