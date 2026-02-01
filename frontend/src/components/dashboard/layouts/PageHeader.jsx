'use client';
import React, { useState, useEffect } from 'react';
import { ListIcon, UsersIcon,CardIcon } from '@/components/icons';

export default function Pageheader ({
  title, 
  addButtonText, 
  onAddClick,
  activeFilter,
  setActiveFilter,
  counts,
  viewMode,
  setViewMode
}){
  return(
    <div >
      <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {addButtonText && onAddClick && (
                <button
                  onClick={onAddClick}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span className="text-xl">+</span>
                  {addButtonText}
                </button>
              )}
            </div>
      
            {/* Filter Tabs & View Toggle */}
            <div className="flex justify-between items-center mb-6">
              {/* Filter Tabs */}
              {/* <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All {counts.all}
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'active'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Active {counts.active}
                </button>
                <button
                  onClick={() => setActiveFilter('closed')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFilter === 'closed'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Closed {counts.closed}
                </button>
              </div> */}
      
              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  <CardIcon />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  <ListIcon />
                </button>
              </div>
            </div>
    </div>
  )
}