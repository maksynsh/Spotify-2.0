import React from 'react'

import {QueueListIcon} from '@heroicons/react/24/solid'

export const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <button>
            <QueueListIcon className="h-5 w-5"/>
            <p>Your Library</p>
          </button>
        </li>
      </ul>
    </div>
  )
}
