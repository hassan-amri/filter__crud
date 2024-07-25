'use client'

import { useRouter } from "next/navigation";
import React from "react";

function page() {
    const router = useRouter()
  return <div>
    <h1>about Page</h1>
    <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" onClick={() => router.back()}>
            Previous
          </li>
          <li
            className="page-item"
            
          >
            1
          </li>
          <li
            className="page-item"
            
          >
            2
          </li>
          <li
            className="page-item"
            
          >
            3
          </li>
          <li
            className="page-item"
            
          >
            Next
          </li>
        </ul>
      </nav>
  </div>;
}

export default page;
