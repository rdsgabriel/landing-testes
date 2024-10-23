'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { CheckIcon, GripVertical, PlusIcon, TrashIcon, ChevronDown, ChevronUp, ChevronRight, ArrowRight, ChevronsRight, ArrowLeft } from "lucide-react"

interface Task {
  id: string
  content: string
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  title: string
  droppableId: string
  isMinimized: boolean
  onToggleMinimize: () => void
  showDragHandle?: boolean
  maxVisibleTasks: number
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, title, droppableId, isMinimized, onToggleMinimize, showDragHandle = true, maxVisibleTasks }) => {
  const addTask = useCallback(() => {
    const newTask = { id: Date.now().toString(), content: '', completed: false }
    setTasks(prevTasks => [...prevTasks.slice(-maxVisibleTasks + 1), newTask])
  }, [setTasks, maxVisibleTasks])

  const updateTask = useCallback((id: string, content: string) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, content } : task))
  }, [setTasks])

  const toggleTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }, [setTasks])

  const removeTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }, [setTasks])

  const visibleTasks = tasks.slice(-maxVisibleTasks)

  if (isMinimized) {
    return (
      <div className="flex items-center justify-between px-4 py-2 bg-muted">
        <span className="font-semibold">{title}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMinimize}
          className="p-1 h-auto"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMinimize}
          className="p-1 h-auto"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-2 overflow-hidden">
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex-grow">
              {visibleTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={!showDragHandle}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center space-x-2 bg-secondary/20 p-2 rounded-md mb-2"
                    >
                      {showDragHandle && (
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="h-4 w-4 text-gray-500 cursor-move" />
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleTask(task.id)}
                        className="p-1 h-auto"
                      >
                        {task.completed ? <CheckIcon className="h-4 w-4 text-green-500" /> : <div className="h-4 w-4 rounded-full border-2" />}
                      </Button>
                      <Input
                        value={task.content}
                        onChange={(e) => updateTask(task.id, e.target.value)}
                        className={`flex-grow ${task.completed ? "line-through text-gray-500" : ""}`}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTask(task.id)}
                        className="p-1 h-auto"
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button
          onClick={addTask}
          className="w-full mt-2"
        >
          <PlusIcon className="h-4 w-4 mr-2" /> Adicionar Tarefa
        </Button>
      </CardContent>
    </Card>
  )
}

const ExpandButton: React.FC<{
  onExpandAll: () => void
  onExpandRoutine: () => void
  onExpandDaily: () => void
}> = ({ onExpandAll, onExpandRoutine, onExpandDaily }) => {
  return (
    <div className="absolute left-0 top-0 h-full w-2 bg-muted flex flex-col items-center justify-between py-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onExpandRoutine}
        className="p-1 mt-8"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Expandir Tarefas Recorrentes</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onExpandAll}
        className="p-1"
      >
        <ChevronsRight className="h-4 w-4" />
        <span className="sr-only">Expandir Tudo</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onExpandDaily}
        className="p-1 mb-8"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Expandir Tarefas Diárias</span>
      </Button>
    </div>
  )
}

const CalendarExpandButton: React.FC<{
  onExpand: () => void
}> = ({ onExpand }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onExpand}
      className="absolute top-0 -right-3 h-full w-10 p-1 flex items-center justify-center"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Expandir Calendário e Pendências</span>
    </Button>
  )
}

