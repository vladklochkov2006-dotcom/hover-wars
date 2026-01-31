# 🚁 HOVER WARS

**High-frequency 3D naval combat fully integrated with the Linera Protocol.**

> **Status:** Buildathon Submission  
> **Core Tech:** Linera Micro-chains, React, Three.js, Rust

---

## 💡 The Concept

**Hover Wars** proves that real-time, arcade-style multiplayer gaming is possible on Web3. 

Traditional blockchains suffer from latency bottlenecks that make fast-paced games impossible. We utilize **Linera’s micro-chain architecture** to solve this, enabling **60 FPS gameplay**, high-speed physics, and instant combat feedback while maintaining trustless state verification via smart contracts.

---

## 🏗️ Architecture & Smart Contracts

We have designed a hybrid architecture that leverages the optimistic execution of micro-chains for gameplay and the security of the main chain for final settlement.

### 🔗 Key Blockchain Integration:
* **Trustless Match Resolution:** The game logic isn't just client-side validation; match outcomes are verified via **Rust-based smart contracts** on the Linera network.
* **On-Chain State Settlement:** At the end of every match, the critical final state (Winner, Score, MVP) is committed to the blockchain, creating an immutable history of battles.
* **Asset & Stat Ownership:** Player achievements and "Oil" resources are tokenized assets owned by the player, secured by the chain.
* **Zero-Latency Experience:** By utilizing Linera's optimistic execution model, we achieve synchronization that feels indistinguishable from traditional Web2 servers.

---

## ⚔️ The Gameplay Loop

The core objective is **Resource Supremacy**.

1.  🛢️ **Capture the Oil:** Teams compete to secure the oil barrel from the central rig.
2.  🛡️ **Escort & Defend:** The carrier becomes the primary target. Team coordination is essential.
3.  🏁 **Delivery:** Successfully transporting oil to the base updates the on-chain match score.
4.  🏆 **MVP Calculation:** Our system tracks complex metrics (Goals, Kills, Survival Time) to algorithmically determine the *Most Valuable Pilot*, minting this status to their profile.

---

## ⚙️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Blockchain Logic** | Rust (Linera SDK, Wasm) |
| **Frontend Engine** | React + Vite |
| **3D Environment** | Three.js / @react-three/fiber |
| **Networking** | Real-time event synchronization |
| **Audio** | Custom 3D Positional Audio Engine |


> *Built for the Linera Buildathon. Redefining on-chain gaming speed.*
