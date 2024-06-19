<script>
// @ts-nocheck

    import { connection, account } from '../stores';
    import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
    let conn;
    let userAccount;
    let title = '';
    let description = '';

    connection.subscribe(value => {
        conn = value;
    });

    account.subscribe(value => {
        userAccount = value;
    });

    const createProposal = async () => {
        if (conn && userAccount) {
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: userAccount,
                    newAccountPubkey: new PublicKey("PROPOSAL_ACCOUNT_PUBLIC_KEY"),
                    lamports: await conn.getMinimumBalanceForRentExemption(0),
                    space: 0,
                    programId: new PublicKey("YOUR_PROGRAM_ID"),
                })
            );
            const signature = await conn.sendTransaction(transaction, [userAccount]);
            await conn.confirmTransaction(signature, 'processed');
            alert('Proposal created successfully');
        }
    };
</script>

<div class="flex items-center justify-center py-2">
    <div class="card p-4 w-3/5 flex flex-col gap-2">
        <h4 class="h4">Create Proposal</h4>
        <label class="label">
            <span>Title</span>
            <input class="input" type="text" placeholder="Title" bind:value={title} />
        </label>
        <label class="label">
            <span>Description</span>
            <textarea class="textarea" rows="4" placeholder="Description" bind:value={description}></textarea>
        </label>
        <button class="btn variant-filled" on:click={createProposal}>
            Submit Proposal
        </button>
    </div>
</div>
