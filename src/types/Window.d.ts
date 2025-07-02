import { Donation } from "./Donation"
import { Donor } from "./Donor"

declare global {
    interface Window {
        donation: {
            getDonations: () => Promise<Donation[]>
            getDonationsTotal: () => Promise<number>
            addDonation: (donation: Donation) => Promise<Donation>
        },
        donor: {
            getDonors: () => Promise<Donor[]>
        }
    }
}

export { }