'use client'

import Overview from "@/Pages/Overview";
import { useRouter } from "next/navigation";

const Admin = () => {
    const router = useRouter()
    router.replace('/admin_dashboard/teachers')
    return (
        <></>
        // <Overview />
    );
}

export default Admin;