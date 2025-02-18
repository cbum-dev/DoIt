"use client"

import React, { useEffect, useRef, useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { MoreVertical, Trash2, Calendar, User, Flag } from "lucide-react"

export default function KanbanCard({ issue, onDelete }) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issue.id,
  })

  useEffect(() => {
    if (!showMenu) return

    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [showMenu])

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-grab relative border border-gray-200"
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      <div className="absolute right-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowMenu((prev) => !prev)
          }}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <MoreVertical size={16} className="text-gray-500" />
        </button>

        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-200"
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (onDelete) onDelete(issue.id)
                setShowMenu(false)
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 transition-colors flex items-center text-red-600"
            >
              <Trash2 size={14} className="mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className=" mb-6">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {issue.title}
        </h3>
        {issue.description && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {issue.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        {issue.priority && (
          <div className="flex items-center text-xs text-gray-600">
            <Flag size={12} className="mr-1.5" />
            <span
              className={`w-2 h-2 rounded-full mr-1.5 ${getPriorityColor(
                issue.priority
              )}`}
            />
            {issue.priority}
          </div>
        )}

        {issue.createdAt && (
          <div className="flex items-center text-xs text-gray-600">
            <Calendar size={12} className="mr-1.5" />
            {formatDate(issue.createdAt)}
          </div>
        )}

        {issue.assignees && (
          <div className="flex items-center text-xs text-gray-600">
            <User size={12} className="mr-1.5" />
            <span className="truncate">{issue.assignees}</span>
          </div>
        )}
      </div>
    </div>
  )
}
