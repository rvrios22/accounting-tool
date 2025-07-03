import React, { useEffect, useState } from "react";
import { Donor } from "../../../types/Donor";
import { Donation } from "../../../types/Donation";

function AddDonationForm() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [donation, setDonation] = useState({
    date: "",
    amount: "",
    method: "",
    donorId: "",
  });

  useEffect(() => {
    const getDonors = async () => {
      setDonors(await window.donor.getDonors());
    };
    getDonors();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDonation = {
      date: donation.date,
      amount: parseFloat(donation.amount),
      method: donation.method,
      DonorId: parseInt(donation.donorId, 10),
    };
    try {
      await window.donation.addDonation(newDonation);
      setDonation({ date: "", amount: "", method: "", donorId: "" });
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
          onChange={(e) =>
            setDonation({ ...donation, date: e.target.value })
          }
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={donation.amount}
          onChange={(e) =>
            setDonation({ ...donation, amount: e.target.value })
          }
        />
        <label htmlFor="method">Method:</label>
        <select
          name="method"
          id="method"
          value={donation.method}
          onChange={(e) =>
            setDonation({ ...donation, method: e.target.value })
          }
        >
          <option value="cash">Cash</option>
          <option value="check">Check</option>
          <option value="online">Online</option>
        </select>
        <label htmlFor="donor">Donor:</label>
        <input
          type="text"
          name="donor"
          id="donor"
          list="donors"
          value={donation.donorId}
          onChange={(e) =>
            setDonation({ ...donation, donorId: e.target.value })
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
