import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
          
          {/* LEFT MENU */}
          <aside className="hidden lg:block sticky top-24 h-fit border-r">
            <UserMenu />
          </aside>

          {/* RIGHT CONTENT */}
          <main className="min-h-[75vh] bg-white">
            <Outlet />
          </main>

        </div>

      </div>
    </section>
  )
}

export default Dashboard
