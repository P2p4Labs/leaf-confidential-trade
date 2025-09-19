// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract LeafConfidentialTrade is SepoliaConfig {
    using FHE for *;
    
    struct Trade {
        euint32 tradeId;
        euint32 amount;
        euint32 price;
        euint8 tradeType; // 0 = buy, 1 = sell
        ebool isActive;
        address trader;
        uint256 timestamp;
        string assetSymbol;
    }
    
    struct OrderBook {
        euint32 totalBuyOrders;
        euint32 totalSellOrders;
        euint32 totalVolume;
        euint32 averagePrice;
    }
    
    struct TraderProfile {
        euint32 reputation;
        euint32 totalTrades;
        euint32 successfulTrades;
        euint32 totalVolume;
        ebool isVerified;
    }
    
    mapping(uint256 => Trade) public trades;
    mapping(address => TraderProfile) public traderProfiles;
    mapping(string => OrderBook) public orderBooks;
    mapping(address => euint32) public balances;
    
    uint256 public tradeCounter;
    address public owner;
    address public verifier;
    
    event TradeCreated(uint256 indexed tradeId, address indexed trader, string assetSymbol);
    event TradeExecuted(uint256 indexed tradeId, address indexed buyer, address indexed seller);
    event TraderVerified(address indexed trader, bool isVerified);
    event ReputationUpdated(address indexed trader, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createTrade(
        externalEuint32 amount,
        externalEuint32 price,
        uint8 tradeType,
        string memory assetSymbol,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(assetSymbol).length > 0, "Asset symbol cannot be empty");
        require(tradeType <= 1, "Invalid trade type");
        
        uint256 tradeId = tradeCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalPrice = FHE.fromExternal(price, inputProof);
        
        trades[tradeId] = Trade({
            tradeId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            price: internalPrice,
            tradeType: FHE.asEuint8(tradeType),
            isActive: FHE.asEbool(true),
            trader: msg.sender,
            timestamp: block.timestamp,
            assetSymbol: assetSymbol
        });
        
        // Update trader profile
        traderProfiles[msg.sender].totalTrades = FHE.add(traderProfiles[msg.sender].totalTrades, FHE.asEuint32(1));
        
        // Update order book
        if (tradeType == 0) { // Buy order
            orderBooks[assetSymbol].totalBuyOrders = FHE.add(orderBooks[assetSymbol].totalBuyOrders, FHE.asEuint32(1));
        } else { // Sell order
            orderBooks[assetSymbol].totalSellOrders = FHE.add(orderBooks[assetSymbol].totalSellOrders, FHE.asEuint32(1));
        }
        
        emit TradeCreated(tradeId, msg.sender, assetSymbol);
        return tradeId;
    }
    
    function executeTrade(
        uint256 tradeId,
        address counterparty
    ) public {
        require(trades[tradeId].trader != address(0), "Trade does not exist");
        require(FHE.decrypt(trades[tradeId].isActive), "Trade is not active");
        require(msg.sender == counterparty, "Only counterparty can execute");
        
        // Mark trade as executed
        trades[tradeId].isActive = FHE.asEbool(false);
        
        // Update trader profiles
        traderProfiles[msg.sender].successfulTrades = FHE.add(traderProfiles[msg.sender].successfulTrades, FHE.asEuint32(1));
        traderProfiles[trades[tradeId].trader].successfulTrades = FHE.add(traderProfiles[trades[tradeId].trader].successfulTrades, FHE.asEuint32(1));
        
        emit TradeExecuted(tradeId, msg.sender, trades[tradeId].trader);
    }
    
    function verifyTrader(address trader, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify traders");
        require(trader != address(0), "Invalid trader address");
        
        traderProfiles[trader].isVerified = FHE.asEbool(isVerified);
        emit TraderVerified(trader, isVerified);
    }
    
    function updateReputation(address trader, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(trader != address(0), "Invalid trader address");
        
        traderProfiles[trader].reputation = reputation;
        emit ReputationUpdated(trader, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getTradeInfo(uint256 tradeId) public view returns (
        uint8 amount,
        uint8 price,
        uint8 tradeType,
        bool isActive,
        address trader,
        uint256 timestamp,
        string memory assetSymbol
    ) {
        Trade storage trade = trades[tradeId];
        return (
            0, // FHE.decrypt(trade.amount) - will be decrypted off-chain
            0, // FHE.decrypt(trade.price) - will be decrypted off-chain
            0, // FHE.decrypt(trade.tradeType) - will be decrypted off-chain
            false, // FHE.decrypt(trade.isActive) - will be decrypted off-chain
            trade.trader,
            trade.timestamp,
            trade.assetSymbol
        );
    }
    
    function getTraderProfile(address trader) public view returns (
        uint8 reputation,
        uint8 totalTrades,
        uint8 successfulTrades,
        uint8 totalVolume,
        bool isVerified
    ) {
        TraderProfile storage profile = traderProfiles[trader];
        return (
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalTrades) - will be decrypted off-chain
            0, // FHE.decrypt(profile.successfulTrades) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalVolume) - will be decrypted off-chain
            false // FHE.decrypt(profile.isVerified) - will be decrypted off-chain
        );
    }
    
    function getOrderBookInfo(string memory assetSymbol) public view returns (
        uint8 totalBuyOrders,
        uint8 totalSellOrders,
        uint8 totalVolume,
        uint8 averagePrice
    ) {
        OrderBook storage orderBook = orderBooks[assetSymbol];
        return (
            0, // FHE.decrypt(orderBook.totalBuyOrders) - will be decrypted off-chain
            0, // FHE.decrypt(orderBook.totalSellOrders) - will be decrypted off-chain
            0, // FHE.decrypt(orderBook.totalVolume) - will be decrypted off-chain
            0  // FHE.decrypt(orderBook.averagePrice) - will be decrypted off-chain
        );
    }
    
    function depositFunds(externalEuint32 amount, bytes calldata inputProof) public {
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        balances[msg.sender] = FHE.add(balances[msg.sender], internalAmount);
    }
    
    function withdrawFunds(externalEuint32 amount, bytes calldata inputProof) public {
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        require(FHE.decrypt(FHE.le(internalAmount, balances[msg.sender])), "Insufficient balance");
        balances[msg.sender] = FHE.sub(balances[msg.sender], internalAmount);
    }
    
    function getBalance(address account) public view returns (uint8) {
        return 0; // FHE.decrypt(balances[account]) - will be decrypted off-chain
    }
}
