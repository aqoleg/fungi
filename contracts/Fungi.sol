/*
https://github.com/aqoleg
*/

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.4;


interface Erc20 {
    function transfer(address _to, uint256 _value) external;
}


library Math {
    /// @return uint256 = a + b
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }

    /// @return uint256 = a - b
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "too big value");
        return a - b;
    }

    /// @return uint256 = a * b
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    /// @return uint256 = a / b
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /// @return int256 = a + b
    function signedAdd(int256 a, uint256 b) internal pure returns (int256) {
        int256 c = a + int256(b);
        assert(c >= a);
        return c;
    }

    /// @return int256 = a - b
    function signedSub(int256 a, uint256 b) internal pure returns (int256) {
        int256 c = a - int256(b);
        assert(c <= a);
        return c;
    }
}


/// @title fungi token
/// @author aqoleg
contract Fungi {
    using Math for uint256;
    using Math for int256;

    /// @dev erc20
    /// @return total amount of tokens
    uint256 public totalSupply;

    /// @dev erc20
    /// @return number of tokens for each account
    mapping(address => uint256) public balanceOf;

    /// @notice [holder][spender]
    /// @dev erc20
    /// @return number of tokens allowed for transfer using transferFrom() function
    mapping(address => mapping(address => uint256)) public allowance;

    /// @dev erc20
    /// @return number of decimals in the token
    uint8 public constant decimals = 18;

    /// @dev erc20
    /// @return name of the token
    string public constant name = "fungi token";

    /// @dev erc20
    /// @return symbol of the token
    string public constant symbol = "FGI";

    // wei*price = totalSupply + totalShares*profitPerShare/multiplicator - totalPayouts
    // dividends = sharesOf*profitPerShare/multiplicator - payoutsOf

    /// @return price of the token in tokens per eth
    uint256 public constant price = 10; // wei = ft / price

    /// @return total amount of shares (tokens and nft)
    uint256 public totalShares; // ft = sum(sharesOf)

    /// @return number of shares (tokens and nft) for each account
    mapping(address => uint256) public sharesOf; // ft = balanceOf() + sum(nftPrices)

    /// @return current profit per one share multiplyed by multiplicator (in tokens)
    uint256 public profitPerShare; // ft = shares * profitPerShare / multiplicator

    /// @return multiplicator for profit per share
    uint256 public constant multiplicator = 2**64;

    /// @return payed dividends for each account, in tokens
    mapping(address => int256) public payoutsOf; // ft

    /// @return address of nft contract
    address public nft = address(0);

    /// @notice emits when tokens are transferred
    /// @dev erc20
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /// @notice emits when allowance for transferFrom() function is changed
    /// @dev erc20
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    /// @notice emits when nft have been transferred or dividends have been withdrawed
    /// @dev time to reload the interface
    event Update();

    modifier onlyNft() {
        require(msg.sender == nft, "not nft");
        _;
    }

    /// @notice converts 90% of incoming eth to tokens, spreads the rest among shareholders
    receive() external payable {
        buy();
    }

    /// @dev call this after deploying to link the nft contract
    function setNft(address _nft) external {
        require(nft == address(0), "already set");
        nft = _nft;
    }

    /// @notice allows the sender to get tokens that have been sent to this contract
    function clean(address _contract, uint256 _value) external {
        Erc20(_contract).transfer(msg.sender, _value);
    }

    /// @dev converts tokens to nft, all price will be distributed as dividends
    function onMint(address _minter, uint256 _price) external onlyNft returns (bool) {
        // wei*price = Sp + Sh*pSh/M - P
        // wei*price = Sp-p + Sh*(pSh + p*M/Sh))/M - P

        balanceOf[_minter] = balanceOf[_minter].sub(_price);
        totalSupply = totalSupply.sub(_price);
        emit Transfer(_minter, address(0), _price);

        profitPerShare = profitPerShare.add(_price.mul(multiplicator).div(totalShares));
        return true;
    }

    /// @dev buys nft with tokens, transfers 90% of the price delta to seller, spread rests among shareholders
    function onBuy(
        address _seller,
        address _buyer,
        uint256 _previousPrice,
        uint256 _price
    ) external onlyNft returns (bool) {
        // wei*price = Sp + Sh*pSh/M - P
        // wei*price = Sp-f + (Sh+d)*(pSh + f*M/Sh)/M - (P + d*(pSh + f*M/Sh)/M)

        uint256 delta = _price.sub(_previousPrice);
        uint256 fee = delta.div(10);
        uint256 transferred = _price.sub(fee);
        delta = delta.sub(fee);

        profitPerShare = profitPerShare.add(fee.mul(multiplicator).div(totalShares)); // tokens > 0

        balanceOf[_seller] = balanceOf[_seller].add(transferred);
        balanceOf[_buyer] = balanceOf[_buyer].sub(_price);
        totalSupply = totalSupply.sub(fee); // + (_price - fee) - _price
        emit Transfer(_buyer, _seller, transferred);
        emit Transfer(_buyer, address(0), fee);

        sharesOf[_seller] = sharesOf[_seller].add(delta); // + transferred - _previousPrice
        // sharesOf[_buyer] = sharesOf[_buyer] - _price + _price
        totalShares = totalShares.add(delta);

        uint256 payout = delta.mul(profitPerShare).div(multiplicator);
        payoutsOf[_seller] = payoutsOf[_seller].signedAdd(payout);
        return true;
    }

    /// @dev transfers nft, no fee
    function onTransfer(
        address _from,
        address _to,
        uint256 _price
    ) external onlyNft returns (bool) {
        // wei*price = Sp + Sh*pSh/M - P
        // wei*price = Sp + Sh*pSh/M - (P + p*pSh/M - p*pSh/M)

        sharesOf[_from] = sharesOf[_from].sub(_price);
        sharesOf[_to] = sharesOf[_to].add(_price);

        uint256 payout = _price.mul(profitPerShare).div(multiplicator);
        payoutsOf[_from] = payoutsOf[_from].signedSub(payout);
        payoutsOf[_to] = payoutsOf[_to].signedAdd(payout);

        emit Update();
        return true;
    }

    /// @notice converts 90% into dividends, spreads the rest among shareholders
    function sell(uint256 _tokens) external {
        // wei*price = Sp + Sh*pSh/M - P
        // wei*price = Sp-t + (Sh-t)*(pSh + f*M/(Sh-t))/M - (P - ((t-f) + t*pSh/M))

        uint256 fee = _tokens.div(10);
        uint256 withdrawed = _tokens.sub(fee);

        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_tokens);
        totalSupply = totalSupply.sub(_tokens);
        emit Transfer(msg.sender, address(0), _tokens);

        sharesOf[msg.sender] = sharesOf[msg.sender].sub(_tokens);
        totalShares = totalShares.sub(_tokens);

        uint256 payout = withdrawed.add(_tokens.mul(profitPerShare).div(multiplicator));
        payoutsOf[msg.sender] = payoutsOf[msg.sender].signedSub(payout);

        profitPerShare = profitPerShare.add(fee.mul(multiplicator).div(totalShares)); // nft > 0
    }

    /// @notice withdraws all dividends
    function withdraw() external {
        // wei*price = Sp + Sh*pSh/M - P
        // (wei - d/price)*price = Sp + Sh*pSh/M - (P + d)

        uint256 dividends = dividendsOf(msg.sender);
        require(dividends != 0, "zero dividends");

        payoutsOf[msg.sender] = payoutsOf[msg.sender].signedAdd(dividends);

        emit Update();
        msg.sender.transfer(dividends.div(price));
    }

    /// @notice converts all dividends to tokens
    function reinvest() external {
        // wei*price = Sp + Sh*pSh/M - P
        // wei*price = (Sp+d) + (Sh+d)*pSh/M - (P + (d + d*pSh/M))

        uint256 dividends = dividendsOf(msg.sender);
        require(dividends != 0, "zero dividends");

        balanceOf[msg.sender] = balanceOf[msg.sender].add(dividends);
        totalSupply = totalSupply.add(dividends);
        emit Transfer(address(0), msg.sender, dividends);

        sharesOf[msg.sender] = sharesOf[msg.sender].add(dividends);
        totalShares = totalShares.add(dividends);

        uint256 payout = dividends.add(dividends.mul(profitPerShare).div(multiplicator));
        payoutsOf[msg.sender] = payoutsOf[msg.sender].signedAdd(payout);
    }

    /// @notice converts 90% of incoming eth to tokens, spreads rest among shareholders
    function buy() public payable {
        // wei*price = Sp + Sh*pSh/M - P
        // in * price = t + f
        // (wei + in)*price = Sp+t + (Sh+t)*(pSh + f*M/Sh)/M - (P + t*(pSh + f*M/Sh)/M)
        // first:
        // (wei + in)*price = Sp+t+f + (Sh+t+f)*pSh/M - (P + (t+f)*pSh/M)

        uint256 tokens = msg.value.mul(price);
        uint256 fee = tokens.div(10);
        tokens = tokens.sub(fee);

        if (totalShares != 0) {
            profitPerShare = profitPerShare.add(fee.mul(multiplicator).div(totalShares));
        } else {
            tokens = tokens.add(fee);
        }

        balanceOf[msg.sender] = balanceOf[msg.sender].add(tokens);
        totalSupply = totalSupply.add(tokens);
        emit Transfer(address(0), msg.sender, tokens);

        sharesOf[msg.sender] = sharesOf[msg.sender].add(tokens);
        totalShares = totalShares.add(tokens);

        uint256 payout = tokens.mul(profitPerShare).div(multiplicator);
        payoutsOf[msg.sender] = payoutsOf[msg.sender].signedAdd(payout);
    }

    /// @notice transfers tokens, spreads 5% among shareholders
    /// @dev erc20
    function transfer(address _to, uint256 _value) public returns (bool) {
        return _transfer(msg.sender, _to, _value);
    }

    /// @notice transfers tokens not owned by the spender, spreads 5% among shareholders
    /// @dev erc20
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
        return _transfer(_from, _to, _value);
    }

    /// @notice allows another address to transfer your tokens
    /// @dev erc20
    function approve(address _spender, uint256 _value) public returns (bool) {
        require(_spender != address(0), "zero _spender");

        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    /// @return amoutn of dividends (in tokens) for each account
    function dividendsOf(address _owner) public view returns (uint256) {
        // dividends = sharesOf*profitPerShare/multiplicator - payoutsOf

        uint256 a = sharesOf[_owner].mul(profitPerShare).div(multiplicator);
        int256 b = payoutsOf[_owner];
        // a - b
        if (b < 0) {
            return a.add(uint256(-b));
        } else {
            uint256 c = uint256(b);
            if (c > a) {
                return 0;
            }
            return a - c;
        }
    }

    function _transfer(address _from, address _to, uint256 _value) private returns (bool) {
        // wei*price = Sp + Sh*pSh/M - P
        // newPSh = pSh + f*M/(Sh-v)
        // wei*price = Sp-f + (Sh-f)*newPSh/M - (P - v*pSh/M + (v-f)*newPSh/M)

        require(_to != address(0), "zero _to");
        uint256 fee = _value.div(20);
        uint256 transferred = _value.sub(fee);

        uint256 payout = _value.mul(profitPerShare).div(multiplicator);
        profitPerShare = profitPerShare.add(fee.mul(multiplicator).div(totalShares.sub(_value))); // nft > 0

        balanceOf[_from] = balanceOf[_from].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(transferred);
        totalSupply = totalSupply.sub(fee);
        emit Transfer(_from, _to, transferred);
        emit Transfer(_from, address(0), fee);

        sharesOf[_from] = sharesOf[_from].sub(_value);
        sharesOf[_to] = sharesOf[_to].add(transferred);
        totalShares = totalShares.sub(fee);

        payoutsOf[_from] = payoutsOf[_from].signedSub(payout);
        payout = transferred.mul(profitPerShare).div(multiplicator);
        payoutsOf[_to] = payoutsOf[_to].signedAdd(payout);

        return true;
    }
}
