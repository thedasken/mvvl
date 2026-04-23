import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

import { AddPage } from '@/pages/add-page';
import { DetailPage } from '@/pages/detail-page';
import { EditPage } from '@/pages/edit-page';
import { MonitoringPage } from '@/pages/monitoring-page';

function Layout() {
  return (
    <div className='bg-background text-text container min-h-screen py-20 antialiased'>
      <div className='flex items-center gap-2 py-6'>
        <Link to='/' className='font-header text-foreground text-2xl font-semibold'>
          Aplikasi Data Pribadi
        </Link>
      </div>

      <div className='grid gap-8'>
        <Outlet />
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MonitoringPage />} />
          <Route path='/add' element={<AddPage />} />
          <Route path='/edit/:nik' element={<EditPage />} />
          <Route path='/detail/:nik' element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
