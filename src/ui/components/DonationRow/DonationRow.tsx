import { Donation } from "../../../types/Donation";
import styles from "./DonationRow.module.css";

function DonationRow({ id, date, amount, method, DonorId }: Donation) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{date}</td>
      <td>{amount}</td>
      <td>{method}</td>
      <td>{DonorId}</td>
    </tr>
  );
}

export default DonationRow;
