'use client'

import Overview from "@/Pages/Overview"
import { useRouter } from "next/navigation"

const TeacherDashboard = () => {
    const router = useRouter()
    router.replace('/teacher_dashboard/my_courses')
    return (
        <></>
        // <Overview />
    )
}

export default TeacherDashboard