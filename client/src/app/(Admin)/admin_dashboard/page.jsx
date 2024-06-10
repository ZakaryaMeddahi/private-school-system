'use client'

import Overview from "@/Pages/Overview";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
    const router = useRouter()
    router.replace('/admin_dashboard/teachers')
    return (
        <></>
        // <Overview />
    );
}

export default AdminDashboard;