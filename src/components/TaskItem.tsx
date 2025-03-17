import React from 'react';
import { CheckCircle, Edit2, Trash2 } from 'lucide-react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  return (
    <div className={`p-4 border rounded-lg shadow-sm ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
            {task.description}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleComplete(task._id)}
            className={`p-1 rounded-full ${
              task.completed ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(task._id, { title: task.title, description: task.description })}
            className="p-1 rounded-full text-blue-600 hover:text-blue-700"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 rounded-full text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}