import React, { useState } from "react";

function AddDonorModal() {
  const [donor, setDonor] = useState({
    name: "ted",
    address: "123 main st",
    email: "rvrios22@gmail.com ",
    phone: "555-555-5555",
    notes: "N/A",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonor((prev) => ({ ...prev, name: e.target.value }));
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonor((prev) => ({ ...prev, address: e.target.value }));
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonor((prev) => ({ ...prev, email: e.target.value }));
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonor((prev) => ({ ...prev, phone: e.target.value }));
  };
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonor((prev) => ({ ...prev, notes: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(donor)
      await window.donor.addDonor(donor);
      setDonor({ name: "", address: "", email: "", phone: "", notes: "" });
    } catch (err) {
      console.error("Failed to add donor", err);
    }
  };

  return (
    <div>
      <p>It looks like the Donor you're trying to add was not found</p>
      <p>Would you like to add them here?</p>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="name">Donor Name:</label>
        <input
          type="text"
          id="name"
          value={donor.name}
          onChange={handleNameChange}
        />
        <label htmlFor="address">Donor Address: </label>
        <input
          type="text"
          id="address"
          value={donor.address}
          onChange={handleAddressChange}
        />
        <label htmlFor="email">Donor Email:</label>
        <input
          type="text"
          id="email"
          value={donor.email}
          onChange={handleEmailChange}
        />
        <label htmlFor="phone">Donor Phone Number: </label>
        <input
          type="text"
          id="phone"
          value={donor.phone}
          onChange={handlePhoneChange}
        />
        <label htmlFor="notes">Donor Notes: </label>
        <input
          type="text"
          id="notes"
          value={donor.notes}
          onChange={handleNotesChange}
        />
        <input type="submit" value="Add Donor" />
      </form>
    </div>
  );
}

export default AddDonorModal;
