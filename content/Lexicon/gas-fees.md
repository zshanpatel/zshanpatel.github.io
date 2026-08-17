---
title: Gas Fees
name: gas-fees
description: The computational cost of processing a transaction on a blockchain network — not a fee charged by an app or exchange, but the market price of block space itself, which is why it hits small trades hardest.
tags:
  - term
---
> The market-priced cost of computation on a blockchain — paid to the network, not to any company, and the same regardless of whether your trade is $20 or $20,000.

Every action on a blockchain — sending crypto, swapping tokens, minting an NFT — requires the network's validators to do computational work to process and secure it. Gas is what that work costs. It isn't a platform's cut; it's closer to a toll for using shared infrastructure, priced by how busy that infrastructure is at the moment you use it.

The price moves with congestion, not with your trade size. On Ethereum, it's measured in gwei (a billionth of one ETH), and complex operations — swapping through a decentralised exchange, for instance — cost more gas than a simple transfer, because they demand more computation from the network.

That's the mechanical reason small trades get eaten alive: the fee is set by network conditions, not by how much you're moving, so it's a much bigger percentage of a $20 trade than a $2,000 one.

Designing a fee market that's fair to users and resistant to manipulation is a genuinely hard problem — one serious enough that it has its own academic literature in mechanism design, most notably the economic analysis behind Ethereum's 2021 EIP-1559 fee overhaul.

*Source: Roughgarden, T. (2021), "Transaction Fee Mechanism Design," Proceedings of the 22nd ACM Conference on Economics and Computation.*
