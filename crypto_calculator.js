<script>
document.getElementById("cryptoDepositFee").addEventListener("change", function() {
        var option = this.value;
        switch(option) {
            case "achCBD":
                document.getElementById("cryptoDepositPercentage").value = 0;
                document.getElementById("cryptoDepositFixed").value = 0;
                break;
            case "wireCBD":
                document.getElementById("cryptoDepositPercentage").value = 0;
                document.getElementById("cryptoDepositFixed").value = 10;
                break;
            case "sepaCBD":
                document.getElementById("cryptoDepositPercentage").value = 0;
                document.getElementById("cryptoDepositFixed").value = 0.16;
                break;
            case "swiftCBD":
                document.getElementById("cryptoDepositPercentage").value = 0;
                document.getElementById("cryptoDepositFixed").value = 0;
                break;
            case "customDeposit":
                break; // Do nothing, allow user to input custom values
        }
    });

    document.getElementById("cryptoWithdrawalFee").addEventListener("change", function() {
        var option = this.value;
        switch(option) {
            case "achCBW":
                document.getElementById("cryptoWithdrawalPercentage").value = 0;
                document.getElementById("cryptoWithdrawalFixed").value = 0;
                break;
            case "wireCBW":
                document.getElementById("cryptoWithdrawalPercentage").value = 0;
                document.getElementById("cryptoWithdrawalFixed").value = 25;
                break;
            case "sepaCBW":
                document.getElementById("cryptoWithdrawalPercentage").value = 0;
                document.getElementById("cryptoWithdrawalFixed").value = 0;
                break;
            case "swiftCBW":
                document.getElementById("cryptoWithdrawalPercentage").value = 0;
                document.getElementById("cryptoWithdrawalFixed").value = 1.3;
                break;
            case "customWithdraw":
                break; // Do nothing, allow user to input custom values
        }
    });

    document.getElementById("tierCoinbase").addEventListener("change", function() {
        var option = this.value;
        switch(option) {
            case "tier1T":
                document.getElementById("cryptoFee").value = 0.6;
                break;
            case "tier2T":
                document.getElementById("cryptoFee").value = 0.4;
                break;
            case "tier3T":
                document.getElementById("cryptoFee").value = 0.25;
                break;
            case "tier1M":
                document.getElementById("cryptoFee").value = 0.4;
                break;
            case "tier2M":
                document.getElementById("cryptoFee").value = 0.25;
                break;
            case "tier3M":
                document.getElementById("cryptoFee").value = 0.15;
                break;
            case "customTier":
                break; // Do nothing, allow user to input custom values
        }
    });

    document.getElementById("walletDepositFee").addEventListener("change", function() {
        var option = this.value;
        switch(option) {
            case "achWiseD":
                document.getElementById("walletDepositPercentage").value = 0;
                document.getElementById("walletDepositFixed").value = 0;
                break;
            case "bankWiseD":
                document.getElementById("walletDepositPercentage").value = 0;
                document.getElementById("walletDepositFixed").value = 0;
                break;
            case "wireWiseD":
                document.getElementById("walletDepositPercentage").value = 0;
                document.getElementById("walletDepositFixed").value = 4.14;
                break;
            case "customWallet":
                break; // Do nothing, allow user to input custom values
        }
    });

    // Switch to custom option if the user edits the corresponding input values
    document.getElementById("cryptoDepositPercentage").addEventListener("input", function() {
        document.getElementById("cryptoDepositFee").value = "customDeposit";
    });

    document.getElementById("cryptoDepositFixed").addEventListener("input", function() {
        document.getElementById("cryptoDepositFee").value = "customDeposit";
    });

    document.getElementById("cryptoWithdrawalPercentage").addEventListener("input", function() {
        document.getElementById("cryptoWithdrawalFee").value = "customWithdraw";
    });

    document.getElementById("cryptoWithdrawalFixed").addEventListener("input", function() {
        document.getElementById("cryptoWithdrawalFee").value = "customWithdraw";
    });

    document.getElementById("cryptoFee").addEventListener("input", function() {
        document.getElementById("tierCoinbase").value = "customTier";
    });

    document.getElementById("walletDepositPercentage").addEventListener("input", function() {
        document.getElementById("walletDepositFee").value = "customWallet";
    });

    document.getElementById("walletDepositFixed").addEventListener("input", function() {
        document.getElementById("walletDepositFee").value = "customWallet";
    });


 function calculateFees() {
    var payout = parseFloat(document.getElementById("payout").value);
    var cryptoDepositPercentage = parseFloat(document.getElementById("cryptoDepositPercentage").value);
    var cryptoDepositFixed = parseFloat(document.getElementById("cryptoDepositFixed").value);
    var cryptoFee = parseFloat(document.getElementById("cryptoFee").value);
    var cryptoWithdrawalPercentage = parseFloat(document.getElementById("cryptoWithdrawalPercentage").value);
    var cryptoWithdrawalFixed = parseFloat(document.getElementById("cryptoWithdrawalFixed").value);
    var walletDepositPercentage = parseFloat(document.getElementById("walletDepositPercentage").value);
    var walletDepositFixed = parseFloat(document.getElementById("walletDepositFixed").value);
    var cryptoRate = parseFloat(document.getElementById("coin2").value);

    var cryptoDepositFee = payout * (cryptoDepositPercentage / 100) + cryptoDepositFixed;
    var fund = payout - cryptoDepositFee;

    var exchangeFeeRate = cryptoFee / 100;
    var cryptoBuyFee = fund * (cryptoFee / 100);
    var conversion1 = (fund - cryptoBuyFee) * cryptoRate;
    var cryptoSellFee = conversion1 * exchangeFeeRate;
    var conversion2 = (conversion1 - cryptoSellFee);

    var cryptoWithdrawalFee = conversion2 * (cryptoWithdrawalPercentage / 100) + cryptoWithdrawalFixed;

    var convertedFund = conversion2 - cryptoWithdrawalFee;

    var walletDepositFee = convertedFund * (walletDepositPercentage / 100) + walletDepositFixed;

    var totalCryptoFee = cryptoDepositFee + cryptoBuyFee + (cryptoSellFee + cryptoWithdrawalFee) / cryptoRate;
    var totalFee = walletDepositFee / cryptoRate + totalCryptoFee;
    var totalEarnings = convertedFund - totalFee;

    document.getElementById("totalCryptoFee").textContent = "Crypto transaction fees (USD): $" + totalCryptoFee.toFixed(2);
    document.getElementById("totalFee").textContent = "Total fees (USD): $" + totalFee.toFixed(2);
    document.getElementById("totalearning").textContent = "Total earnings in wallet: $" + totalEarnings.toFixed(2);
}
</script>
