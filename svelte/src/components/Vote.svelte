<script>
// @ts-nocheck

    import { connection, account } from '../stores';
    let conn;
    let userAccount;
    let proposalId;
    let vote; // true for yes, false for no

    connection.subscribe(value => {
        conn = value;
    });

    account.subscribe(value => {
        userAccount = value;
    });

    const castVote = async () => {
        if (conn && userAccount) {
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: userAccount,
                    newAccountPubkey: new PublicKey("VOTE_ACCOUNT_PUBLIC_KEY"),
                    lamports: await conn.getMinimumBalanceForRentExemption(0),
                    space: 0,
                    programId: new PublicKey("YOUR_PROGRAM_ID"),
                })
            );
            const signature = await conn.sendTransaction(transaction, [userAccount]);
            await conn.confirmTransaction(signature, 'processed');
            alert('Vote cast successfully');
        }
    };
</script>

<div class="flex items-center justify-center py-2">
    <div class="card p-4 w-3/5 flex flex-col gap-2">
        <h4 class="h4">Vote on Proposal</h4>
        <label class="label">
            <span>Title</span>
            <input class="input" type="number" placeholder="Proposal ID" bind:value={proposalId} />
        </label>
        <div class="space-y-2">
            <label class="flex items-center space-x-2">
                <input type="radio" name="vote" value="yes" on:click={() => vote = true} /> 
                <p>Yes</p>
            </label>
            <label class="flex items-center space-x-2">
                <input type="radio" name="vote" value="no" on:click={() => vote = false} /> 
                <p>No</p>
            </label>
        </div>
        <button class="btn variant-filled" on:click={castVote}>
            Cast Vote
        </button>
    </div>
</div>
