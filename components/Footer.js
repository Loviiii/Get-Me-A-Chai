import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
     

<footer className="bg-[#031033] shadow-sm p-4 dark:bg-gray-800">
  <div className="w-full max-w-screen-xl mx-auto p-4 flex justify-center">
    <span className="text-sm text-gray-500 text-center dark:text-gray-400">
      © {currentYear} <a href="https://flowbite.com/" className="hover:underline">GET ME A CHAI</a>. All Rights Reserved.
    </span>
  </div>
</footer>


  )
}

export default Footer
