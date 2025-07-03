import React, { useEffect, useState } from "react";
import { Donor } from "../../../types/Donor";
import { Donation } from "../../../types/Donation";

function AddDonationForm() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [donation, setDonation] = useState<Donation>({
    date: "07/03/2025",
    amount: "200.00",
    method: "Cash",
    DonorId: 1,
  });

  useEffect(() => {
    const getDonors = async () => {
      setDonors(await window.donor.getDonors());
    };
    getDonors();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDonation: Donation = {
      date: donation.date,
      amount: donation.amount,
      method: donation.method as "Cash" | "Check" | "Online",
      DonorId: donation.DonorId,
    };
    try {
      const result = await window.donation.addDonation(newDonation);
      console.log(result);
      setDonation({ date: "", amount: "", method: "Cash", DonorId: undefined });
    } catch (err) {
      console.error("Failed to add donation", err);
    }
  };

  return (
    <>
      <h2>Add Donation:</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={donation.date}
          onChange={(e) => setDonation({ ...donation, date: e.target.value })}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={donation.amount}
          onChange={(e) => setDonation({ ...donation, amount: e.target.value })}
        />
        <label htmlFor="method">Method:</label>
        <select
          name="method"
          id="method"
          value={donation.method}
          onChange={(e) => setDonation({ ...donation, method: e.target.value as "Cash" | "Check" | "Online" })}
        >
          <option value="Cash">Cash</option>
          <option value="Check">Check</option>
          <option value="Online">Online</option>
        </select>
        <label htmlFor="donor">Donor:</label>
        <input
          type="text"
          name="donor"
          id="donor"
          list="donors"
          value={donation.DonorId}
          onChange={(e) =>
            //TODO allow for user to type in donor name an then associate it with donorid
            //@ts-ignore
            setDonation({ ...donation, DonorId: e.target.value })
          }
        />
        <datalist id="donors">
          {donors.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </datalist>
        <input type="submit" value="Add Donation" />
      </form>
    </>
  );
}

export default AddDonationForm;
