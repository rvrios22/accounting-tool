import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Donor } from "../../types/Donor";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [donors, setDonors] = useState<Donor[]>([]);
  useEffect(() => {
    const getDonors = async () => {
      setDonors(await window.electron.getDonors());
    };
    getDonors();
  }, []);
  return (
    <div>
      {donors.map(({ id, name, address, email, phone, notes }) => (
        <div key={id}>
          <p>{name}</p>
          <span>{id}</span>
          <p>{address}</p>
          <p>{email}</p>
          <p>{phone}</p>
          <p>{notes}</p>
        </div>
      ))}
    </div>
  );
}
