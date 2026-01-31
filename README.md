High-frequency 3D naval combat fully integrated with the Linera Protocol.

Hover Wars proves that real-time, arcade-style multiplayer gaming is possible on Web3. We utilize Linera’s micro-chain architecture to solve the latency bottleneck, allowing for high-speed physics and combat while maintaining trustless state verification.

🏗️ Architecture & Smart Contracts
We have designed and implemented a hybrid architecture that leverages the speed of micro-chains for gameplay and the security of the main chain for settlement.

Trustless Match Resolution: The game logic is not just client-side; match outcomes are verified via Rust-based smart contracts.

On-Chain State Settlement: At the end of every match, the final state (Winner, Score, MVP) is committed to the blockchain, creating an immutable history of battles.

Asset & Stat Ownership: Player achievements and "Oil" resources are tokenized assets owned by the player, secured by the Linera network.

Zero-Latency Gameplay: By utilizing the optimistic execution model of Linera, we achieve 60 FPS gameplay synchronization that feels indistinguishable from Web2 servers.

⚔️ The Gameplay Loop
The core objective is Resource Supremacy.

Capture the Oil: Teams compete to secure the oil barrel from the central rig.

Escort & Defend: The carrier becomes the primary target. Team coordination is essential.

Delivery: Successfully transporting oil to the base updates the on-chain match score.

MVP Calculation: Our system tracks complex metrics (Goals, Kills, Survival Time) to algorithmically determine the Most Valuable Pilot, minting this status to their profile.

⚙️ Tech Stack
Blockchain Logic: Rust (Linera SDK, Wasm)

Frontend Engine: React + Vite

3D Environment: Three.js / @react-three/fiber

Networking: Real-time event synchronization (Socket-based micro-chain simulation)

Audio: Custom 3D Positional Audio engine