export default function TaskManager() {
  const [routineTasks, setRoutineTasks] = useState<Task[]>([
    { id: '1', content: 'Reunião diária', completed: false },
    { id: '2', content: 'Revisar e-mails', completed: false },
  ])
  const [dailyTasks, setDailyTasks] = useState<Task[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [pendingTasks, setPendingTasks] = useState<Task[]>([
    { id: '3', content: 'Finalizar relatório', completed: false },
    { id: '4', content: 'Preparar apresentação', completed: false },
  ])

  const [minimizedSections, setMinimizedSections] = useState({
    routine: false,
    daily: false,
    calendar: false,
  })

  const toggleMinimize = useCallback((section: 'routine' | 'daily' | 'calendar') => {
    setMinimizedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }, [])

  const expandRoutine = () => toggleMinimize('routine');
  const expandDaily = () => toggleMinimize('daily');
  const expandAll = () => {
    setMinimizedSections({routine: false, daily: false, calendar: false})
  }

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    const sourceId = source.droppableId as 'routine' | 'daily' | 'pending'
    const destId = destination.droppableId as 'routine' | 'daily' | 'pending'

    const lists = {
      routine: routineTasks,
      daily: dailyTasks,
      pending: pendingTasks
    }

    const setters = {
      routine: setRoutineTasks,
      daily: setDailyTasks,
      pending: setPendingTasks
    }

    const sourceList = [...lists[sourceId]]
    const destList = sourceId === destId ? sourceList : [...lists[destId]]

    const [removed] = sourceList.splice(source.index, 1)
    destList.splice(destination.index, 0, removed)

    if (sourceId === destId) {
      setters[sourceId](destList)
    } else {
      setters[sourceId](sourceList)
      setters[destId](destList)
    }
  }, [routineTasks, dailyTasks, pendingTasks])

  const bothTasksMinimized = minimizedSections.routine && minimizedSections.daily

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePanelSizes = () => {
      if (leftPanelRef.current && rightPanelRef.current) {
        if (bothTasksMinimized) {
          leftPanelRef.current.style.width = '80px'
          rightPanelRef.current.style.width = 'calc(100% - 80px)'
        } else {
          leftPanelRef.current.style.width = '50%'
          rightPanelRef.current.style.width = '50%'
        }
      }
    }

    updatePanelSizes()
    window.addEventListener('resize', updatePanelSizes)

    return () => {
      window.removeEventListener('resize', updatePanelSizes)
    }
  }, [minimizedSections, bothTasksMinimized])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen overflow-hidden">
        <div ref={leftPanelRef} className="flex flex-col transition-all duration-300 ease-in-out relative h-full">
          {bothTasksMinimized ? (
            <ExpandButton onExpandAll={expandAll} onExpandRoutine={expandRoutine} onExpandDaily={expandDaily} />
          ) : (
            <>
              <div className={`${minimizedSections.routine ? 'h-10' : 'flex-1'} transition-all duration-300 ease-in-out p-2`}>
                <TaskList
                  tasks={routineTasks}
                  setTasks={setRoutineTasks}
                  title="Tarefas Recorrentes"
                  droppableId="routine"
                  isMinimized={minimizedSections.routine}
                  onToggleMinimize={() => toggleMinimize('routine')}
                  maxVisibleTasks={4}
                />
              </div>
              <div className={`${minimizedSections.daily ? 'h-10' : 'flex-1'} transition-all duration-300 ease-in-out p-2`}>
                <TaskList
                  tasks={dailyTasks}
                  setTasks={setDailyTasks}
                  title="Tarefas Diárias"
                  droppableId="daily"
                  isMinimized={minimizedSections.daily}
                  onToggleMinimize={() => toggleMinimize('daily')}
                  maxVisibleTasks={4}
                />
              </div>
            </>
          )}
        </div>
        <div ref={rightPanelRef} className="transition-all duration-300 ease-in-out h-full p-2">
          {minimizedSections.calendar ? (
            <div className="h-full flex items-center relative">
              <CalendarExpandButton onExpand={() => toggleMinimize('calendar')} />
            </div>
          ) : (
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
                <CardTitle className="text-lg font-semibold">Calendário e Pendências</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleMinimize('calendar')}
                  className="p-1 h-auto"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-2 space-y-2 overflow-hidden">
                <div className="flex-shrink-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border shadow-md"
                    classNames={{
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled: "text-muted-foreground opacity-50",
                      
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                      nav_button: "hover:bg-accent hover:text-accent-foreground",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      caption: "relative flex items-center justify-center px-8 py-2",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                    }}
                  />
                </div>
                <div className="flex-grow overflow-hidden">
                  <TaskList
                    tasks={pendingTasks}
                    setTasks={setPendingTasks}
                    title="Pendências"
                    droppableId="pending"
                    isMinimized={false}
                    onToggleMinimize={() => {}}
                    showDragHandle={false}
                    maxVisibleTasks={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DragDropContext>
  )
}