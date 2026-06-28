import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("counter", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program;

  // Conta nova que vai guardar o contador.
  const counter = anchor.web3.Keypair.generate();

  it("inicializa o contador em 0", async () => {
    await program.methods
      .initialize()
      .accounts({
        counter: counter.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counter])
      .rpc();

    const conta = await program.account.counter.fetch(counter.publicKey);
    assert.strictEqual(conta.count.toNumber(), 0);
  });

  it("incrementa o contador para 1", async () => {
    await program.methods
      .increment()
      .accounts({
        counter: counter.publicKey,
      })
      .rpc();

    const conta = await program.account.counter.fetch(counter.publicKey);
    assert.strictEqual(conta.count.toNumber(), 1);
  });
});
