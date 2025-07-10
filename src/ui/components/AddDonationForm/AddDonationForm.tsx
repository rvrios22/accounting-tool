import React, { useEffect, useState } from "react";
import { Donor } from "../../../types/Donor";
import { Donation } from "../../../types/Donation";
import AddDonorModal from "../AddDonorModal/AddDonorModal";

function AddDonationForm() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [addDonorModal, setAddDonorModal] = useState<boolean>(false);
  const [donation, setDonation] = useState({
    date: "07/03/2025",
    amount: "200.00",
    method: "Cash",
    donor: "",
  });

  useEffect(() => {
    const getDonors = async () => {
      setDonors(await window.donor.getDonors());
    };
    getDonors();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newDonation: Donation = {
        date: donation.date,
        amount: donation.amount,
        method: donation.method as "Cash" | "Check" | "Online",
        DonorId: await window.donor.getDonorIdByName(donation.donor),
      };
      const result = await window.donation.addDonation(newDonation);
      console.log(result);
      setDonation({ date: "", amount: "", method: "Cash", donor: "" });
    } catch (err: any) {
      if (
        err &&
        typeof err.message === "string" &&
        err.message.includes("Donor not found")
      ) {
        setAddDonorModal(true);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <>
      <h2>Add Donation:</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          required
          type="date"
          name="date"
          id="date"
          value={donation.date}
          onChange={(e) => setDonation({ ...donation, date: e.target.value })}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          required
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
          onChange={(e) =>
            setDonation({
              ...donation,
              method: e.target.value as "Cash" | "Check" | "Online",
            })
          }
        >
          <option value="Cash">Cash</option>
          <option value="Check">Check</option>
          <option value="Online">Online</option>
        </select>
        <label htmlFor="donor">Donor:</label>
        <input
          required
          type="text"
          name="donor"
          id="donor"
          list="donors"
          value={donation.donor}
          onChange={(e) =>
            //TODO allow for user to type in donor name an then associate it with donorid
            //@ts-ignore
            setDonation({ ...donation, donor: e.target.value })
          }
        />
        <datalist id="donors">
          {donors.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </datalist>
        <input type="submit" value="Add Donation" />
      </form>
      {addDonorModal && <AddDonorModal />}
    </>
  );
}

export default AddDonationForm;
