import Image from "next/image";
import TransactionHistory from "./components/TransactionHistory";
import AddTransaction from "./pages/AddTransaction/page";
export default function Home() {
  return (
    <div className="w-full p-5">
      <TransactionHistory />
    </div>
  );
}
