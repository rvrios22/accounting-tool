import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Donation } from "../../types/Donation";
import DonationRow from "../components/DonationRow/DonationRow";
import AddDonationForm from "../components/AddDonationForm/AddDonationForm";

export const Route = createFileRoute("/transactions")({
  component: RouteComponent,
});

function RouteComponent() {
  const [donations, setDonations] = useState<Donation[]>([]);
  useEffect(() => {
    const getDonations = async () => {
      setDonations(await window.donation.getDonations());
    };
    getDonations();
  }, []);
  return (
    <>
      <h1>Donation Transactions:</h1>
      <hr />
      {!donations ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Donor ID</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(({ id, date, amount, method, DonorId }) => (
              <DonationRow
                id={id}
                date={date}
                amount={amount}
                method={method}
                DonorId={DonorId}
              />
            ))}
          </tbody>
        </table>
      )}
      <AddDonationForm />
    </>
  );
}
