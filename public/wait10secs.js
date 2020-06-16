console.log("ADSTATS: Adding Waiting 10 secs");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    console.log('Taking a break...');
    await sleep(10000);
    console.log('Ten seconds later');
}

demo();