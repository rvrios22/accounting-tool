import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Donation } from "../../types/Donation";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    const getTotal = async () => {
      setTotal(await window.donation.getDonationsTotal());
    };
    getTotal();
  }, []);
  return (
    <>
      <h1>Accounting Tool</h1>
      <h2>Total In Account:</h2>
      <p>{total ? total : 'Loading...'}</p>
    </>
  );
}
