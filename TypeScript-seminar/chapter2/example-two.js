function addVAT(price, vat = 0.2) {
    return price * (1 + vat);
}
const vatPrice = addVAT(30, 0.3);
const vatPrice2 = addVAT(30);
const vatPrice5 = addVAT(36);
