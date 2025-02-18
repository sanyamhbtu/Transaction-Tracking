import Link from "next/link"

export default function Navbar() {
    return(
        <nav className="bg-slate-900 p-4 text-white shadow-md m-5">
        <div className="container mx-auto flex justify-between items-center">
            <Link href={"/"} className="hover:text-gray-200 transition">
                Home
            </Link>
            <ul className="flex space-x-6 text-lg">
                
                <li>
                    <Link href={"/pages/AddTransaction"} className="hover:text-gray-200 transition">
                        Add Transactions
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
    )
    
}