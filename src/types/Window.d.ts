import { Donor } from "./Donor"

declare global {
    interface Window {
        electron: {
            getDonors: () => Promise<Donor[]>
        }
    }
}

export { }