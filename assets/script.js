"use strict";

(function () {
    var tabStart = 0;
    var tabFt = 1;
    var tabNft = 2;
    var tabCreate = 3;
    var tabMarket = 4;
    var networkMain = 1;
    var networkRopsten = 3;
    var ftAbi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "buy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "dividendsOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "reinvest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokens",
                    "type": "uint256"
                }
            ],
            "name": "sell",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "sharesOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ];
    var nftAbi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "buy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "descriptionOf",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "idOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "imageOf",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_sellPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_image",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "nameOf",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "priceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "sellPriceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_sellPrice",
                    "type": "uint256"
                }
            ],
            "name": "setPrice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "tokensOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    var tab = tabStart;
    var network = null;
    var ftAddress, nftAddress;
    var ft, nft; // contract
    var prefix; // explorer prefix
    var account = null;
    var blocked = false;
    var ftBalance; // BigNumber
    var image = null; // file
    var selectedId;
    var nftLoader = 0;
    var marketLoader = 0;

    window.onload = function () {
        document.getElementById('headerConnect').onclick = connect;
        document.getElementById('headerStart').onclick = function () {
            display(tabStart);
        }
        document.getElementById('headerFt').onclick = function () {
            display(tabFt);
        };
        document.getElementById('headerNft').onclick = function () {
            display(tabNft);
        };
        document.getElementById('headerCreate').onclick = function () {
            display(tabCreate);
        };
        document.getElementById('headerMarket').onclick = function () {
            display(tabMarket);
        };
        document.getElementById('ftBuy').onclick = ftBuy;
        document.getElementById('ftSell').onclick = ftSell;
        document.getElementById('ftWithdraw').onclick = ftWithdraw;
        document.getElementById('ftReinvest').onclick = ftReinvest;
        document.getElementById('nftClose').onclick = nftClose;
        document.getElementById('nftSet').onclick = nftPrice;
        document.getElementById('nftSend').onclick = nftSend;
        document.getElementById('createMint').onclick = createMint;
        document.getElementById('marketClose').onclick = marketClose;
        document.getElementById('marketBuyButton').onclick = marketBuy;

        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js';
        script.onload = function () {
            if (typeof window.ethereum === 'undefined') {
                document.getElementById('startMessage').innerHTML = 'install metamask';
            } else {
                document.getElementById('startMessage').innerHTML = '';
                window.web3 = new Web3(ethereum);
                load();
                ethereum.on('chainChanged', load);
                ethereum.on('accountsChanged', load);
                ethereum.autoRefreshOnNetworkChange = false;
            }
        };
        document.body.appendChild(script);

        document.getElementById('createImage').onchange = function (event) {
            createImage(event.target.files);
        };

        document.getElementById('createPreview').ondragenter = function (event) {
            event.preventDefault();
            document.getElementById('createPreview').className = 'drag';
        };
        document.getElementById('createPreview').ondragover = function (event) {
            event.preventDefault();
            document.getElementById('createPreview').className = 'drag';
        };
        document.getElementById('createPreview').ondragleave = function () {
            document.getElementById('createPreview').className = '';
        };
        document.getElementById('createPreview').ondrop = function (event) {
            event.preventDefault();
            document.getElementById('createPreview').className = '';
            createImage(event.dataTransfer.files);
        };
    };

    function display(newTab) {
        if (tab === newTab) {
            return;
        }
        tab = newTab;
        nftClose();
        marketClose();

        document.getElementById('headerFt').className = tab === tabFt ? 'active' : '';
        document.getElementById('headerNft').className = tab === tabNft ? 'active' : '';
        document.getElementById('headerCreate').className = tab === tabCreate ? 'active' : '';
        document.getElementById('headerMarket').className = tab === tabMarket ? 'active' : '';
        document.getElementById('start').style.display = tab === tabStart ? 'block' : 'none';
        document.getElementById('ft').style.display = tab === tabFt ? 'block' : 'none';
        document.getElementById('nft').style.display = tab === tabNft ? 'block' : 'none';
        document.getElementById('create').style.display = tab === tabCreate ? 'block' : 'none';
        document.getElementById('market').style.display = tab === tabMarket ? 'block' : 'none';
    }

    function load() {
        ethereum.request({
            method: 'net_version'
        }).then(function (newNetwork) {
            newNetwork = Number(newNetwork);
            if (newNetwork !== networkRopsten) {
                network = null;
                account = null;
                document.getElementById('connect').style.display = '';
                document.getElementById('startMessage').innerHTML = 'switch to the ropsten network';
                return;
            }
            if (network !== newNetwork) {
                network = newNetwork;
                account = null;
                document.getElementById('startMessage').innerHTML = '';
                document.getElementById('log').innerHTML = '';
                prefix = 'https://ropsten.etherscan.io/';
                ftAddress = '0x8adaDB0fBD9dEac3350c4265F58d858599380D7e';
                nftAddress = '0xA2991cc511fccf14B4542f10a250683Af04CE374';
                document.getElementById('ftAddress').innerHTML = ftAddress;
                document.getElementById('ftAddress').href = prefix + '/address/' + ftAddress;
                document.getElementById('nftAddress').innerHTML = nftAddress;
                document.getElementById('nftAddress').href = prefix + '/address/' + nftAddress;
                ft = new web3.eth.Contract(ftAbi, ftAddress);
                nft = new web3.eth.Contract(nftAbi, nftAddress);
                ft.events.allEvents().on('data', function () {
                    if (ft !== null) {
                        loadBalance(false);
                        if (account !== null) {
                            loadFt(false);
                        }
                    }
                });
                nft.events.allEvents().on('data', function () {
                    if (nft !== null) {
                        loadMarket();
                        if (account !== null) {
                            loadNft();
                        }
                    }
                });
            }

            ethereum.request({
                method: 'eth_accounts'
            }).then(function (accounts) {
                if (accounts.length === 0) {
                    account = null;
                    document.getElementById('connect').style.display = '';
                    loadBalance(true);
                    loadMarket();
                    return;
                }
                if (accounts[0] === account) {
                    return;
                }
                account = accounts[0];
                document.getElementById('connect').style.display = 'none';
                logAccount();
                nftClose();
                marketClose();
                loadBalance(true);
                loadFt(true);
                loadNft();
                loadMarket();
            });
        }).catch(function (error) {
            console.error(error);
            if (error.message) {
                error = error.message;
            }
            alert(error);
        });
    }

    function connect() {
        if (typeof window.ethereum === 'undefined') {
            alert('ethereum is not loaded');
            return;
        }
        ethereum.request({
            method: 'eth_requestAccounts'
        }).then(function () {
            ethereum.request({
                method: 'net_version'
            }).then(function (newNetwork) {
                newNetwork = Number(newNetwork);
                if (newNetwork !== networkRopsten) {
                    alert('switch to the ropsten network');
                }
            });
        }).catch(function (error) {
            console.error(error);
            if (error.message) {
                error = error.message;
            }
            alert(error);
        });
    }

    function check() {
        if (typeof window.ethereum === 'undefined') {
            alert('ethereum is not loaded');
        } else if (network === null) {
            alert('switch to the ropsten network');
        } else if (account === null) {
            connect();
        } else if (blocked) {
            alert('confirm or reject previous tx');
        } else {
            return true;
        }
        return false;
    }

    function logAccount() {
        var p = document.createElement('p');
        p.className = 'onestring';
        var span = document.createElement('span');
        span.innerHTML = 'account ';
        p.appendChild(span);
        var a = document.createElement('a');
        a.innerHTML = web3.utils.toChecksumAddress(account);
        a.href = prefix + 'address/' + account;
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
        p.appendChild(a);
        var div = document.getElementById('log');
        div.insertBefore(p, div.firstChild);
    }

    function logTx(message, hash) {
        var p = document.createElement('p');
        p.classList.add('onestring');
        var span = document.createElement('span');
        span.innerHTML = message + ', tx ';
        p.appendChild(span);
        var a = document.createElement('a');
        a.innerHTML = hash;
        a.href = prefix + 'tx/' + hash;
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
        p.appendChild(a);
        span = document.createElement('span');
        span.innerHTML = ' - unconfirmed';
        p.appendChild(span);
        var div = document.getElementById('log');
        div.insertBefore(p, div.firstChild);
        return span;
    }

    function loadBalance(clear) {
        if (clear) {
            document.getElementById('ftContractEth').innerHTML = '...';
        }
        web3.eth.getBalance(ftAddress).then(function (result) {
            result = new BigNumber(result).shiftedBy(-18);
            if (result.isZero()) {
                document.getElementById('ftContractEth').removeAttribute('title');
                document.getElementById('ftContractEth').innerHTML = '0';
            } else {
                document.getElementById('ftContractEth').title = result.toFixed(18);
                result = result.toFixed(3, BigNumber.ROUND_DOWN);
                document.getElementById('ftContractEth').innerHTML = result;
            }
        });
    }

    function loadFt(clear) {
        if (clear) {
            ftBalance = null;
            document.getElementById('ftShares').innerHTML = '...';
            document.getElementById('ftBalance').innerHTML = '...';
            document.getElementById('ftDividends').innerHTML = '...';
        }
        ft.methods.sharesOf(account).call().then(function (result) {
            result = new BigNumber(result).shiftedBy(-18);
            if (result.isZero()) {
                document.getElementById('ftShares').removeAttribute('title');
                document.getElementById('ftShares').innerHTML = '0';
            } else {
                document.getElementById('ftShares').title = result.toFixed(18);
                result = result.toFixed(3, BigNumber.ROUND_DOWN);
                document.getElementById('ftShares').innerHTML = result;
            }
        });
        ft.methods.balanceOf(account).call().then(function (result) {
            ftBalance = new BigNumber(result).shiftedBy(-18);
            if (ftBalance.isZero()) {
                document.getElementById('ftBalance').removeAttribute('title');
                document.getElementById('ftBalance').innerHTML = '0';
            } else {
                document.getElementById('ftBalance').title = ftBalance.toFixed(18);
                result = ftBalance.toFixed(3, BigNumber.ROUND_DOWN);
                document.getElementById('ftBalance').innerHTML = result;
            }
        });
        ft.methods.dividendsOf(account).call().then(function (result) {
            result = new BigNumber(result).shiftedBy(-18);
            if (result.isZero()) {
                document.getElementById('ftDividends').removeAttribute('title');
                document.getElementById('ftDividends').innerHTML = '0';
            } else {
                document.getElementById('ftDividends').title = result.toFixed(18);
                result = result.toFixed(3, BigNumber.ROUND_DOWN);
                document.getElementById('ftDividends').innerHTML = result;
            }
        });
    }

    function loadNft() {
        var thisNftLoader = ++nftLoader;
        document.getElementById('nftItems').innerHTML = '<p class=\'itemsmessage\'>loading...</p>';
        nft.methods.tokensOf(account).call().then(function (result) {
            if (thisNftLoader !== nftLoader) {
                return;
            }
            if (result == 0) {
                document.getElementById('nftItems').innerHTML =
                    '<p class=\'itemsmessage\'>You have no NFT, buy or create it!';
            } else {
                document.getElementById('nftItems').innerHTML = '';
                for (var i = result - 1; i >= 0; i--) {
                    loadIndex(i);
                }
            }
        });

        function loadIndex(index) {
            var div = document.createElement('div');
            document.getElementById('nftItems').appendChild(div);
            var button = document.createElement('button');
            button.innerHTML = 'loading...';
            button.onclick = function (event) {
                nftItem(event.target.id);
            };
            div.appendChild(button);
            var p = document.createElement('p');
            div.appendChild(p);
            nft.methods.idOf(account, index).call().then(function (id) {
                if (thisNftLoader !== nftLoader) {
                    return;
                }
                button.id = id;
                nft.methods.imageOf(id).call().then(function (ipfs) {
                    if (thisNftLoader === nftLoader) {
                        button.innerHTML = '';
                        button.style.backgroundImage = 'url(\'https://ipfs.io' + ipfs + '\')';
                    }
                });
                nft.methods.nameOf(id).call().then(function (name) {
                    if (thisNftLoader === nftLoader) {
                        p.innerHTML = name;
                    }
                });
            });
        }
    }

    function loadMarket() {
        var thisMarketLoader = ++marketLoader;
        document.getElementById('marketItems').innerHTML = '<p class=\'itemsmessage\'>loading...</p>';
        var empty = true;
        nft.methods.totalSupply().call().then(function (result) {
            if (thisMarketLoader !== marketLoader) {
                return;
            }
            document.getElementById('marketItems').innerHTML =
                '<p class=\'itemsmessage\'>The market is empty, put something up for sale!';
            for (var i = result - 1; i >= 0; i--) {
                loadId(i);
            }
        });

        function loadId(id) {
            nft.methods.sellPriceOf(id).call().then(function (sellPrice) {
                if (thisMarketLoader !== marketLoader || sellPrice == 0) {
                    return;
                }
                if (empty) {
                    empty = false;
                    document.getElementById('marketItems').innerHTML = '';
                }
                var div = document.createElement('div');
                document.getElementById('marketItems').appendChild(div);
                var button = document.createElement('button');
                button.innerHTML = 'loading...';
                button.id = 'market' + id;
                button.onclick = function (event) {
                    marketItem(event.target.id.substring(6));
                };
                div.appendChild(button);
                var p = document.createElement('p');
                div.appendChild(p);
                nft.methods.imageOf(id).call().then(function (ipfs) {
                    if (thisMarketLoader === marketLoader) {
                        button.innerHTML = '';
                        button.style.backgroundImage = 'url(\'https://ipfs.io' + ipfs + '\')';
                    }
                });
                nft.methods.nameOf(id).call().then(function (name) {
                    if (thisMarketLoader === marketLoader) {
                        p.innerHTML = name;
                    }
                });
            });
        }
    }

    function ftBuy() {
        if (!check()) {
            return;
        }
        var value = new BigNumber(document.getElementById('ftBuyValue').value);
        if (value.isNaN()) {
            document.getElementById('ftBuyValueHint').innerHTML = 'enter a number';
            return;
        }
        blocked = true;
        web3.eth.getBalance(account).then(function (eth) {
            eth = new BigNumber(eth).shiftedBy(-18);
            if (value.gt(eth)) {
                document.getElementById('ftBuyValueHint').innerHTML = 'enter a value less than ' +
                    eth.toFixed(3, BigNumber.ROUND_DOWN);
                blocked = false;
                return;
            }
            document.getElementById('ftBuyValueHint').innerHTML = '';

            var message;
            ft.methods.buy().send({
                from: account,
                value: value.shiftedBy(18)
            }).on('transactionHash', function (hash) {
                message = logTx('buy for ' + value + ' ETH', hash);
                blocked = false;
            }).on('confirmation', function (confirmationNumber, receipt) {
                if (confirmationNumber != 0) {
                    return;
                }
                if (!receipt.status) {
                    message.innerHTML = ' - rejected';
                } else {
                    message.innerHTML = ' - confirmed';
                }
            }).catch(function (error) {
                console.error(error);
                if (error.message) {
                    error = error.message;
                }
                alert(error);
                blocked = false;
            });
        });
    }

    function ftSell() {
        if (!check()) {
            return;
        }
        if (ftBalance.isZero()) {
            document.getElementById('ftSellValueHint').innerHTML = 'buy some FGI';
            return;
        }
        var value = new BigNumber(document.getElementById('ftSellValue').value);
        if (value.isNaN()) {
            document.getElementById('ftSellValueHint').innerHTML = 'enter a number';
            return;
        }
        if (value.gt(ftBalance)) {
            document.getElementById('ftSellValueHint').innerHTML = 'enter a value less than ' +
                ftBalance.toFixed(3, BigNumber.ROUND_DOWN);
            return;
        }
        blocked = true;
        document.getElementById('ftSellValueHint').innerHTML = '';

        var message;
        ft.methods.sell(value.shiftedBy(18).toFixed(0)).send({
            from: account
        }).on('transactionHash', function (hash) {
            message = logTx('sell ' + value + ' FGI', hash);
            blocked = false;
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber != 0) {
                return;
            }
            if (!receipt.status) {
                message.innerHTML = ' - rejected';
            } else {
                message.innerHTML = ' - confirmed';
            }
        }).catch(function (error) {
            console.error(error);
            if (error.message) {
                error = error.message;
            }
            alert(error);
            blocked = false;
        });
    }

    function ftWithdraw() {
        if (!check()) {
            return;
        }
        blocked = true;
        var message;
        ft.methods.withdraw().send({
            from: account
        }).on('transactionHash', function (hash) {
            message = logTx('withdraw ' + document.getElementById('ftDividends').innerHTML + ' FGI', hash);
            blocked = false;
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber != 0) {
                return;
            }
            if (!receipt.status) {
                message.innerHTML = ' - rejected';
            } else {
                message.innerHTML = ' - confirmed';
            }
        }).catch(function (error) {
            console.error(error);
            if (error.message) {
                error = error.message;
            }
            alert(error);
            blocked = false;
        });
    }

    function ftReinvest() {
        if (!check()) {
            return;
        }
        blocked = true;
        var message;
        ft.methods.reinvest().send({
            from: account
        }).on('transactionHash', function (hash) {
            message = logTx('reinvest ' + document.getElementById('ftDividends').innerHTML + ' FGI', hash);
            blocked = false;
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber != 0) {
                return;
            }
            if (!receipt.status) {
                message.innerHTML = ' - rejected';
            } else {
                message.innerHTML = ' - confirmed';
            }
        }).catch(function (error) {
            console.error(error);
            if (error.message) {
                error = error.message;
            }
            alert(error);
            blocked = false;
        });
    }

    function nftItem(id) {
        document.getElementById('nftItems').style.display = 'none';
        document.getElementById('nftEdit').style.display = 'block';
        selectedId = id;

        var button = document.getElementById('nftItemImage');
        button.innerHTML = 'loading...';
        button.style.backgroundImage = '';
        button.onclick = '';
        nft.methods.imageOf(id).call().then(function (ipfs) {
            ipfs = 'https://ipfs.io' + ipfs;
            button.innerHTML = '';
            button.style.backgroundImage = 'url(\'' + ipfs + '\')';
            button.onclick = function () {
                window.open(ipfs);
            };
        });

        document.getElementById('nftItemName').innerHTML = '...';
        nft.methods.nameOf(id).call().then(function (name) {
            document.getElementById('nftItemName').innerHTML = name;
        });

        document.getElementById('nftItemDescription').innerHTML = '...';
        nft.methods.descriptionOf(id).call().then(function (description) {
            document.getElementById('nftItemDescription').innerHTML = description;
        });

        document.getElementById('nftItemPrice').innerHTML = '...';
        document.getElementById('nftItemPrice').title = '';
        nft.methods.priceOf(id).call().then(function (price) {
            price = new BigNumber(price).shiftedBy(-18);
            document.getElementById('nftItemPrice').title = price;
            price = price.toFixed(3, BigNumber.ROUND_DOWN);
            document.getElementById('nftItemPrice').innerHTML = price;
        });

        document.getElementById('nftSellPriceHint').innerHTML = '';
        document.getElementById('nftSellPrice').value = '';
        document.getElementById('nftSellPrice').placeholder = '...';
        nft.methods.sellPriceOf(id).call().then(function (sellPrice) {
            sellPrice = new BigNumber(sellPrice).shiftedBy(-18);
            document.getElementById('nftSellPrice').value = sellPrice;
            document.getElementById('nftSellPrice').placeholder = sellPrice;
        });

        document.getElementById('nftSendAddressHint').innerHTML = '';
        document.getElementById('nftSendAddress').value = '';
    }

    function nftClose() {
        document.getElementById('nftItems').style.display = 'block';
        document.getElementById('nftEdit').style.display = 'none';
    }

    function nftPrice() {
        if (!check()) {
            return;
        }
        var price = new BigNumber(document.getElementById('nftSellPrice').value);
        if (price.isNaN()) {
            document.getElementById('nftSellPriceHint').innerHTML = 'enter a number';
            return;
        }
        if (!price.isZero() && price.lt(new BigNumber(document.getElementById('nftItemPrice').title))) {
            document.getElementById('nftSellPriceHint').innerHTML = 'enter a number greater than ' +
                document.getElementById('nftItemPrice').title;
            return;
        }
        blocked = true;
        document.getElementById('nftSellPriceHint').innerHTML = '';

        var message;
        nft.methods.setPrice(
            selectedId,
            price.shiftedBy(18).toFixed(0)
        ).send({
            from: account
        }).on('transactionHash', function (hash) {
            nftClose();
            message = logTx('set price ' + price + ' FGI', hash);
            blocked = false;
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber != 0) {
                return;
            }
            if (!receipt.status) {
                message.innerHTML = ' - rejected';
            } else {
                message.innerHTML = ' - confirmed';
            }
        }).catch(function (error) {
            console.error(error);
            if (error.message) {
                error = error.message;
            }
            alert(error);
            blocked = false;
        });
    }

    function nftSend() {
        if (!check()) {
            return;
        }
        var address = document.getElementById('nftSendAddress').value;
        if (!web3.utils.isAddress(address)) {
            document.getElementById('nftSendAddressHint').innerHTML = 'enter valid address';
            return;
        }
        blocked = true;
        document.getElementById('nftSendAddressHint').innerHTML = '';

        var message;
        nft.methods.safeTransferFrom(
            account,
            address,
            selectedId,
            1,
            '0x0'
        ).send({
            from: account
        }).on('transactionHash', function (hash) {
            nftClose();
            message = logTx('send to ' + address, hash);
            blocked = false;
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber != 0) {
                return;
            }
            if (!receipt.status) {
                message.innerHTML = ' - rejected';
            } else {
                message.innerHTML = ' - confirmed';
            }
        }).catch(function (error) {
            console.error(error);
            if (error.message) {
                error = error.message;
            }
            alert(error);
            blocked = false;
        });
    }

    function createImage(files) {
        if (files.length === 0) {
            return;
        } else if (!files[0].type.startsWith('image')) {
            return;
        }
        image = files[0];
        document.getElementById('createPreview').innerHTML = '';
        document.getElementById('createName').value = image.name;
        var url = 'url(\'' + URL.createObjectURL(image) + '\')';
        document.getElementById('createPreview').style.backgroundImage = url;
    }

    function createMint() {
        if (!check()) {
            return;
        }
        if (image === null) {
            document.getElementById('createPreview').style.color = 'red';
            return;
        }
        var name = document.getElementById('createName').value;
        var description = document.getElementById('createDescription').value;
        if (ftBalance.isZero()) {
            document.getElementById('createPriceHint').innerHTML = 'buy some FGI';
            return;
        }
        var price = new BigNumber(document.getElementById('createPrice').value);
        if (price.isNaN()) {
            document.getElementById('createPriceHint').innerHTML = 'enter a number';
            return;
        }
        if (price.lt(0.0000000001)) {
            document.getElementById('createPriceHint').innerHTML =
                'enter a number greater than 0.0000000001';
            return;
        }
        if (price.gt(ftBalance)) {
            document.getElementById('createPriceHint').innerHTML = 'enter a number less than ' +
                ftBalance.toFixed(3, BigNumber.ROUND_DOWN);
            return;
        }
        document.getElementById('createPriceHint').innerHTML = '';
        var sellPrice = new BigNumber(document.getElementById('createSellPrice').value);
        if (sellPrice.isNaN()) {
            document.getElementById('createSellPriceHint').innerHTML = 'enter a number';
            return;
        }
        if (!sellPrice.isZero() && !sellPrice.gt(price)) {
            document.getElementById('createSellPriceHint').innerHTML = 'enter a number greater than ' +
                price;
            return;
        }
        document.getElementById('createSellPriceHint').innerHTML = '';
        blocked = true;
        var p = document.createElement('p');
        p.classList.add('onestring');
        var span = document.createElement('span');
        span.innerHTML = 'uploading...';
        p.appendChild(span);
        var div = document.getElementById('log');
        div.insertBefore(p, div.firstChild);

        upload(image, function (error, result) {
            if (error) {
                span.innerHTML = error;
                blocked = false;
                return;
            }
            result = '/ipfs/' + result;
            span.innerHTML = 'uploaded ';
            var a = document.createElement('a');
            a.innerHTML = result;
            a.href = 'https://ipfs.io' + result;
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener');
            p.appendChild(a);

            var message;
            nft.methods.mint(
                price.shiftedBy(18).toFixed(0),
                sellPrice.shiftedBy(18).toFixed(0),
                name,
                description,
                result,
                '0x0'
            ).send({
                from: account
            }).on('transactionHash', function (hash) {
                message = logTx('create ' + name, hash);
                blocked = false;
            }).on('confirmation', function (confirmationNumber, receipt) {
                if (confirmationNumber != 0) {
                    return;
                }
                if (!receipt.status) {
                    message.innerHTML = ' - rejected';
                } else {
                    message.innerHTML = ' - confirmed';
                }
            }).catch(function (error) {
                console.error(error);
                if (error.message) {
                    error = error.message;
                }
                alert(error);
                blocked = false;
            });
        });
    }

    function upload(file, callback) {
        var data = new FormData();
        data.append('file', file);
        var request = new XMLHttpRequest();
        request.open('POST', 'https://api.pinata.cloud/pinning/pinFileToIPFS', true);
        request.setRequestHeader('pinata_api_key', 'e46ee10e03199ea247ee');
        request.setRequestHeader(
            'pinata_secret_api_key',
            '148f9cd961b351fdbb7542e81643bef208198db261a00641a04faf794a6bb154'
        );
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status != 200) {
                    console.error(request);
                    callback(request.status);
                } else {
                    callback(null, JSON.parse(request.responseText).IpfsHash);
                }
            }
        };
        request.send(data);
    }

    function marketItem(id) {
        document.getElementById('marketItems').style.display = 'none';
        document.getElementById('marketBuy').style.display = 'block';
        selectedId = id;

        var button = document.getElementById('marketItemImage');
        button.innerHTML = 'loading...';
        button.style.backgroundImage = '';
        button.onclick = '';
        nft.methods.imageOf(id).call().then(function (ipfs) {
            ipfs = 'https://ipfs.io' + ipfs;
            button.innerHTML = '';
            button.style.backgroundImage = 'url(\'' + ipfs + '\')';
            button.onclick = function () {
                window.open(ipfs);
            };
        });

        document.getElementById('marketItemName').innerHTML = '...';
        nft.methods.nameOf(id).call().then(function (name) {
            document.getElementById('marketItemName').innerHTML = name;
        });

        document.getElementById('marketItemDescription').innerHTML = '...';
        nft.methods.descriptionOf(id).call().then(function (description) {
            document.getElementById('marketItemDescription').innerHTML = description;
        });

        document.getElementById('marketItemPrice').innerHTML = '';
        document.getElementById('marketItemPrice').title = '...';
        nft.methods.priceOf(id).call().then(function (price) {
            price = new BigNumber(price).shiftedBy(-18);
            document.getElementById('marketItemPrice').title = price;
            price = price.toFixed(3, BigNumber.ROUND_DOWN);
            document.getElementById('marketItemPrice').innerHTML = price;
        });

        document.getElementById('marketItemSellPrice').innerHTML = '...';
        document.getElementById('marketItemSellPrice').title = '';
        nft.methods.sellPriceOf(id).call().then(function (sellPrice) {
            sellPrice = new BigNumber(sellPrice).shiftedBy(-18);
            document.getElementById('marketItemSellPrice').title = sellPrice;
            sellPrice = sellPrice.toFixed(3, BigNumber.ROUND_DOWN);
            document.getElementById('marketItemSellPrice').innerHTML = sellPrice;
        });

        document.getElementById('marketItemOwner').innerHTML = '';
        nft.methods.ownerOf(id).call().then(function (owner) {
            var a = document.createElement('a');
            a.innerHTML = owner;
            a.href = prefix + 'address/' + owner;
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener');
            document.getElementById('marketItemOwner').appendChild(a);
        });

        document.getElementById('marketItemHint').innerHTML = '';
    }

    function marketClose() {
        document.getElementById('marketItems').style.display = 'block';
        document.getElementById('marketBuy').style.display = 'none';
    }

    function marketBuy() {
        if (!check()) {
            return;
        }
        if (ftBalance.lt(new BigNumber(document.getElementById('marketItemSellPrice').title))) {
            document.getElementById('marketItemHint').innerHTML = 'not enough FGI';
            return;
        }
        blocked = true;
        document.getElementById('marketItemHint').innerHTML = '';

        var message;
        nft.methods.buy(selectedId, '0x0').send({
            from: account
        }).on('transactionHash', function (hash) {
            marketClose();
            message = logTx('buy ' + document.getElementById('marketItemName').innerHTML, hash);
            blocked = false;
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber != 0) {
                return;
            }
            if (!receipt.status) {
                message.innerHTML = ' - rejected';
            } else {
                message.innerHTML = ' - confirmed';
            }
        }).catch(function (error) {
            console.error(error);
            if (error.message) {
                error = error.message;
            }
            alert(error);
            blocked = false;
        });
    }
})();