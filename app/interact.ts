/**
 * Interage com o programa counter na devnet:
 * cria uma conta nova, chama initialize e em seguida increment,
 * imprimindo as assinaturas das transações.
 *
 * Uso:
 *   ANCHOR_PROVIDER_URL=https://api.devnet.solana.com \
 *   ANCHOR_WALLET=~/.config/solana/id.json \
 *   yarn ts-node app/interact.ts
 */
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import idl from "../target/idl/counter.json";

async function main() {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = new anchor.Program(idl as anchor.Idl, provider) as Program;
  const counter = anchor.web3.Keypair.generate();

  console.log("Program ID:", program.programId.toBase58());
  console.log("Conta counter:", counter.publicKey.toBase58());

  const initSig = await program.methods
    .initialize()
    .accounts({
      counter: counter.publicKey,
      user: provider.wallet.publicKey,
    })
    .signers([counter])
    .rpc();
  console.log("initialize tx:", initSig);

  const incSig = await program.methods
    .increment()
    .accounts({ counter: counter.publicKey })
    .rpc();
  console.log("increment tx:", incSig);

  const conta = await (program.account as any).counter.fetch(counter.publicKey);
  console.log("count final:", conta.count.toString());
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
